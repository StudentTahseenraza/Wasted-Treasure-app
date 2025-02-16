const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  category: { type: String, required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String }, // Store image URL
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);