const express = require('express');
const { getAllDonations, getAllRequests, getAllUsers } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin routes
router.get('/donations', authMiddleware, adminMiddleware, getAllDonations);
router.get('/requests', authMiddleware, adminMiddleware, getAllRequests);
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;