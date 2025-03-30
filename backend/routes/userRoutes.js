import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateUserRegistration } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", validateUserRegistration, registerUser);
router.post("/login", loginUser);
// Protected routes
router.get("/profile", protect, getUserProfile);

export default router;