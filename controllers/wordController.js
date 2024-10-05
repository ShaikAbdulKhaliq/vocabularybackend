const axios = require('axios');
const Word = require("../models/word")

// Function to fetch a word from Oxford API or local cache
exports.addWord = async (req, res) => {
  const { word } = req.body;
  console.log("res"+word);

  // Check if the word already exists in the database
  const existingWord = await Word.findOne({ word });

  console.log("existing"+existingWord);

  if (existingWord) {
    return res.json(existingWord); // Return the cached word from MongoDB
  }

  // If the word is not in the cache, fetch it from Oxford API
  try {
    console.log("inside try block");

    const response = await axios.get(`https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-us/${word}`, {
      headers: {
        app_id: process.env.OXFORD_APP_ID,   // Oxford API ID from environment variables
        app_key: process.env.OXFORD_API_KEY  // Oxford API Key from environment variables
      }
    });

    console.log("response"+response);
  

    // Store the fetched word in MongoDB
    const newWord = new Word({
      word: word,
      meaning: response.data // Store the full response from the API
    });

    await newWord.save();  // Save the new word in the database
    res.json(newWord);     // Return the saved word as the response
  } catch (error) {
    res.status(500).json({ error: 'Word not found or API error' }); // Handle errors
    console.log("error"+error)
  }
};

// Function to search for words in MongoDB
exports.searchWords = async (req, res) => {
  const { query } = req.query;

  // Find words in the MongoDB cache that match the search query
  const words = await Word.find({ word: { $regex: query, $options: 'i' } });
  res.json(words); // Return the search results as JSON
};
