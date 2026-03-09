// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import Citizen from "../models/Citizen.js"; // Import Citizen model to fetch the citizen details

const authMiddleware = async (req, res, next) => {
  // Extract token from the Authorization header (Bearer <token>)
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the citizen using the decoded ID from the token
    const citizen = await Citizen.findById(decoded.id);
    if (!citizen) {
      return res.status(404).json({ error: "Citizen not found" });
    }

    // Attach citizen to the request object
    req.user = citizen; // Make sure you're using req.user, not req.admin
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("JWT Error:", error.message); // Log the error for debugging
    res.status(400).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;