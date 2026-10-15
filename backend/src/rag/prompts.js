export const departmentDecisionPrompt = (
  complaint,
  context
) => `
You are a government complaint classification system.

Complaint:
"${complaint}"

Possible department contexts:
${context}

Return ONLY the department ObjectId.
`;
