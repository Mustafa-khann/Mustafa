import React from 'react';
import '../../styles/common/index.css';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className='spinner'></div>
      {message && <p className='loading-message'>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
