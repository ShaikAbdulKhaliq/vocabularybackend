const express = require('express');
const { addWord, searchWords } = require('../controllers/wordController');

const router = express.Router();

// POST route to add a word
router.post('/add', addWord);

// GET route to search for words
router.get('/search', searchWords);

module.exports = router;
