const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI);
    
    // Set mongoose debug mode in development
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      family: 4 // Use IPv4, skip trying IPv6
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Database Name:', conn.connection.name);
    console.log('Connection State:', conn.connection.readyState);
    
    // Log when the connection is lost
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });
    
    // Log when the connection is reconnected
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
    // Log when the connection is closed
    mongoose.connection.on('close', () => {
      console.log('MongoDB connection closed');
    });
    
    // Log when the connection is error
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  } catch (error) {
    console.error('MongoDB Connection Error:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to MongoDB server. Please check if:');
      console.error('1. MongoDB is installed and running');
      console.error('2. The connection string is correct');
      console.error('3. MongoDB is accepting connections on port 27017');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB; 