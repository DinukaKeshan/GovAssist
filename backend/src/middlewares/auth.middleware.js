import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Check the Authorization header for the Bearer token
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract the token from 'Bearer <token>'

  // If there's no token, deny access
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded admin ID to the request object
    req.admin = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    console.error("JWT Error:", error.message);  // Log the error for debugging
    res.status(400).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;