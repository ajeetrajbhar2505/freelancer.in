// messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Example routes
router.post('/createMessage', messageController.createMessage);
router.post('/', messageController.getMessages);

// Add other routes as needed

module.exports = router;
