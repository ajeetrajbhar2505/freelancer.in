
const ErrorModel = require('../models/errorSchema');

module.exports = async (socket) => {
    try {
        console.log(`A user connected`);

        // Listen for 'message' event
        socket.on('message', async (msg) => {
            try {
                socket.emit('message', msg);
            } catch (error) {
                console.error('Error while processing message:', error);
            }
        });
    } catch (err) {

        console.log(err);
        // Log the error
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode || 500, // Default status code to 500 if not provided
            apiEndpoint: 'ws://localhost:3000/socket.io',
        });
        await error.save();
        
        // Disconnect the socket
    //     socket.on('message', async (msg) => {
    //     socket.emit('message', 'error');
    // })
    }

    // Listen for 'disconnect' event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};
