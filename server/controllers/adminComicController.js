const Upload = require('../model/Upload');
const path = require('path');
const fs = require('fs');

// Helper to move files
const moveFile = (file, folderName) => {
  const targetPath = path.join('uploads', folderName, file.originalname);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.renameSync(file.path, targetPath);
  return `/${targetPath}`;
};

// GET all comics (admin view)
const getAllComics = async (req, res) => {
  try {
    const comics = await Upload.find()
      .populate('uploadedBy', 'username email role')
      .sort({ createdAt: -1 }) // Sort by newest first
      .select('title author genres status summary coverImageUrl chapterFiles uploadedBy approved createdAt');

    // Transform the data to include status and uploader info
    const transformedComics = comics.map(comic => ({
      ...comic.toObject(),
      status: comic.approved === null ? 'pending' : comic.approved ? 'approved' : 'rejected',
      uploadedBy: comic.uploadedBy ? {
        id: comic.uploadedBy._id,
        username: comic.uploadedBy.username,
        email: comic.uploadedBy.email,
        role: comic.uploadedBy.role,
        isAdmin: comic.uploadedBy.role === 'admin'
      } : null,
      isAdminUpload: comic.uploadedBy?.role === 'admin'
    }));

    res.status(200).json(transformedComics);
  } catch (error) {
    console.error('Failed to fetch comics:', error);
    res.status(500).json({ message: 'Failed to fetch comics', error: error.message });
  }
};

// PATCH - Approve a comic
const approveComic = async (req, res) => {
  try {
    const comic = await Upload.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(200).json({ message: 'Comic approved', comic });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve comic', error });
  }
};

// PATCH - Reject a comic
const rejectComic = async (req, res) => {
  try {
    const comic = await Upload.findByIdAndUpdate(
      req.params.id,
      { approved: false },
      { new: true }
    );
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(200).json({ message: 'Comic rejected', comic });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject comic', error });
  }
};

// Upload comic (admin)
const uploadComic = async (req, res) => {
  try {
    const {
      title,
      author,
      genres,
      status,
      summary,
      approved
    } = req.body;

    // Files from multer
    const coverImage = req.files['coverImage']?.[0];
    const chapterFiles = req.files['chapters'] || [];

    if (!coverImage) {
      return res.status(400).json({ error: 'Cover image is required' });
    }

    const coverImageUrl = moveFile(coverImage, 'covers');
    const chapters = chapterFiles.map(file => ({
      fileName: file.originalname,
      fileUrl: moveFile(file, 'chapters')
    }));

    const newComic = new Upload({
      title,
      author,
      genres: Array.isArray(genres) ? genres : [genres],
      status,
      summary,
      coverImageUrl,
      chapterFiles: chapters,
      uploadedBy: req.user._id, // Admin's user ID
      approved: approved === 'true' // Set to true for admin uploads
    });

    await newComic.save();
    res.status(201).json({ message: 'Comic uploaded successfully!', comic: newComic });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllComics,
  approveComic,
  rejectComic,
  uploadComic
};
