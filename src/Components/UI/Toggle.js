import React, { useState } from 'react';

const ToggleButton = (props) => {

  const handleClick = () => {
    props.onToggle(!props.value);
  };

  return (
    <button onClick={handleClick}>
      {props.value ? 'ON' : 'OFF'}
    </button>
  );
};


export default ToggleButton;
