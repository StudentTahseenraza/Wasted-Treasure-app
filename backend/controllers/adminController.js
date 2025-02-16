const Donation = require('../models/Donation');
const Request = require('../models/Request');
const User = require('../models/User');

// Get all donations (Admin only)
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('donorId', 'name email');
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all requests (Admin only)
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('receiverId', 'name email');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllDonations, getAllRequests, getAllUsers };