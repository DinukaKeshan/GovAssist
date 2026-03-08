// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token"); // Expecting token in the request header

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.id; // Attach the admin's id to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;