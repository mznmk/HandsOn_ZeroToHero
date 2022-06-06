import React from 'react';

const ColorfulMessage = (props) => {
  console.log("colorful");

  // [ extract props ]
  const { color, children } = props;

  // [ create style ]
  const contentStyle = {
    color: color,
    fontSize: '18px'
  };
  
  // [ return ]
  return (
    <p style={contentStyle}>{children}</p>
  );
};

export default ColorfulMessage;