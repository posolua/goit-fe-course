/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';

const MenuFilter = ({ filter, onFilterChange }) => (
  <div className="menu-filter">
    <span className="menu-filter__name"> Filter</span>
    <input
      className="menu-filter__input"
      type="text"
      value={filter}
      onChange={onFilterChange}
      autoFocus
    />
  </div>
);

export default MenuFilter;
