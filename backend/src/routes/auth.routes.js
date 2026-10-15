import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   NORMAL AUTH
========================= */
router.post("/register", register);
router.post("/login", login);

/* =========================
   GOOGLE AUTH (LOGIN + REGISTER)
========================= */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔴 If Google user has NO ROLE → ask role
    if (!req.user.role) {
      return res.redirect(
        `http://localhost:5173/google-select-role?token=${token}`
      );
    }

    // 🟢 Existing user → normal login
    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}&name=${encodeURIComponent(
        req.user.name
      )}&role=${req.user.role}`
    );
  }
);

/* =========================
   SET ROLE (GOOGLE USERS)
========================= */
router.post("/set-role", protect, async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ["CITIZEN", "AGENT", "MINISTER"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to set role" });
  }
});

export default router;
