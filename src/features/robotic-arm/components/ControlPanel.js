import React from 'react';

const ControlPanel = ({ onAngleChange, angles }) => {
  return (
    <div className='control-panel'>
      <h3>Arm Controls</h3>
      <div className='control-group'>
        <label>Base Rotation: {angles.base}°</label>
        <input
          type='range'
          min='0'
          max='360'
          value={angles.base}
          onChange={e => onAngleChange('base', e.target.value)}
        />
      </div>
      <div className='control-group'>
        <label>Shoulder: {angles.shoulder}°</label>
        <input
          type='range'
          min='-90'
          max='90'
          value={angles.shoulder}
          onChange={e => onAngleChange('shoulder', e.target.value)}
        />
      </div>
      <div className='control-group'>
        <label>Elbow: {angles.elbow}°</label>
        <input
          type='range'
          min='-90'
          max='90'
          value={angles.elbow}
          onChange={e => onAngleChange('elbow', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
