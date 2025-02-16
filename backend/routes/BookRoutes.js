const express = require('express');
const jwt = require('jsonwebtoken');
const BookDonation = require('../models/BookDonation');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new book donation/exchange
router.post('/', authMiddleware, async (req, res) => {
  const { category, itemName, description, condition, location, type } = req.body;
  try {
    const bookDonation = new BookDonation({
      category,
      itemName,
      description,
      condition,
      location,
      type,
      donorId: req.user.id,
    });
    await bookDonation.save();
    res.status(201).json(bookDonation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all book donations/exchanges
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookDonations = await BookDonation.find().populate('donorId', 'name email');
    res.status(200).json(bookDonations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;