const Comic = require('../model/Upload');
const path = require('path');
const fs = require('fs');

// Helper to move files (simulate "upload" to a static folder)
const moveFile = (file, folderName) => {
  const targetPath = path.join('uploads', folderName, file.originalname);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.renameSync(file.path, targetPath);
  return `/${targetPath}`; // Return URL path
};

const uploadComic = async (req, res) => {
  try {
    const {
      title,
      author,
      genres,
      status,
      summary,
      uploadedBy
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

    const newComic = new Comic({
      title,
      author,
      genres: Array.isArray(genres) ? genres : [genres],
      status,
      summary,
      coverImageUrl,
      chapterFiles: chapters,
      uploadedBy,
      approved: false
    });

    await newComic.save();
    res.status(201).json({ message: 'Comic uploaded successfully!', comic: newComic });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadComic };
