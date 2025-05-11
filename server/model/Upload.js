const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genres: {
    type: [String],
    required: true,
    enum: [
      'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
      'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
    ]
  },
  status: {
    type: String,
    required: true,
    enum: ['Ongoing', 'Completed']
  },
  summary: {
    type: String,
    required: true,
    minlength: 100
  },
  coverImageUrl: {
    type: String,
    required: true
  },
  chapterFiles: [
    {
      fileName: String,
      fileUrl: String
    }
  ],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approved: {
    type: Boolean,
    default: null
  },
  action: {
    type: String,
    enum: ['Accept', 'Decline']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;
