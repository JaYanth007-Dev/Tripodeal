// HeartIcon.js

import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';


const HeartIcon = () => {
  const [isFilled, setIsFilled] = useState(false);

  const handleHeartClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div className={`heart-icon ${isFilled ? 'filled' : ''}`} onClick={handleHeartClick}>
      <AiFillHeart />
    </div>
  );
};

export default HeartIcon;
