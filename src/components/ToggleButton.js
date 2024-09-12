import React from 'react';

const ToggleButton = ({ toggleUnit, unit }) => {
  return (
    <div className='toggle-button'>
    <button  onClick={toggleUnit}>
      Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
    </button>
    </div>
  );
};

export default ToggleButton;
