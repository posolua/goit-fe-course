import React from 'react';

const Logo = ({ imgUrl, alt, width = 60, height = 60 }) => (
  <div className="logo">
    <img
      className="logo__img"
      src={imgUrl}
      alt={alt}
      width={width}
      height={height}
    />
  </div>
);

export default Logo;
