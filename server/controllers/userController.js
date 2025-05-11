const User = require('../model/User');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register User
exports.register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      console.log('Missing required fields:', { username, email, password: !!password });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      console.log('Password too short:', password.length);
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user exists
    console.log('Checking if user already exists...');
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      console.log('User already exists:', { email, username });
      return res.status(400).json({ 
        message: userExists.email === email ? 
          'Email already registered' : 
          'Username already taken'
      });
    }

    console.log('Creating new user...');
    // Create user
    const user = await User.create({
      username,
      email,
      password
    });
    console.log('User created successfully:', { id: user._id, username: user.username });

    // Generate token
    const token = generateToken(user._id);
    console.log('Token generated for user:', user._id);

    const response = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token
    };
    console.log('Sending response:', { ...response, token: '[hidden]' });
    
    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    console.log('Login request received:', { email: req.body.email });
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Missing login credentials:', { email: !!email, password: !!password });
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user
    console.log('Searching for user with email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('User found:', { id: user._id, username: user.username });

    // Check password
    console.log('Verifying password...');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password verification failed for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('Password verified successfully');

    // Generate token
    const token = generateToken(user._id);
    console.log('Token generated for user:', user._id);

    const response = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token
    };
    console.log('Sending login response:', { ...response, token: '[hidden]' });

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Error fetching profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update Profile Image
exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'comiczone/profiles',
      width: 300,
      crop: 'scale'
    });

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: result.secure_url },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Update profile image error:', error);
    res.status(500).json({ 
      message: 'Error updating profile image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 