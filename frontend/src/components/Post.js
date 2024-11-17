import React from 'react';
import PropTypes from 'prop-types';

function Post({ title, content, url, imageUrl, onBookmark, onDeleteBookmark, isBookmarked, viewBookmarks }) {
  // Define a fallback image URL
  const placeholderImage = "https://via.placeholder.com/400x200?text=No+Image+Available";

  return (
    <div className="card mb-3">
      <img
        src={imageUrl || placeholderImage}
        className="card-img-top"
        alt={title || 'No Title Available'}
      />
      <div className="card-body">
        <h5 className="card-title">{title || 'No Title Available'}</h5>
        <p className="card-text">{content || 'No Content Available'}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
          Read More
        </a>
        {!viewBookmarks && (
          <button
            className="btn btn-secondary me-2"
            onClick={onBookmark}
            disabled={isBookmarked}
            aria-label={isBookmarked ? 'Article already bookmarked' : 'Bookmark this article'}
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        )}
        {viewBookmarks && (
          <button
            className="btn btn-danger"
            onClick={onDeleteBookmark}
            aria-label="Delete this bookmark"
          >
            Delete Bookmark
          </button>
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  onBookmark: PropTypes.func.isRequired,
  onDeleteBookmark: PropTypes.func,
  isBookmarked: PropTypes.bool,
  viewBookmarks: PropTypes.bool,
};

Post.defaultProps = {
  title: 'No Title Available',
  content: 'No Content Available',
  imageUrl: '',
  isBookmarked: false,
  viewBookmarks: false,
};

export default Post;
