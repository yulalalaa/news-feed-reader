import React from 'react';
import PropTypes from 'prop-types';

// Component to display a single news post
function Post({ title, content, url, imageUrl, onBookmark, onDeleteBookmark, isBookmarked, viewBookmarks }) {
  // Define a fallback image URL in case an article does not have an image
  const placeholderImage = "https://via.placeholder.com/400x200?text=No+Image+Available";

  return (
    <div className="card mb-3">
      {/* Display article image or fallback placeholder if no image is available */}
      <img
        src={imageUrl || placeholderImage}
        className="card-img-top"
        alt={title || 'No Title Available'}
      />
      <div className="card-body">
        {/* Display the article title or fallback if no title is available */}
        <h5 className="card-title">{title || 'No Title Available'}</h5>
        
        {/* Display the article content or fallback if no content is available */}
        <p className="card-text">{content || 'No Content Available'}</p>

        {/* Link to the full article */}
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
          Read More
        </a>

        {/* Bookmark button, only shown when viewing regular articles (not in bookmark view) */}
        {!viewBookmarks && (
          <button
            className="btn btn-secondary me-2"
            onClick={onBookmark}
            disabled={isBookmarked} // Disable button if article is already bookmarked
            aria-label={isBookmarked ? 'Article already bookmarked' : 'Bookmark this article'}
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        )}

        {/* Delete bookmark button, only shown when viewing bookmarked articles */}
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

// Define prop types for validation to ensure the correct types are passed to the component
Post.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string.isRequired, // URL is required for the "Read More" link
  imageUrl: PropTypes.string,
  onBookmark: PropTypes.func.isRequired, // Function to handle bookmarking the article
  onDeleteBookmark: PropTypes.func, // Function to handle deleting the bookmark
  isBookmarked: PropTypes.bool, // Boolean to check if the article is already bookmarked
  viewBookmarks: PropTypes.bool, // Boolean to determine if the view is bookmarks or regular posts
};

// Define default props to ensure fallback values in case props are not provided
Post.defaultProps = {
  title: 'No Title Available',
  content: 'No Content Available',
  imageUrl: '',
  isBookmarked: false,
  viewBookmarks: false,
};

export default Post;
