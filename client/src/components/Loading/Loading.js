import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      {/* Use the public folder path */}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="loading-logo" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
