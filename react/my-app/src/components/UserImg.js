import React from 'react';

const UserImg = ({ image = '', width = 60, height = 60 }) => (
  <img
    className="UserImg"
    src={image}
    alt="user avatar"
    width={width}
    height={height}
  />
);

export default UserImg;
