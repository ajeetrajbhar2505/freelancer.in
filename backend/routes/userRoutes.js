// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example routes
router.post('/signup', userController.createUser);
router.post('/login', userController.authenticateUser);
router.post('/verify-otp', userController.verifyOTP);

// Add other routes as needed

module.exports = router;
