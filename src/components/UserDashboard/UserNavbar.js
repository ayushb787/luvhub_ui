import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNavbar.css';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-container">
        <h1 className="navbar-logo">LuvHub 💓</h1>
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <a href="/user-dashboard">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
