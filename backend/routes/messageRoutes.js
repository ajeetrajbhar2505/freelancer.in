// messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Example routes
router.post('/createMessage', (req,res)=> messageController.createMessage(req, res, req.io));
router.post('/', messageController.getMessages);

// Add other routes as needed
module.exports = router;
