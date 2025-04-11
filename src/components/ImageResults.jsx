import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageResults.css';

const ImageResults = ({ images }) => {
  const navigate = useNavigate();

  const handleSelectImage = (url) => {
    navigate('/edit', { state: { image: url } });
  };

  return (
    <div className="image-results">
      {images.map((img) => (
        <div className="image-card" key={img.id}>
          <img src={img.src.medium} alt={img.alt} />
          <button onClick={() => handleSelectImage(img.src.large)}>Add Caption</button>
        </div>
      ))}
    </div>
  );
};

export default ImageResults;
