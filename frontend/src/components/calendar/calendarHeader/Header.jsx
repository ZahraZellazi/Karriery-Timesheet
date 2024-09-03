import React from 'react';
import UserAvatar from 'react-user-avatar';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <span className="app-name">Karriery Rh App</span>
      </div>
      <div className="user-avatar">
        <UserAvatar size="48" name="John Doe" />
      </div>
    </header>
  );
};

export default Header;
