import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";
import { createDepartment } from "../controllers/department.controller.js";
import { registerMinister } from "../controllers/minister.controller.js"; 
import { registerAdminValidation, validate } from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdminValidation, validate, registerAdmin);
router.post("/login", loginAdmin);
router.post("/create-department", authMiddleware, createDepartment);
router.post("/register-minister", authMiddleware, registerMinister);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the admin profile", adminId: req.admin });
});

export default router;