import asyncHandler from "express-async-handler";

// ✅ Validate Deal Data
export const validateDeal = asyncHandler(async (req, res, next) => {
  const { title, description, discount, location, startDate, endDate } = req.body;
  
  const errors = [];
  
  if (!title) errors.push("Title is required");
  if (!description) errors.push("Description is required");
  if (!discount) errors.push("Discount is required");
  if (!location) errors.push("Location is required");
  if (!startDate) errors.push("Start date is required");
  if (!endDate) errors.push("End date is required");
  
  // Validate date formats if they exist
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime())) errors.push("Start date is invalid");
    if (isNaN(end.getTime())) errors.push("End date is invalid");
    
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end <= start) {
      errors.push("End date must be after start date");
    }
  }
  
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`❌ Validation failed: ${errors.join(", ")}`);
  }
  
  next();
});

// ✅ Validate User Registration Data
export const validateUserRegistration = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  
  const errors = [];
  
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (password && password.length < 6) errors.push("Password must be at least 6 characters");
  if (!role || !["owner", "user"].includes(role)) errors.push("Role must be either 'owner' or 'user'");
  
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`❌ Validation failed: ${errors.join(", ")}`);
  }
  
  next();
});