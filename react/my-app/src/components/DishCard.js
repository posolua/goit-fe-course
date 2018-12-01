import React from 'react';

const DishCard = ({ name, price, image }) => (
  <div>
    <img src={image} alt={name} width="250" />
    <p>{name}</p>
    <p>{price}</p>
  </div>
);

export default DishCard;
