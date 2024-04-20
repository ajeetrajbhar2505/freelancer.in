const { verifyToken } = require('..//controllers/tokenController'); // Assuming emailService.js is the file where the functions are implemented
const Message = require('../models/message');
// Socket logic for real-time messaging with rooms
module.exports = async function handleSocket(socket) {
    console.log('A user connected');

    try {
        // Assume user has authenticated and userId is available
        const token = socket.handshake.query.token
        const { userId } = await verifyToken(token);

        // Joining a room specific to the user (e.g., using their user ID)
        socket.join(`user_${userId}`);

        // Listen for 'message' event
        socket.on('message', async (msg) => {
            try {
                const { roomId, receiver, messageText } = msg;

                // Assuming room ID is based on receiver's user ID
                const room = `user_${receiver}`;

                // Create a new message instance
                const newMessage = new Message({ roomId, sender: userId, receiver, messageText });

                // Save the message to the database
                await newMessage.save();

                // Emit the message to all clients in the specified room
                socket.to(room).emit('message', newMessage);
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

    } catch (error) {
        socket.on('message', async (msg) => {
            const { receiver } = msg;
            const room = `user_${receiver}`;
            socket.to(room).emit('message', 'error');
        })
    }

    // Listen for 'disconnect' event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};
