import { embedText } from "./embedder.js";
import DepartmentVector from "../../data/departments.json";

export const ingestSample = async (
  departmentId,
  text
) => {
  const embedding = await embedText(text);

  await DepartmentVector.create({
    department: departmentId,
    text,
    embedding,
  });
};
