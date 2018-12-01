import React from 'react';

const AppNav = ({ items }) => (
  <nav className="app-nav">
    <ul className="app-nav__list">
      {items.map(item => (
        <li className="app-nav__list-item" key={item.id}>
          <a className="app-nav__list-item-link" href="\">
            {item.name}{' '}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
export default AppNav;
