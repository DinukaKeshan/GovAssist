import { departmentDecisionPrompt } from "./prompts.js";

export const decideDepartment = async (
  complaint,
  candidates
) => {
  const context = candidates
    .map(
      (c, i) =>
        `${i + 1}. ${c.text} (Department ID: ${c.department})`
    )
    .join("\n");

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: departmentDecisionPrompt(
        complaint,
        context
      ),
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response.trim();
};
