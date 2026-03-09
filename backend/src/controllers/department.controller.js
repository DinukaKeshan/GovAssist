import Department from "../models/Department.js";

// Create a new Department
export const createDepartment = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Check if the department already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department already exists" });
    }

    // Create a new department
    const newDepartment = new Department({
      name,
      description,
    });

    // Save the new department to the database
    await newDepartment.save();

    res.status(201).json({ message: "Department created successfully", newDepartment });
  } catch (error) {
    console.error("Department Creation Error:", error.message);  // Log the error for debugging
    res.status(500).json({ error: "Server Error" });
  }
};