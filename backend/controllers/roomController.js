// roomController.js
const Room = require('../models/room');
const User = require('../models/user');
const ErrorModel = require('../models/errorSchema');
const path = require('path')
const { verifyToken } = require('..//controllers/tokenController'); // Assuming emailService.js is the file where the functions are implemented

// Controller function to create a new room
exports.createRoom = async (req, res) => {
    try {
        // Check if authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).sendFile(path.join(__dirname, '../public/html/index.html'));
        }

        // Extract token from authorization header
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer token"

        // Verify token and get userId
        const { userId } = await verifyToken(token);

        // Extract receiverId from request body
        const { receiverId } = req.body;

        // Check if room already exists for both users
        const existingRoom = await Room.findOne({ users: { $all: [userId, receiverId] } });

        // If room already exists, respond with success message
        if (existingRoom) {
            return res.status(201).json({ status: 201, message: 'Room already exists' });
        }

        // Create a new room instance
        const newRoom = new Room({
            users: [userId.toString(), receiverId.toString()],
            relationships: { [userId.toString()]: 'accept', [receiverId.toString()]: 'requested' }
        });

        // Save the room to the database
        await newRoom.save();

        // Respond with success message
        res.status(201).json({ status: 201, message: 'Room created successfully' });
    } catch (err) {
        // Handle any errors
        console.error(err);
        const error = new ErrorModel({
            message: err.message,
            stack: err.stack,
            apiEndpoint: req.originalUrl,
            timestamp: new Date(),
        });
        await error.save();
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};



// get users
exports.getUsers = async (req, res) => {
    try {

        // Check if authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).sendFile(path.join(__dirname, '../public/html/index.html'));
        }

        // Extract token from authorization header
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer token"

        // Verify token and get userId
        const { userId } = await verifyToken(token);


        // Fetch all rooms
        const rooms = await Room.find({ users: userId });


        // Populate users array in each room with user details and relationships
        const populatedRooms = await Promise.all(rooms.map(async (room) => {
            const populatedUsers = await User.find({ _id: { $in: room.users, $ne: userId } }, { _id: 1, username: 1, profile: 1, email: 1, online: 1, verified: 1, createdAt: 1 });

            // Map through users and add relationship information to each user
            const usersWithRelationships = populatedUsers.map(user => {
                const userIdString = user._id.toString();
                const relationship = room.relationships.get(userIdString) || '';
                return { ...user.toObject(), relationship };
            });

            return { ...room.toObject(), users: usersWithRelationships };
        }));


        res.status(200).json({ status: 200, data: populatedRooms });

    } catch (err) {
        // Handle any errors
        console.error(err);
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode,
            apiEndpoint: req.originalUrl,
        });
        await error.save();
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};


// Function to generate a UUID (for demonstration purposes)
function generateUUID() {
    // Generate a random UUID (not a secure method)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
