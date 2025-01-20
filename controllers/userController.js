const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for creating JWTs
const bcrypt = require('bcrypt'); // Import bcrypt for hashing and comparing passwords

// Signup (User Registration)
const signup = async (req, res) => {
    const { name, email, password } = req.body; // Extract user data from request body
    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user with hashed password
        const user = new User({ name, email, password: hashedPassword });
        
        // Save the user to the database
        await user.save();
        
        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle any errors during registration
        res.status(400).json({ error: error.message });
    }
};

// Signin (User Login)
const signin = async (req, res) => {
    const { email, password } = req.body; // Extract user data from request body
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // If the user doesn't exist, return an error
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        // If passwords don't match, return an error
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        // Generate a JWT token with user ID as payload
        const token = jwt.sign({ _id: user._id }, 'your_jwt_secret_key');
        
        // Respond with the generated token
        res.json({ token });
    } catch (error) {
        // Handle any errors during login
        res.status(500).json({ error: error.message });
    }
};

// Get User Info (Authenticated User Data)
const getUserInfo = (req, res) => {
    // Send back the user data from the authenticated request
    res.json(req.user);
};

module.exports = { signup, signin, getUserInfo }; // Export the functions to use in other parts of the app
