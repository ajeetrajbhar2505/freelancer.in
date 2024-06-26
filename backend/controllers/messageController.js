// messageController.js
const Message = require('../models/message');
const ErrorModel = require('../models/errorSchema');
const { verifyToken } = require('..//controllers/tokenController'); // Assuming emailService.js is the file where the functions are implemented
const path = require('path');
const Room = require('../models/room');


// Controller function to create a new message
exports.createMessage = async (req, res, io) => {
    try {

        // Check if authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).sendFile(path.join(__dirname, '../public/html/index.html'));
        }

        // Extract token from authorization header
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer token"
        const { userId } = await verifyToken(token);


        // Extract message data from the request body
        const { roomId, receiver, messageText } = req.body;
        const sender = userId


        // Create a new message instance
        const newMessage = new Message({ roomId, sender, receiver, messageText });

        // Save the message to the database
        await newMessage.save();

        io.to(`room_${roomId}`).emit('message', newMessage);

        // Respond with success message and the new message data
        res.status(201).json({ status: 201, message: 'Message created successfully', message: newMessage });
    } catch (err) {
        console.log(err);
        // Handle any errors
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode,
            apiEndpoint: req.originalUrl,
        });
        await error.save();
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};


exports.getMessages = async (req, res) => {
    try {
        // Fetch all messages from the database
        const { roomId } = req.body
        const messages = await Message.find({ roomId });

        // Respond with the fetched messages
        res.status(200).json({ status: 200, messages: messages });
    } catch (err) {
        // Handle any errors
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode,
            apiEndpoint: req.originalUrl,
        });
        await error.save();
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};