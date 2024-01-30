import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const currentPage = useLocation().pathname;
  return (
    <div class="ui fixed inverted menu" >
      <div class="ui container">
        <a class="header item">
          <Link
            to="/"
            className={currentPage === '/Home' ? 'nav-link active' : 'nav-link'}
            >Global Policy Tracker
            </Link>
        </a>

        <div class="right menu">
          <a>
            <Link
            to="/donate"
            className={currentPage === '/Donate' ? 'nav-link active' : 'nav-link'} class="item"
            >
            Donate
            </Link>
          </a>
          
          <div>
            <a >
            <Link
            to="/login"
            className={currentPage === '/LoginForm' ? 'nav-link active' : 'nav-link'} class="item"
            >
            Login
            </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

