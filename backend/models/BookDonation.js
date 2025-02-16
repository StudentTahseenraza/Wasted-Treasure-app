const mongoose = require('mongoose');

const bookDonationSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., school, college, notes, stationery
  itemName: { type: String, required: true },
  description: { type: String },
  condition: { type: String, required: true }, // e.g., new, used, good condition
  location: { type: String, required: true },
  type: { type: String, required: true }, // e.g., donate, exchange
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For exchanges
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BookDonation', bookDonationSchema);