import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Feed() {
  // State to manage list of posts from NewsAPI
  const [posts, setPosts] = useState([]);
  
  // State to manage list of bookmarked articles
  const [bookmarks, setBookmarks] = useState([]);
  
  // State to toggle between viewing posts and viewing bookmarks
  const [viewBookmarks, setViewBookmarks] = useState(false);
  
  // State to manage selected topic for fetching news articles
  const [topic, setTopic] = useState('technology'); // Default topic
  
  // State to manage notifications to the user (e.g., successful bookmark)
  const [notification, setNotification] = useState('');

  // useEffect to fetch either bookmarks or news articles depending on viewBookmarks state
  useEffect(() => {
    if (viewBookmarks) {
      // Fetch bookmarks when viewing bookmarks
      axios.get('http://localhost:5000/api/bookmarks')
        .then(response => setBookmarks(response.data))
        .catch(error => console.error('Error fetching bookmarks:', error));
    } else {
      // Fetch posts related to the selected topic when not viewing bookmarks
      axios.get(`http://localhost:5000/api/news?topic=${topic}`)
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [viewBookmarks, topic]); // Effect is dependent on viewBookmarks and topic changes

  // Function to handle bookmarking an article
  const handleBookmark = (post) => {
    // Immediately update bookmarks state to reflect the change locally
    setBookmarks((prevBookmarks) => [...prevBookmarks, post]);
  
    // Send the request to the server to bookmark the article
    axios.post('http://localhost:5000/api/bookmarks', post)
      .then(() => {
        // Set a success notification message for the user
        setNotification('Article bookmarked successfully!');
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(error => {
        // Handle error and set failure notification
        console.error('Error bookmarking article:', error);
        setNotification('Failed to bookmark the article.');
        setTimeout(() => setNotification(''), 3000);
      });
  };
  
  // Function to handle deleting a bookmark
  const handleDeleteBookmark = (url) => {
    // Send DELETE request to the server to remove the bookmark
    axios.delete('http://localhost:5000/api/bookmarks', { data: { url } })
      .then(() => {
        // Set a success notification and update local bookmarks state
        setNotification('Bookmark deleted successfully!');
        setBookmarks(bookmarks.filter(bookmark => bookmark.url !== url)); // Update local state
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(error => {
        // Handle error and set failure notification
        console.error('Error deleting bookmark:', error);
        setNotification('Failed to delete the bookmark.');
        setTimeout(() => setNotification(''), 3000);
      });
  };

  // Function to handle changing the topic for fetching news articles
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div>
      {/* Topic selection dropdown, only shown when viewing articles */}
      {!viewBookmarks && (
        <div className="mb-3">
          <select onChange={handleTopicChange} className="form-select">
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
            <option value="business">Business</option>
            <option value="politics">Politics</option>
          </select>
        </div>
      )}

      {/* Button to toggle between viewing articles and viewing bookmarks */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => setViewBookmarks(!viewBookmarks)}
      >
        {viewBookmarks ? 'View All Articles' : 'View Bookmarks'}
      </button>

      {/* Notification message, if any */}
      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}

      {/* Render articles or bookmarks based on the viewBookmarks state */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {(viewBookmarks ? bookmarks : posts)
          .filter(post => post.title && post.description && post.title !== '[Removed]' && post.description !== '[Removed]') // Filter out incomplete or placeholder posts
          .map((post, index) => (
            <div key={index} className="col">
              <Post
                title={post.title}
                content={post.description}
                url={post.url}
                imageUrl={post.urlToImage}
                onBookmark={() => handleBookmark(post)} // Bookmark handler
                onDeleteBookmark={() => handleDeleteBookmark(post.url)} // Delete bookmark handler
                isBookmarked={bookmarks.some(b => b.url === post.url)} // Determine if the post is bookmarked
                viewBookmarks={viewBookmarks} // Pass the state to Post component
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Feed;
