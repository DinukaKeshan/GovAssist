import express from "express";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import "./config/passport.js";
import departmentRoutes from "./routes/department.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/complaints", complaintRoutes);

export default app;
