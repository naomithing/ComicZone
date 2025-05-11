require('dotenv').config();
const mongoose = require('mongoose');
const Upload = require('../model/Upload');

async function listComics() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/comiczone');
    console.log('Connected to MongoDB');

    // Find all comics
    const comics = await Upload.find();
    
    if (comics.length === 0) {
      console.log('No comics found in the database.');
    } else {
      console.log(`Found ${comics.length} comics:`);
      comics.forEach((comic, index) => {
        console.log(`\nComic ${index + 1}:`);
        console.log(`ID: ${comic._id}`);
        console.log(`Title: ${comic.title}`);
        console.log(`Author: ${comic.author}`);
        console.log(`Approved: ${comic.approved === undefined ? 'Pending' : comic.approved ? 'Approved' : 'Rejected'}`);
        console.log(`Status: ${comic.status}`);
        console.log(`Uploaded By: ${comic.uploadedBy}`);
        console.log(`Created At: ${comic.createdAt}`);
      });
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

listComics(); 