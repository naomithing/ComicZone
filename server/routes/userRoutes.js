const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfileImage } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile/image', protect, upload.single('image'), updateProfileImage);

module.exports = router; 