const express = require('express');
const { signup, signin, getUserInfo } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/signup', signup); // User signup
router.post('/signin', signin); // User signin
router.get('/me', authMiddleware, getUserInfo); // Get user info

module.exports = router ;
