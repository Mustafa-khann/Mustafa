import React from 'react';

const ArmSegment = ({ position, rotation, length, color = 'var(--slate, #878787)' }) => {
  return (
    <div
      className='arm-segment'
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: length,
        height: '20px',
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'left center',
        borderRadius: '10px',
      }}
    />
  );
};

export default ArmSegment;
