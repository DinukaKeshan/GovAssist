import { spawn } from "child_process";

/**
 * Predicts the priority of a complaint using Python ML model
 * @param {string} text - complaint description
 * @returns {Promise<string>} - 'HIGH', 'MEDIUM', or 'LOW'
 */
export const predictPriority = (text) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["./ml/predict_priority.py", text]);

    let result = "";
    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
    });

    py.on("close", (code) => {
      if (code !== 0) reject(new Error("Python script failed"));
      else resolve(result.trim());
    });
  });
};
