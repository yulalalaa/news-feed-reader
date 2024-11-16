const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import axios to make API requests
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Load API key from .env file

// Route to get posts from NewsAPI
app.get('/api/news', async (req, res) => {
  const topic = req.query.topic || 'technology'; // Default to technology news if no topic is provided
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: topic,
        apiKey: NEWS_API_KEY,
        pageSize: 10, // Fetch 10 articles at a time
        language: 'en',
      }
    });
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
