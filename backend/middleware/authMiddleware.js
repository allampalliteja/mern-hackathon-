import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// ✅ Middleware to Verify Token
export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : req.headers.authorization;

  console.log("🔒 Checking for auth token...");

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    console.log("🔑 Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified for user ID:", decoded.id);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.error("❌ User not found in DB");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next();
  } catch (error) {
    console.error("❌ Token validation failed:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
});

// ✅ Middleware for Owner-Only Access
export const ownerOnly = asyncHandler(async (req, res, next) => {
  console.log("🔍 Checking user role...");

  if (!req.user) {
    console.error("❌ Unauthorized access attempt (no user)");
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  if (req.user.role !== "owner") {
    console.warn(`⛔ Access Denied: User ID ${req.user._id} is not an owner`);
    return res.status(403).json({ message: "Forbidden: Only owners can access this resource" });
  }

  console.log("✅ Access granted: User is an owner");
  next();
});
