const User = require('../model/User');
const fs = require('fs');
const path = require('path');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -__v')
      .populate('favoriteComics', 'title coverImage');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      stats: user.stats || {
        uploads: 0,
        favorites: 0,
        downloads: 0
      },
      favoriteComics: user.favoriteComics || [],
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password -__v');

    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile image
exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete old image if exists
    if (user.profileImage) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', user.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Save new image
    user.profileImage = req.file.filename;
    await user.save();

    res.json({ profileImage: user.profileImage });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user stats
exports.updateUserStats = async (req, res) => {
  try {
    const { statType } = req.params;
    
    if (!['uploads', 'favorites', 'downloads'].includes(statType)) {
      return res.status(400).json({ message: 'Invalid stat type' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { [`stats.${statType}`]: 1 } },
      { new: true }
    ).select('stats');

    res.json({ stats: user.stats });
  } catch (error) {
    console.error('Error updating stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};