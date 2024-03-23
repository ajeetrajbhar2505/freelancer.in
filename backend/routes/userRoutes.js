// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example routes
router.post('/', userController.createUser);

// Add other routes as needed

module.exports = router;
