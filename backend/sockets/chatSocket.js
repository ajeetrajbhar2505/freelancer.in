const Message = require('../models/message');
const { verifyToken } = require('../controllers/tokenController');
const ErrorModel = require('../models/errorSchema');

module.exports = async (socket) => {
    try {
        // Extract user ID from token
        const token = socket.handshake.query.token;
        const { userId } = await verifyToken(token);
        console.log(`A user connected with userId ${userId}`);

        // Listen for 'message' event
        socket.on('message', async (msg) => {
            try {
                const { roomId, receiver, messageText } = msg;
                
                // Create a new message instance
                const newMessage = new Message({ roomId, sender: userId, receiver, messageText });
                
                // Save the message to the database
                await newMessage.save();
                
                // Broadcast the message to all clients including the sender
                socket.emit('message', msg);
            } catch (error) {
                console.error('Error while processing message:', error);
            }
        });
    } catch (err) {

        // Log the error
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode || 500, // Default status code to 500 if not provided
            apiEndpoint: 'ws://localhost:3000/socket.io',
        });
        await error.save();
        
        // Disconnect the socket
        socket.on('message', async (msg) => {
        socket.emit('message', 'error');
    })
    }

    // Listen for 'disconnect' event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};
