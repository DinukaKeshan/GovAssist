import express from "express";
import { registerMinister, loginMinister } from "../controllers/minister.controller.js"; // Import minister controller functions
import authMiddleware from "../middlewares/auth.middleware.js"; // JWT authentication middleware

const router = express.Router();

// Route to login a minister
router.post("/login-minister", loginMinister); // Route for ministers to log in

export default router;