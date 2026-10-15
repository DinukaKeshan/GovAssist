// backend/src/ml/priorityModel.js

import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Predict priority using trained ML model (Python)
 */
export const predictPriority = (text) => {
  return new Promise((resolve, reject) => {
    if (!text || text.trim() === "") return resolve("MEDIUM");

    const scriptPath = path.join(__dirname, "predict_priority.py");

    const py = spawn("python", [scriptPath, text]);

    let output = "";
    let errorOutput = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (err) => {
      errorOutput += err.toString();
    });

    py.on("close", (code) => {
      if (code !== 0) {
        console.error("❌ Python error:", errorOutput);
        reject(new Error("ML prediction failed"));
      } else {
        resolve(output.trim());
      }
    });
  });
};
