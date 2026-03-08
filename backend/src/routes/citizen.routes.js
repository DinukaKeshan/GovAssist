// routes/citizen.routes.js
import express from "express";
import { registerCitizen, loginCitizen } from "../controllers/citizen.controller.js";
import { validateCitizenRegistration, validate } from "../middlewares/citizenValidation.middleware.js";

const router = express.Router();

// Route to register a new citizen with validation
router.post("/register", validateCitizenRegistration, validate, registerCitizen);

// Route to login a citizen
router.post("/login", loginCitizen);

export default router;