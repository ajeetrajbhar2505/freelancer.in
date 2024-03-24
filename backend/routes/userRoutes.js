// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example routes
router.post('/', userController.createUser);
router.post('/login', userController.authenticateUser);

// Add other routes as needed

module.exports = router;
