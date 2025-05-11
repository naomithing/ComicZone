const User = require('../model/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};

// @desc    Ban a user (update role or add banned flag)
// @route   PATCH /api/users/:id/ban
// @access  Admin
const banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'banned' }, // or use { isBanned: true } if you prefer
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User banned successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to ban user', error });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  banUser
};
