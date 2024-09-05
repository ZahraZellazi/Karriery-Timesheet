import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="main-container">
        {/* use flex to align items in the header */}
        <div className="logo">
          <span className="app-name">Karriery Rh App</span>
        </div>
        {/* avatar here */}
      </div>

    </header>
  );
};

export default Header;
