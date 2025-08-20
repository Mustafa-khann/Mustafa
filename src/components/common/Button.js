import React from 'react';
import '../../styles/common/index.css';

const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button className={`common-button ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
