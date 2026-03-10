// rag/buildIndex.js
// Run this ONCE to generate the vector index: node rag/buildIndex.js
// Re-run whenever you update knowledge.json

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getEmbedding } from "./embedder.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const knowledgePath = path.join(__dirname, "knowledge.json");
const indexPath = path.join(__dirname, "index.json");

const buildIndex = async () => {
  console.log("📚 Loading knowledge base...");
  const knowledge = JSON.parse(fs.readFileSync(knowledgePath, "utf-8"));

  const index = [];

  for (const entry of knowledge) {
    console.log(`\n🔄 Embedding department: ${entry.department}`);

    // Build a rich text document for each department by combining all its info
    const documents = [
      // 1. Department description
      `Department: ${entry.department}. ${entry.description}`,

      // 2. All complaint examples (most important for matching)
      ...entry.complaintExamples.map(
        (ex) => `${entry.department} complaint: ${ex}`
      ),

      // 3. Keywords as a sentence
      `${entry.department} handles issues related to: ${entry.keywords.join(", ")}`,

      // 4. Synonyms
      ...(entry.synonyms
        ? [`${entry.department} also known as: ${entry.synonyms.join(", ")}`]
        : []),
    ];

    // Embed each document chunk
    const chunks = [];
    for (const doc of documents) {
      try {
        const embedding = await getEmbedding(doc);
        chunks.push({ text: doc, embedding });
        process.stdout.write(".");
      } catch (err) {
        console.error(`\n⚠️  Failed to embed: "${doc.slice(0, 60)}..." — ${err.message}`);
      }
    }

    index.push({
      department: entry.department,
      description: entry.description,
      keywords: entry.keywords,
      synonyms: entry.synonyms || [],
      complaintExamples: entry.complaintExamples,
      chunks, // embedded vectors
    });

    console.log(`\n✅ ${entry.department}: ${chunks.length} chunks embedded`);
  }

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`\n🎉 Index saved to ${indexPath}`);
  console.log(`📊 Total departments: ${index.length}`);
  console.log(`📊 Total chunks: ${index.reduce((s, e) => s + e.chunks.length, 0)}`);
};

buildIndex().catch((err) => {
  console.error("❌ Build failed:", err.message);
  process.exit(1);
});