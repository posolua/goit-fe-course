import React from 'react';
import DishCard from './DishCard';

const DishMenu = ({ items }) => (
  <div className="dish-menu-wrap">
    <ul className="dish-menu">
      {items.map(item => (
        <li key={item.id}>
          <DishCard name={item.name} price={item.price} image={item.image} />
        </li>
      ))}
    </ul>
  </div>
);

export default DishMenu;
