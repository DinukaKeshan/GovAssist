import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors package
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js"; 
import citizenRoutes from "./routes/citizen.routes.js"; 
import errorHandler from "./middlewares/error.middleware.js"; 

dotenv.config();

const app = express();

// Enable CORS for all origins or specify allowed origins
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend (React app)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  credentials: true, // Allow credentials (cookies, etc.)
}));

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