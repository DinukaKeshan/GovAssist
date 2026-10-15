import { retrieveRelevantDepartments } from "./retriever.js";
import { decideDepartment } from "./decider.js";

export const classifyComplaint = async (description) => {
  const candidates =
    await retrieveRelevantDepartments(description);

  if (!candidates.length) return null;

  return decideDepartment(description, candidates);
};
