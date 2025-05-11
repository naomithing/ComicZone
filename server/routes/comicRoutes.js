const express = require('express');
const router = express.Router();
const { getApprovedComics } = require('../controllers/comicController');

// GET approved comics
router.get('/approved', getApprovedComics);

module.exports = router; 