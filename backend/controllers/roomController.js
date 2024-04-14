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

        // Find if there's an existing room for the user
        const existingRoom = await Room.findOne({ users: userId });

        if (existingRoom) {
            // Check if the receiverId is already in the room
            const receiverInRoom = existingRoom.users.includes(receiverId);

            // If receiverId is already in the room, update the relationship flag to 'requested'
            if (receiverInRoom) {
                const updatedRoom = await Room.findOneAndUpdate(
                    { _id: existingRoom._id, 'relationships.$[elem]': 'accept' },
                    { $set: { 'relationships.$[elem]': 'requested' } },
                    { arrayFilters: [{ 'elem': receiverId }] }
                );
                return res.status(200).json({ status: 200, message: 'User added successfully' });
            } else {
                // If receiverId is not in the room, add it to the users array and set its relationship flag to 'requested'
                const updatedRoom = await Room.findOneAndUpdate(
                    { _id: existingRoom._id },
                    { $addToSet: { users: receiverId }, $set: { [`relationships.${receiverId}`]: 'requested' } },
                    { new: true }
                );
                return res.status(200).json({ status: 200, message: 'User added successfully' });
            }
        } else {
            // Create a new room instance
            const newRoom = new Room({
                users: [userId.toString(), receiverId.toString()],
                relationships: { [userId.toString()]: 'accept', [receiverId.toString()]: 'requested' }
            });

            // Save the room to the database
            await newRoom.save();
            return res.status(200).json({ status: 200, message: 'User added successfully' });
        }


        // Respond with success message and the new room data
        res.status(201).json({ status: 201, message: 'User added successfully' });
    } catch (err) {
        // Handle any errors
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
