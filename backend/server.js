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

    // Filter out articles with '[Removed]' in title or description
    const filteredArticles = response.data.articles.filter(article =>
      article.title && article.description && article.title !== '[Removed]' && article.description !== '[Removed]'
    );
    res.json(filteredArticles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let bookmarks = [];

// Route to add a bookmark
app.post('/api/bookmarks', (req, res) => {
  const article = req.body;
  if (!bookmarks.some(b => b.url === article.url)) {
    bookmarks.push(article);
  }
  res.status(201).json({ success: true, message: 'Article bookmarked successfully!' });
});

// Route to get all bookmarks
app.get('/api/bookmarks', (req, res) => {
  res.json(bookmarks);
});

// Route to delete a bookmark
app.delete('/api/bookmarks', (req, res) => {
  const { url } = req.body; // Extract the URL from the request body
  const initialLength = bookmarks.length;
  bookmarks = bookmarks.filter(bookmark => bookmark.url !== url); // Remove the bookmark with matching URL
  if (bookmarks.length < initialLength) {
    res.status(200).json({ success: true, message: 'Bookmark deleted successfully!' });
  } else {
    res.status(404).json({ success: false, message: 'Bookmark not found!' });
  }
});


