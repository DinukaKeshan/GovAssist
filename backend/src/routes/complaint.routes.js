import express from "express";
import { createComplaint } from "../controllers/complaint.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isCitizen } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/create", protect, isCitizen, createComplaint);

export default router;
