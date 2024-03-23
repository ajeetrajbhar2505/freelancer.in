// messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Example routes
router.post('/', messageController.createMessage);

// Add other routes as needed

module.exports = router;
