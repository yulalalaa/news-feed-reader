import React from 'react';

function Post({ title, content, url, imageUrl }) {
  return (
    <div className="card mb-3">
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={title} />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read More
        </a>
      </div>
    </div>
  );
}

export default Post;
