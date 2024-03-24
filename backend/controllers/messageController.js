// messageController.js
const Message = require('../models/message');

// Controller function to create a new message
exports.createMessage = async (req, res) => {
    try {
        // Extract message data from the request body
        const { sender, receiver, messageText } = req.body;

        // Create a new message instance
        const newMessage = new Message({ sender, receiver, messageText });

        // Save the message to the database
        await newMessage.save();

        // Respond with success message and the new message data
        res.status(201).json({ message: 'Message created successfully', message: newMessage });
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getMessages = async (req, res) => {
    try {
        // Fetch all messages from the database
        const messages = await Message.find();

        // Respond with the fetched messages
        res.status(200).json(messages);
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};