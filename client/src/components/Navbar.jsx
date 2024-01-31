import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/globalLight.jpg';
const Navbar = () => {
  const currentPage = useLocation().pathname;
  return (
    <div class="ui orange inverted menu" id='orange' >
      <div class="ui container"id='navBar'>
        <a class="header item" id='linkGlobal'>
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

