import axios from "axios";

export const detectDepartmentWithAI = async (
  complaintDescription,
  departments
) => {
  try {
    const departmentNames = departments.map(d => d.name).join(", ");

    const prompt = `
You are a government complaint classifier.

Available departments:
${departmentNames}

Based on the complaint below, respond with ONLY ONE department name
from the list above. Do not explain.

Complaint:
"${complaintDescription}"
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: false
      }
    );

    return response.data.response.trim();
  } catch (err) {
    console.error("Ollama error:", err.message);
    return null;
  }
};
