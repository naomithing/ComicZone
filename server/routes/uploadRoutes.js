const express = require('express');
const router = express.Router();
const { uploadComic } = require('../controllers/uploadController');

// Assuming multer config
const multer = require('multer');
const upload = multer({ dest: 'temp/' }); // temporary location before moving

// Upload route
router.post(
  '/',
  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'chapters' }]),
  uploadComic
);

module.exports = router;
