import asyncHandler from "express-async-handler";
import Deal from "../models/Deal.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";
import morgan from "morgan";


// ✅ Serve Uploaded Images
export const serveUploads = (app) => {
  app.use("/uploads", express.static("uploads"));
};

// ✅ Multer Storage for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValidType =
      allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
      allowedTypes.test(file.mimetype);
    isValidType ? cb(null, true) : cb(new Error("❌ Only JPEG, JPG, and PNG formats are allowed!"));
  },
});

// ✅ Add Deal (Handles Image Upload)
export const addDeal = asyncHandler(async (req, res) => {
  console.log("📌 Incoming addDeal Request:", req.body);
  console.log("📌 Uploaded File:", req.file);

  if (!req.user || req.user.role !== "owner") {
    return res.status(403).json({ message: "❌ Access Denied: Only owners can add deals" });
  }

  const { title, description, discount, location, startDate, endDate } = req.body;

  if (!title || !description || !discount || !location || !startDate || !endDate) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  // Validate Discount Value
  const discountValue = Number(discount);
  if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
    return res.status(400).json({ message: "❌ Discount must be between 1% and 100%" });
  }

  // Validate Dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return res.status(400).json({ message: "❌ Invalid dates or end date must be after start date" });
  }

  // Ensure Image Path is Correct
  const imagePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.png";

  try {
    const newDeal = await Deal.create({
      title,
      description,
      discount: discountValue,
      location,
      startDate,
      endDate,
      image: imagePath,
      user: req.user.id,
    });

    console.log("✅ New deal added:", newDeal);
    res.status(201).json({ message: "✅ Deal added successfully", deal: newDeal });
  } catch (error) {
    console.error("❌ Error adding deal:", error);
    res.status(500).json({ message: "❌ Server Error: Could not add deal" });
  }
});

// ✅ Get All Deals (Public)
export const getDeals = asyncHandler(async (req, res) => {
  console.log("📌 Fetching all deals...");

  try {
    const deals = await Deal.find({}).sort({ createdAt: -1 });
    res.status(200).json(deals);
  } catch (error) {
    console.error("❌ Error fetching deals:", error);
    res.status(500).json({ message: "❌ Server Error: Could not fetch deals" });
  }
});

// ✅ Get My Deals (Fetch deals added by logged-in user)
export const getMyDeals = asyncHandler(async (req, res) => {
  console.log("📌 Fetching deals for user ID:", req.user.id);

  try {
    const myDeals = await Deal.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (!myDeals.length) {
      console.log("ℹ️ No deals found for this user.");
      return res.status(404).json({ message: "ℹ️ No deals found for this user." });
    }

    console.log(`✅ Found ${myDeals.length} deals for user.`);
    res.status(200).json(myDeals);
  } catch (error) {
    console.error("❌ Error fetching my deals:", error);
    res.status(500).json({ message: "❌ Server Error: Could not fetch your deals" });
  }
});

// ✅ Update Deal (Only Owner Can Edit)
export const updateDeal = asyncHandler(async (req, res) => {
  console.log("📌 Updating deal:", req.params.id);

  const { title, description, discount, location, startDate, endDate } = req.body;

  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "❌ Deal not found" });
    }

    if (req.user.id !== deal.user.toString()) {
      return res.status(403).json({ message: "❌ Access Denied: You can only update your own deals" });
    }

    deal.title = title || deal.title;
    deal.description = description || deal.description;
    deal.discount = discount || deal.discount;
    deal.location = location || deal.location;
    deal.startDate = startDate || deal.startDate;
    deal.endDate = endDate || deal.endDate;

    const updatedDeal = await deal.save();

    console.log("✅ Deal updated:", updatedDeal);
    res.status(200).json({ message: "✅ Deal updated successfully", deal: updatedDeal });
  } catch (error) {
    console.error("❌ Error updating deal:", error);
    res.status(500).json({ message: "❌ Server Error: Could not update deal" });
  }
});

// ✅ Delete Deal (Only Owner Can Delete)
export const deleteDeal = asyncHandler(async (req, res) => {
  console.log("📌 Deleting deal:", req.params.id);

  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "❌ Deal not found" });
    }

    if (req.user.id !== deal.user.toString()) {
      return res.status(403).json({ message: "❌ Access Denied: You can only delete your own deals" });
    }

    await deal.deleteOne();

    console.log("✅ Deal deleted:", req.params.id);
    res.status(200).json({ message: "✅ Deal deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting deal:", error);
    res.status(500).json({ message: "❌ Server Error: Could not delete deal" });
  }
});
