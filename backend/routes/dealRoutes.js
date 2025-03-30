import express from "express";
import { addDeal, getDeals, getMyDeals, upload } from "../controllers/dealController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateDeal } from "../middleware/validationMiddleware.js";

const router = express.Router();

// ✅ Public Route - Get all deals
router.get("/", getDeals);

// ✅ Protected Route - Get deals added by the logged-in user
router.get("/my-deals", protect, getMyDeals);

// ✅ Protected Route - Add a new deal (only owners can add)
router.post("/", protect, validateDeal, upload.single("image"), addDeal);

export default router;
