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


exports.authenticateUser = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token for the user
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        // Respond with success message, user data, and token
        res.status(200).json({ message: 'Authentication successful', user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};