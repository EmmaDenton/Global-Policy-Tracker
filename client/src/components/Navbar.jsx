import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const currentPage = useLocation().pathname;
  return (
    <nav>
      <ul>
        <li>
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'} 
          >
          Global Policy Tracker
          </Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link
          to="/donate"
          className={currentPage === '/Donate' ? 'nav-link active' : 'nav-link'} 
          >
          Donate
          </Link>
        </li>
        <li>
          <Link
          to="/signup"
          className={currentPage === '/Blog' ? 'nav-link active' : 'nav-link'}
          >
          Signup
          </Link>
        </li>
        <li>
          <Link
          to="/login"
          className={currentPage === '/LoginForm' ? 'nav-link active' : 'nav-link'}
          >
          Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

