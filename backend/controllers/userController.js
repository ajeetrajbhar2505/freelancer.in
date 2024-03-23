// userController.js
const User = require('../models/user');

// Controller function to create a new user
exports.createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const { username, password, email } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create a new user instance
        const newUser = new User({ username, password, email });

        // Save the user to the database
        await newUser.save();

        // Respond with success message and the new user data
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
