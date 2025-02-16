const express = require('express');
const jwt = require('jsonwebtoken');
const FoodDonation = require('../models/FoodDonation');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new food donation
router.post('/', authMiddleware, async (req, res) => {
  const { category, purpose, itemName, description, location } = req.body;
  try {
    const foodDonation = new FoodDonation({
      category,
      purpose,
      itemName,
      description,
      location,
      donorId: req.user.id,
    });
    await foodDonation.save();
    res.status(201).json(foodDonation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all food donations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const foodDonations = await FoodDonation.find().populate('donorId', 'name email');
    res.status(200).json(foodDonations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;