import React from 'react';
import './Sidebar.css';
import logo from './logo.png'; 
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Project Logo" /> 
      </div>
      <ul className="links">
        <h4>Main Menu</h4>
        <li>
          <span className="material-symbols-outlined">home</span>
          <a href="#">Home</a>
        </li>
        <li>
          <span className="material-symbols-outlined">folder</span>
          <a href="#">Personal Calendar</a>
        </li>
        <li>
          <span className="material-symbols-outlined">add_circle</span>
          <a href="#">New Calendar</a>
        </li>
        <li>
          <span className="material-symbols-outlined">help</span>
          <a href="#">Help</a>
        </li>
        <hr />
        <h4>Account</h4>
        <li>
          <span className="material-symbols-outlined">account_circle</span>
          <a href="#">Profile</a>
        </li>
        <li>
          <span className="material-symbols-outlined">settings</span>
          <a href="#">Settings</a>
        </li>
        <li className="logout-link">
          <span className="material-symbols-outlined">logout</span>
          <a href="#">Logout</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
