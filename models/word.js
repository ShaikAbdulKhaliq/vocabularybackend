const mongoose = require('mongoose');

// the Word schema
const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,  // Word must be provided
    unique: true     // Word must be unique in the database
  },
  meaning: {
    type: Object,    // The meaning will store the entire response from Oxford API
    required: true   // Word details are required
  }
});

// Create a Word model from the schema
const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
