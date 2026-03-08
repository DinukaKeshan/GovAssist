// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js"; // Import admin routes
import errorHandler from "./middlewares/error.middleware.js"; // Import error handler
import citizenRoutes from "./routes/citizen.routes.js"; // Import citizen routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Use the admin routes
app.use("/api/admin", adminRoutes);

// Use the citizen routes
app.use("/api/citizen", citizenRoutes);

// Connect to the database
connectDB();

// Error handling middleware (should be last)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));