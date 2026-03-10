// rag/retriever.js
// Core RAG retrieval — finds top-N most relevant departments for a complaint title

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getEmbedding, cosineSimilarity } from "./embedder.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, "index.json");

let _index = null; // Cached in memory after first load

const loadIndex = () => {
  if (_index) return _index;
  if (!fs.existsSync(indexPath)) {
    throw new Error(
      "RAG index not found. Run: node rag/buildIndex.js first."
    );
  }
  _index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  console.log(`[RAG] Index loaded: ${_index.length} departments`);
  return _index;
};

/**
 * Keyword scoring boost — checks if complaint words appear in keywords/synonyms
 * This helps when vector similarity is close between multiple departments
 */
const keywordScore = (entry, query) => {
  const q = query.toLowerCase();
  let score = 0;

  for (const kw of entry.keywords || []) {
    if (q.includes(kw.toLowerCase())) score += 2;
  }
  for (const syn of entry.synonyms || []) {
    if (q.includes(syn.toLowerCase())) score += 3; // synonyms weighted higher
  }
  for (const ex of entry.complaintExamples || []) {
    const exWords = ex.toLowerCase().split(" ");
    const qWords = q.split(" ");
    const shared = qWords.filter((w) => w.length > 3 && exWords.includes(w)).length;
    score += shared * 0.5;
  }

  return score;
};

/**
 * Retrieve top-N most relevant departments for a complaint title
 * Returns array of { department, score, description } sorted by relevance
 */
export const retrieveTopDepartments = async (complaintTitle, topN = 3) => {
  const index = loadIndex();

  // Embed the query
  const queryEmbedding = await getEmbedding(complaintTitle);

  const scores = [];

  for (const entry of index) {
    // Vector similarity: max similarity across all chunks of this department
    let maxVectorSim = 0;
    for (const chunk of entry.chunks) {
      const sim = cosineSimilarity(queryEmbedding, chunk.embedding);
      if (sim > maxVectorSim) maxVectorSim = sim;
    }

    // Keyword boost (normalized 0-1 range approximately)
    const kwBoost = keywordScore(entry, complaintTitle) * 0.05;

    // Hybrid score: 80% vector similarity + 20% keyword boost
    const hybridScore = maxVectorSim * 0.8 + kwBoost * 0.2;

    scores.push({
      department: entry.department,
      description: entry.description,
      vectorScore: maxVectorSim,
      keywordBoost: kwBoost,
      hybridScore,
      complaintExamples: entry.complaintExamples.slice(0, 3), // top 3 examples for context
    });
  }

  // Sort by hybrid score descending
  scores.sort((a, b) => b.hybridScore - a.hybridScore);

  const top = scores.slice(0, topN);
  console.log(
    `[RAG] Top matches for "${complaintTitle}":`,
    top.map((t) => `${t.department} (${t.hybridScore.toFixed(3)})`)
  );

  return top;
};

/**
 * Build context string to inject into the LLM prompt
 */
export const buildRagContext = async (complaintTitle) => {
  const topDepts = await retrieveTopDepartments(complaintTitle, 3);

  const context = topDepts
    .map(
      (d, i) =>
        `Option ${i + 1}: "${d.department}"
  Description: ${d.description}
  Similar complaints handled: ${d.complaintExamples.join(" | ")}`
    )
    .join("\n\n");

  return { context, topDepts };
};