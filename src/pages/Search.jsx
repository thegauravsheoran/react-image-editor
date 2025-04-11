import React, { useState } from 'react';
import { getImages } from '../api/pexels';
import ImageResults from '../components/ImageResults';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    if (!query.trim()) {
      setError('Search query cannot be empty.');
      return;
    }
    try {
      const results = await getImages(query);
      if (results.length === 0) {
        setError('No images found for the given query.');
      }
      setImages(results);
    } catch (err) {
      setError('An error occurred while fetching images. Please try again.');
    }
  };

  return (
    <div className="search-page">
      <h1>Search Your Favourite Images</h1>
      <div className="user-info">
        <h3>Name: Gaurav Sheoran</h3>
        <h3>Email: thegauravsheoran@gmail.com</h3>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter your search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {images.length === 0 && !error ? (
        <div className="no-results">
          <h2>No images!</h2>
        </div>
      ) : (
        <ImageResults images={images} />
      )}
    </div>
  );
};

export default Search;