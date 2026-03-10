import express from "express";
import { registerAgent, loginAgent } from "../controllers/agent.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login-agent", loginAgent);

router.get("/profile", authMiddleware, (req, res) => { // 👈 add this
  res.json(req.user);
});

export default router;