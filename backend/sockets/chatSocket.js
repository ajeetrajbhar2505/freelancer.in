const { verifyToken } = require('..//controllers/tokenController');
const Message = require('../models/message');
const Room = require('../models/room');

// Socket logic for real-time messaging with rooms
module.exports = async function handleSocket(socket) {

    try {
        // Assume user has authenticated and userId is available
        const token = socket.handshake.query.token;
        const { userId } = await verifyToken(token);


        // Join the user to their rooms
        socket.join(`room_${userId}`);
        console.log(`User joined room room_${userId}`);

        // Listen for 'message' event
        socket.on('message', async (msg, callback) => {
            try {
                const { roomId, receiver, messageText } = msg;

                // Create a new message instance
                const newMessage = new Message({ roomId, sender: userId, receiver, messageText });

                // Save the message to the database
                await newMessage.save();

                // Emit the message to all clients in the room
                socket.to(`room_${receiver}`).emit('message', newMessage);
                const lastSeen = newMessage.sentAt.toString()
                const lastMessage = newMessage.messageText
                 await Room.findByIdAndUpdate(roomId, { lastSeen, lastMessage });
                callback({ status: 200, message: 'Message send successfully' });
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });
        socket.on('call', async (msg, callback) => {
            try {
                const { receiver } = msg;
                // Emit the message to all clients in the room
                socket.to(`room_${receiver}`).emit('call', msg);
                callback({ status: 200, message: 'Calling started' });
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });
        socket.on('decline', async (msg, callback) => {
            try {
                const { receiver } = msg;
                // Emit the message to all clients in the room
                socket.to(`room_${receiver}`).emit('decline', msg);
                callback({ status: 200, message: 'Calling declined' });
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

        socket.on('handlerequests', async (msg, callback) => {
            try {
                const { receiverId,userId } = msg;
                // Emit the message to all clients in the room
                socket.to(`room_${receiverId}`).emit('handlerequests', msg);
                callback({ status: 200, message: 'handlerequests' });
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

        socket.on('accept', async (msg, callback) => {
            try {
                const { receiver } = msg;
                // Emit the message to all clients in the room
                socket.to(`room_${receiver}`).emit('accept', msg);
                callback({ status: 200, message: 'accept' });
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

    } catch (error) {
        // Listen for 'message' event
        console.log(error);
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
