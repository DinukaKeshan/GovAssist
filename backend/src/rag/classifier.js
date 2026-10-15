import { detectDepartment } from "../services/ollama.service.js";

export const classifyComplaint = async (description, departments = []) => {
  if (!departments.length) {
    return null;
  }

  const departmentNames = departments.map(d => d.name);

  const result = await detectDepartment(description, departmentNames);

  return result;
};
