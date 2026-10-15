import Department from "../models/Department.js";
import User from "../models/User.js"; // make sure you have a User model

export const createDepartment = async (req, res) => {
  try {
    // ✅ Only ministers can create departments
    if (req.user.role !== "MINISTER") {
      return res
        .status(403)
        .json({ message: "Only ministers can create departments" });
    }

    const { name } = req.body;

    // ✅ Validate department name
    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    // ✅ Check if department already exists
    const exists = await Department.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Department already exists" });
    }

    // ✅ Create department
    const department = await Department.create({
      name,
      createdBy: req.user.id,
    });

    // ✅ Populate createdBy so frontend gets the minister's name directly
    const populatedDepartment = await Department.findById(department._id)
      .populate("createdBy", "name email");

    res.status(201).json(populatedDepartment);

  } catch (err) {
    console.error("Create department error:", err);
    res.status(500).json({ message: "Failed to create department" });
  }
};
