const express = require('express');
const { createRequest, getRequests } = require('../controllers/requestController');
const {authMiddleware} = require('../middleware/authMiddleware'); // For authentication

const router = express.Router();
// const {handleRequest} = require('../controllers/requestController');

// router.post("/submit",handleRequest);

router.post('/', authMiddleware, createRequest);
router.get('/', getRequests);

module.exports = router;