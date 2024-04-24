// roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Route to create a new room
router.post('/createRoom',(req,res)=> roomController.createRoom(req, res, req.io));
router.get('/getUsers', roomController.getUsers);
router.post('/getRecieverDetails', roomController.getRecieverDetails);

module.exports = router;
