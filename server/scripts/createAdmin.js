const mongoose = require('mongoose');
const User = require('../model/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/comiczone');
    console.log('Connected to MongoDB');

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@comiczone.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully:', {
      id: adminUser._id,
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role
    });

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin(); 