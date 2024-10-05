const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const wordRoutes = require('./routes/wordRoutes');

// Initialize the Express app
const app = express();

// Use JSON parser for incoming requests
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Use the wordRoutes for any requests to /api/words
app.use('/api/words', wordRoutes);

// Connect to MongoDB using the MONGO_URI from environment variables
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

module.exports = app;
