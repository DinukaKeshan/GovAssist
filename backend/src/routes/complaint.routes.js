import express from "express";
import {
  addComplaint,
  deleteComplaint,
  updateComplaintStatus,
  getComplaintsByCitizen,
  getComplaintsByDepartment,
  voteComplaint,  // Import voteComplaint function
} from "../controllers/complaint.controller.js"; // Import all controllers
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route for adding a complaint
router.post("/add", authMiddleware, addComplaint);

// Route for fetching complaints of the authenticated citizen
router.get("/", authMiddleware, getComplaintsByCitizen);

// Route for deleting a complaint
router.delete("/:id", authMiddleware, deleteComplaint);

// Route for updating a complaint status
router.put("/:id", authMiddleware, updateComplaintStatus);

// Route for fetching complaints for a specific department
router.get("/department/:departmentId", getComplaintsByDepartment); // Fetch complaints for a specific department

// Route for voting for a complaint
router.post("/vote", authMiddleware, voteComplaint); // New route for voting

export default router;