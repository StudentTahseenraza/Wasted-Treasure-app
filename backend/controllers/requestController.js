const Request = require('../models/Request');

// Create a new request
const createRequest = async (req, res) => {
  const { category, itemName, description, location } = req.body;
  try {
    const request = new Request({
      category,
      itemName,
      description,
      location,
      receiverId: req.user.id, // Assuming user is authenticated
    });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all requests
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('receiverId', 'name');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRequest, getRequests };