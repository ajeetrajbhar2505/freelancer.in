// chatSocket.js
const Message = require('../models/message');
const { verifyToken } = require('..//controllers/tokenController'); // Assuming emailService.js is the file where the functions are implemented
const ErrorModel = require('../models/errorSchema');

// Socket logic for real-time messaging with rooms
module.exports = async (socket) => {
    console.log('A user connected');
    try {
        const token = socket.handshake.query.token
        const { userId } = await verifyToken(token);
        const sender = userId
        socket.on("message", async (msg) => {
            const { roomId, receiver, messageText } = req.body;
            // Create a new message instance
            const newMessage = new Message({ roomId, sender, receiver, messageText });

            // Save the message to the database
            await newMessage.save();

            io.emit(roomId, msg);
        });


    } catch (err) {
             // Handle any errors
             const error = new ErrorModel({
                message: err.message,
                statusCode: err.statusCode,
                apiEndpoint: 'ws://localhost:3000/socket.io',
            });
            await error.save();
    }



    // Listen for 'disconnect' event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};
