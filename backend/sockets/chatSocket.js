const { verifyToken } = require('..//controllers/tokenController');
const Message = require('../models/message');
const Room = require('../models/room');

// Socket logic for real-time messaging with rooms
module.exports = async function handleSocket(socket) {

    try {
        // Assume user has authenticated and userId is available
        const token = socket.handshake.query.token;
        const { userId } = await verifyToken(token);

        console.log('A user connected');

        // Retrieve rooms associated with the user from the database
        const rooms = await Room.find({ users: userId });

        // Join the user to their rooms
        rooms.forEach(room => {
            socket.join(`room_${room._id}`);
            console.log(`User joined room room_${room._id}`);
        });

        // Listen for 'message' event
        socket.on('message', async (msg) => {
            try {
                const { roomId, receiver, messageText } = msg;

                // Create a new message instance
                const newMessage = new Message({ roomId, sender: userId, receiver, messageText });

                // Save the message to the database
                await newMessage.save();

                // Emit the message to all clients in the room
                socket.to(`room_${roomId}`).emit('message', newMessage);
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

    } catch (error) {
              // Listen for 'message' event
              socket.on('connect_error', async (msg) => {
                try {
                    const { roomId } = msg;
                    socket.to(`room_${roomId}`).emit('message', 'connect_error');
                } catch (error) {
                    console.error('Error handling message:', error);
                }
            });
        // Handle error here (e.g., emit an error message back to the sender)
    }

    // Listen for 'disconnect' event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};
