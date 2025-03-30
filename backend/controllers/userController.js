import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("❌ Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();

  res.status(201).json({ message: "✅ User registered successfully" });
});

// ✅ Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("❌ Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("❌ Invalid email or password");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ message: "✅ Login successful", token, role: user.role });
});

// ✅ Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  console.log("Getting user profile for ID:", req.user.id);
  
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      console.log("❌ User not found in database");
      res.status(404);
      throw new Error("❌ User not found");
    }
    
    console.log("✅ User found:", user.email);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error("❌ Error in getUserProfile:", error.message);
    res.status(500);
    throw new Error("❌ Error retrieving user profile");
  }
});