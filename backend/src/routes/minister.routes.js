import express from "express";
import { registerMinister, loginMinister } from "../controllers/minister.controller.js"; // Import minister controller functions
import { getMinisterProfile } from "../controllers/minister.controller.js"; // Import the getMinisterProfile function
import authMiddleware from "../middlewares/auth.middleware.js"; // JWT authentication middleware

const router = express.Router();

// Route to login a minister
router.post("/login-minister", loginMinister);  // Route for ministers to log in

// Route to fetch the minister's profile (protected route)
router.get("/profile", authMiddleware, getMinisterProfile); // Fetch the minister profile

export default router;