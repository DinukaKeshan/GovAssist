import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors package for cross-origin resource sharing
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js"; 
import citizenRoutes from "./routes/citizen.routes.js"; 
import ministerRoutes from "./routes/minister.routes.js";  // Import minister routes
import errorHandler from "./middlewares/error.middleware.js"; // Global error handler

dotenv.config();

const app = express();

// Enable CORS with configuration to allow requests from specific origins (e.g., React app running on a different port)
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL if different
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  credentials: true, // Allow credentials (cookies, etc.) to be sent
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Route for handling admin-related routes
app.use("/api/admin", adminRoutes);

// Route for handling citizen-related routes
app.use("/api/citizen", citizenRoutes);

// Route for handling minister-related routes (separate minister route)
app.use("/api/minister", ministerRoutes); // Register the minister routes here

// Connect to the database (MongoDB in this case)
connectDB();

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Start the server on the specified PORT, fallback to 5000 if not provided
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));