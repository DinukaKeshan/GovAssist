// src/services/ollama.service.js
import axios from 'axios';

const OLLAMA_URL = "http://localhost:11434/api/generate";

// ⚠️  Run `ollama list` in your terminal and set this to a model you have installed.
// Common options: "llama3", "llama3.2", "mistral", "gemma2", "phi3", "tinyllama"
const OLLAMA_MODEL = "llama3"; // matched to your installed model

export const getDepartmentSuggestion = async (complaintTitle) => {
    try {
        const response = await axios.post(OLLAMA_URL, {
            model: OLLAMA_MODEL,
            prompt: `You are a government complaint routing assistant. Given the following complaint title, respond with ONLY the name of the most relevant government department — no explanation, no punctuation, just the department name.

Complaint title: "${complaintTitle}"

Department name:`,
            stream: false,
        });

        const rawText = response.data?.response?.trim();
        if (!rawText) return { department: null };

        const department = rawText.replace(/['"\.]/g, "").trim();
        return { department };

    } catch (error) {
        // If model not found, give a clear actionable message
        if (error?.response?.data?.error?.includes("not found")) {
            const modelUsed = OLLAMA_MODEL;
            console.error(`[Ollama] Model "${modelUsed}" is not installed.`);
            console.error(`[Ollama] Fix: run --> ollama pull ${modelUsed}`);
            console.error(`[Ollama] Or change OLLAMA_MODEL in ollama.service.js to a model you have.`);
            console.error(`[Ollama] Check installed models with: ollama list`);
        } else {
            console.error("Ollama error:", error?.response?.data || error.message);
        }
        throw error;
    }
};