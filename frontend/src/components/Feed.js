import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [viewBookmarks, setViewBookmarks] = useState(false);
  const [topic, setTopic] = useState('technology'); // Default topic
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (viewBookmarks) {
      axios.get('http://localhost:5000/api/bookmarks')
        .then(response => setBookmarks(response.data))
        .catch(error => console.error('Error fetching bookmarks:', error));
    } else {
      axios.get(`http://localhost:5000/api/news?topic=${topic}`)
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [viewBookmarks, topic]);

  const handleBookmark = (post) => {
    axios.post('http://localhost:5000/api/bookmarks', post)
      .then(() => {
        setNotification('Article bookmarked successfully!');
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(error => {
        console.error('Error bookmarking article:', error);
        setNotification('Failed to bookmark the article.');
        setTimeout(() => setNotification(''), 3000);
      });
  };

  const handleDeleteBookmark = (url) => {
    axios.delete('http://localhost:5000/api/bookmarks', { data: { url } })
      .then(() => {
        setNotification('Bookmark deleted successfully!');
        setBookmarks(bookmarks.filter(bookmark => bookmark.url !== url)); // Update local state
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(error => {
        console.error('Error deleting bookmark:', error);
        setNotification('Failed to delete the bookmark.');
        setTimeout(() => setNotification(''), 3000);
      });
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div>
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
      <button
        className="btn btn-primary mb-3"
        onClick={() => setViewBookmarks(!viewBookmarks)}
      >
        {viewBookmarks ? 'View All Articles' : 'View Bookmarks'}
      </button>

      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}

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
              onBookmark={() => handleBookmark(post)}
              onDeleteBookmark={() => handleDeleteBookmark(post.url)}
              isBookmarked={bookmarks.some(b => b.url === post.url)}
              viewBookmarks={viewBookmarks}
            />
          </div>
        ))}
    </div>

    </div>
  );
}

export default Feed;
