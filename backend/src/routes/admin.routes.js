import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js"; // Import admin controller functions
import { registerMinister, loginMinister } from "../controllers/minister.controller.js"; // Import the new minister controller functions
import { getDepartments } from "../controllers/department.controller.js"; // Import the new department controller function
import { createDepartment } from "../controllers/department.controller.js"; // Import department creation function
import authMiddleware from "../middlewares/auth.middleware.js"; // JWT authentication middleware
import { registerAdminValidation, validate } from "../middlewares/validate.middleware.js"; // Import validation middleware
import { registerAgent, loginAgent } from "../controllers/agent.controller.js"; // Import agent controller functions

const router = express.Router();

// Route to register an admin with validation
router.post("/register", registerAdminValidation, validate, registerAdmin);

// Route to login an admin
router.post("/login", loginAdmin);

// Route to register a minister (protected route)
router.post("/register-minister", authMiddleware, registerMinister); // Admin-only route to register ministers

// Route to fetch all departments (protected route)
router.get("/departments", authMiddleware, getDepartments); // Fetch departments for the dropdown

// Route to create a department (protected route)
router.post("/create-department", authMiddleware, createDepartment); // Create a new department

// Route to register an agent (protected route)
router.post("/register-agent", authMiddleware, registerAgent);  // Admin-only route to register agents

// Route to login an agent
router.post("/login-agent", loginAgent);  // Route for agents to log in

// Admin Profile route (protected route)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the admin profile", adminId: req.admin });
});

export default router;