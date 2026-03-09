import express from "express";
import { registerAgent, loginAgent } from "../controllers/agent.controller.js"; // Import agent controller functions
import authMiddleware from "../middlewares/auth.middleware.js"; // JWT authentication middleware

const router = express.Router();


// Route to login an agent
router.post("/login-agent", loginAgent);  // Route for agents to log in

export default router;