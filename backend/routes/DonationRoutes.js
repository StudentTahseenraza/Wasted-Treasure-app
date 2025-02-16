// routes/donationRoutes.js
const express = require('express');
const { createDonation, getDonations } = require('../controllers/donationController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Save Donation Data (Protected Route)
router.post('/', authMiddleware, createDonation);

// Get All Donations (Protected Route)
router.get('/', authMiddleware, getDonations);

module.exports = router;