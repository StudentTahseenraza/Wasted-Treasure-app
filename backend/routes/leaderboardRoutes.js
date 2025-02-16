const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get top donors for the leaderboard
router.get('/', async (req, res) => {
  try {
    const topDonors = await User.find()
      .sort({ totalPoints: -1 }) // Sort by totalPoints in descending order
      .limit(10); // Limit to top 10 donors
    res.status(200).json(topDonors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;