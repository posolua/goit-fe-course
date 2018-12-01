import React from 'react';
import Logo from './Logo';
import AppNav from './AppNav';
import UserMenu from './UserMenu';
import AppLogo from '../img/dish.png';
import avatar from '../img/bart.png';

const MainMenuItems = [
  { id: 'id=1', name: 'menu' },
  { id: 'id=2', name: 'about' },
  { id: 'id=3', name: 'contact' },
  { id: 'id=4', name: 'delivery' },
];

const AppHeader = () => (
  <header>
    <Logo imgUrl={AppLogo} alt="logo" />
    <div className="menu">
      <AppNav items={MainMenuItems} />
    </div>
    <UserMenu avatar={avatar} name="Bob Ross" />
  </header>
);

export default AppHeader;
