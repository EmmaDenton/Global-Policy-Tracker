import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/global.png';
const Navbar = () => {
  const currentPage = useLocation().pathname;
  return (
    <div class="ui orange fixed inverted menu" >
      <div class="ui container">
        <a class="header item">
          <Link
            to="/"
            className={currentPage === '/Home' ? 'nav-link active' : 'nav-link'} 
            ><img src={logo} alt="logo" class='logo' />
            </Link>
        </a>

        <div class="right menu">
          <a class="item" id='donateLink'>
            <Link
            to="/donate"
            className={currentPage === '/Donate' ? 'nav-link active' : 'nav-link'} class="ui primary button" id='itemDonate'
            >
            Donate
            </Link>
          </a>
          
          <div>
            <a class="item" id='loginLink'>
            <Link
            to="/login"
            className={currentPage === '/LoginForm' ? 'nav-link active' : 'nav-link'} class="item" id='itemLogin'
            >
            Log in
            </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

