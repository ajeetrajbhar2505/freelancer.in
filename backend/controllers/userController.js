// userController.js
const User = require('../models/user');
const Token = require('../models/Token');
const ErrorModel = require('../models/errorSchema');
const { generateToken, verifyToken } = require('..//controllers/tokenController'); // Assuming emailService.js is the file where the functions are implemented


// Controller function to create a new user
exports.createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const { username, password, email } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ status: 400, error: 'Username or email already exists' });
        }

        // Create a new user instance
        const newUser = new User({ username, password, email });

        // Save the user to the database
        await newUser.save();

        // Generate token and respond with success message and token
        generateToken({ userId: newUser._id.toString(), email: newUser.email, dateTime: new Date() }, async (err, token) => {
            if (err) {
                // Handle any errors
                const error = new ErrorModel({
                    message: err.message,
                    statusCode: err.statusCode,
                    apiEndpoint: req.originalUrl,
                });
                await error.save();
                return res.status(500).json({ status: 500, error: "Failed to generate token" });
            }
            res.status(201).json({ status: 201, message: 'User created successfully', token });
        });
    } catch (err) {
        // Handle any errors
        console.error(err);
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode,
            apiEndpoint: req.originalUrl,
        });
        await error.save();
        res.status(500).json({ status: 500, error: 'Server error' });
    }
};




exports.verifyOTP = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer token"
        const { userId } = await verifyToken(token);

        const tokenData = await Token.findOne({ userId }).sort({ dateTime: -1 });

        if (!tokenData) {
            return res.status(401).json({ status: 401, error: 'Unauthorized' });
        }

        const otp = tokenData.otp;
        const { otp: enteredOtp } = req.body;

        if (otp != enteredOtp) {
            return res.status(401).json({ status: 401, error: 'Invalid OTP' });
        }

        // Update the token document to mark it as verified
        const isEmailverfyurl = req.originalUrl == '/api/users/verify-email' ? true : false
        if (isEmailverfyurl) {
        await User.findByIdAndUpdate(tokenData.userId, { email_verified: true });
        }
        else {
        await Token.findByIdAndUpdate(tokenData._id, { verified: true });
        }

        return res.status(200).json({ status: 200, message: 'OTP verified successfully' });
    } catch (err) {
        console.log(err);
        // Handle any errors
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode,
            apiEndpoint: req.originalUrl,
        });
        await error.save();
        if (err.name === 'TokenExpiredError') {
            try {
                // Attempt to delete the token document
                await Token.deleteOne({ otp: req.body.otp });
                return res.status(401).json({ status: 401, error: 'Token expired' });
            } catch (deleteError) {
                // If deleting the token fails, still return a response indicating token expiration
                console.log('failed to delete token');
                return res.status(401).json({ status: 401, error: 'Token expired' });
            }
        }
        // Other errors are considered server errors
        res.status(500).json({ status: 500, error: 'Server error' });
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
    } catch (err) {
        // Handle any errors
        const error = new ErrorModel({
            message: err.message,
            statusCode: err.statusCode,
            apiEndpoint: req.originalUrl,
        });
        await error.save();
        return res.status(500).json({ status: 500, response: "Internal server error" });
    }
};

