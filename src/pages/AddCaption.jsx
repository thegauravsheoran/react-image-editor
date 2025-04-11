import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CanvasEditor from '../components/CanvasEditor';

const AddCaption = () => {
  const location = useLocation();
  const [image, setImage] = useState(location.state?.image || null);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px', color: '#007bff' }}>Add Caption Page</h1>
      {image ? (
        <CanvasEditor image={image} />
      ) : (
        <p style={{ textAlign: 'center', color: 'red' }}>No image selected</p>
      )}
    </div>
  );
};

export default AddCaption;