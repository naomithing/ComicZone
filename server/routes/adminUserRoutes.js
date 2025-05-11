const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  banUser
} = require('../controllers/adminUserController');
const { protect, authorize } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(protect);
router.use(authorize('admin'));

// Route: GET all users
router.get('/', getAllUsers);

// Route: DELETE user by ID
router.delete('/:id', deleteUser);

// Route: PATCH to ban user
router.patch('/:id/ban', banUser);

module.exports = router;
