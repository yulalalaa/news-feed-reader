import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState('technology'); // Default topic

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news?topic=${topic}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [topic]);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div>
      <div className="mb-3">
        <select onChange={handleTopicChange} className="form-select">
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
        </select>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {posts.map((post, index) => (
          <div key={index} className="col">
            <Post
              title={post.title}
              content={post.description}
              url={post.url}
              imageUrl={post.urlToImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
