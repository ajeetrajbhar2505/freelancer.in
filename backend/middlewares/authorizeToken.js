const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Authorization function middleware
async function authorizeToken(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        // Token is missing
        return res.status(401).sendFile(__dirname + "/public/index.html");
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, 'your_secret_key');

        // Find the user based on the decoded token
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            // User not found
            return res.status(401).sendFile(__dirname + "/public/index.html");
        }

        // Continue with the route handling
        next();
    } catch (error) {
        // Token verification failed
        console.error(error);
        return res.status(401).send("Unauthorized");
    }
}

module.exports = authorizeToken;
