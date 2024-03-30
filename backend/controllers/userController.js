// userController.js
const User = require('../models/user');
const { generateToken, verifyToken } = require('..//controllers/tokenController'); // Assuming emailService.js is the file where the functions are implemented
const path = require('path');


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



// Controller function to verify an OTP from a token collection
exports.verifyOTP = async (req, res) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer token"
        const { userId } = await verifyToken(token);

        // Check if the token exists in the token collection (assuming you have this logic elsewhere)
        const tokenData = await Token.findOne({ userId });

        // If token not found or expired, return unauthorized error
        if (!tokenData) {
            return res.status(401).sendFile(path.join(__dirname, '../public/html/index.html'));
        }

        // Extract OTP from token data
        const otp = tokenData.otp;

        // Extract OTP from request body
        const { otp: enteredOtp } = req.body;

        // Verify entered OTP against stored OTP
        if (otp !== enteredOtp) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }

        // OTP is valid
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.authenticateUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ $or: [{ username: username, password: password }, { email: email, password: password }] });

        if (user) {
            if (!user.email_verified) {
                return res.status(201).json({ status: 201, response: "Please verify your email" });
            }

            generateToken({ userId: user._id.toString(), email: user.email, dateTime: new Date() }, function (err, token) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ status: 500, response: "Failed to generate token" });
                }
                return res.status(200).json({ status: 200, response: "OTP sent successfully", token: token });
            });
        } else {
            return res.status(303).json({ status: 303, response: "Credentials are incorrect" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, response: "Internal server error" });
    }
};

