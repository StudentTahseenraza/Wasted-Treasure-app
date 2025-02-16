const mongoose = require('mongoose');

const FoodDonationSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., fresh, stale, spoiled
  purpose: { type: String, required: true }, // e.g., animal feed, composting, biogas, needy people
  itemName: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FoodDonation', FoodDonationSchema);