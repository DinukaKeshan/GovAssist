// routes/admin.routes.js
import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";
import { registerAdminValidation, validate } from "../middlewares/validate.middleware.js"; // Validation middleware
import authMiddleware from "../middlewares/auth.middleware.js"; // JWT authentication middleware

const router = express.Router();

// Route to register an admin with validation
router.post("/register", registerAdminValidation, validate, registerAdmin);

// Route to login an admin
router.post("/login", loginAdmin);

// Example of a protected route, accessible only by an authenticated admin
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the admin profile", adminId: req.admin });
});

export default router;