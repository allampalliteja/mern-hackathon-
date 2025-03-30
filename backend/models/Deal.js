const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    discount: { type: Number, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true }, // New field
    endDate: { type: Date, required: true },   // New field
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deal', dealSchema);
