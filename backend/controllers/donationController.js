// controllers/donationController.js
const Donation = require('../models/Donation');

// Save Donation Data
const createDonation = async (req, res) => {
  const { category, itemName, description, location, photo } = req.body;
  try {
    // Assign points based on category
    let points = 0;
    switch (category) {
      case 'food':
        points = 10;
        break;
      case 'clothes':
        points = 5;
        break;
      case 'books':
        points = 7;
        break;
      case 'furniture':
        points = 15;
        break;
      default:
        points = 0;
    }

    const donation = new Donation({
      category,
      itemName,
      description,
      location,
      photo,
      donorId: req.user.id,
      points, // Add points to the donation
    });
    await donation.save();

    // Update the donor's total points in the User model
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    // Assign badges based on total points
    let badge = 'None';
    if (user.totalPoints >= 100) {
      badge = 'Gold';
    } else if (user.totalPoints >= 50) {
      badge = 'Silver';
    } else if (user.totalPoints >= 20) {
      badge = 'Bronze';
    }

    // Update the user's badge
    await user.findByIdAndUpdate(req.user.id, { badge });

    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Donations
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('donorId', 'name email');
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createDonation, getDonations };