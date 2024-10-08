import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the login token from local storage or cookies
    localStorage.removeItem('loginToken');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;