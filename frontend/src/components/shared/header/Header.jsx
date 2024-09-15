import React from 'react';
import Avatar from '../avatar/avatar'; 
import './Header.css'; 

const Header = ({ email }) => {
    return (
        <header className="app-header">
            <div className="logo">
                <span className="app-name">App Name</span>
            </div>
            <div className="avatar-container"> 
                <Avatar email={email} />
            </div>
        </header>
    );
};

export default Header;
