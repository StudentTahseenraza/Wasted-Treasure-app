const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  category: { type: String, required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to user
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestSchema);