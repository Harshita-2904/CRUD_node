const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for JWT operations

// Middleware function to verify JWT and authenticate user
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1] || req.headers['x-access-token']; // Extract token after 'Bearer' word
    
    // If token is not present, return an error response with 401 status
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided.' });

    try {
        // Verify the token using the secret key ('your_jwt_secret_key')
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        
        // If token is valid, attach the decoded user data to req.user
        req.user = decoded;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (ex) {
        // If token verification fails, return an error response with 400 status
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware; // Export the middleware for use in other parts of the app
