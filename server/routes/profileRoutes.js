const express = require('express');
const router = express.Router();  // Use Express's built-in Router
const {
  getUserProfile,
  updateUserProfile,
  updateProfileImage,
  updateUserStats
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const getEmail = require('../middleware/getEmail');

// Apply auth middleware to all routes
router.use(protect);
router.use(getEmail);

// Profile routes
router.route('/')
  .get(getUserProfile)
  .put(updateUserProfile);

router.put('/profile/image', updateProfileImage);
router.patch('/stats/:statType', updateUserStats);

module.exports = router;
