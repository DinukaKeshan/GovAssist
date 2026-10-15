import express from "express";
import Department from "../models/Department.js";
import Complaint from "../models/Complaint.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createDepartment } from "../controllers/department.controller.js";

const router = express.Router();

// ===============================
// CREATE DEPARTMENT (Minister)
// ===============================
router.post("/create", protect, createDepartment);

// ===============================
// GET ALL DEPARTMENTS
// ===============================
router.get("/", protect, async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("createdBy", "name email");

    res.json(departments);
  } catch (err) {
    console.error("Failed to fetch departments:", err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

// ===============================
// GET SINGLE DEPARTMENT + COMPLAINTS
// ===============================
router.get("/:id", protect, async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const complaints = await Complaint.find({
      department: department._id,
    })
      .populate({
        path: "citizen",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    // ✅ IMPORTANT: return department + complaints separately
    res.json({
      department,
      complaints,
    });
  } catch (err) {
    console.error("Failed to fetch department:", err);
    res.status(500).json({ message: "Failed to fetch department" });
  }
});

export default router;
