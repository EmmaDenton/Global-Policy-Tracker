import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/globalLight.jpg';
import Auth from '../utils/auth';

const Navbar = () => {
  const currentPage = useLocation().pathname;
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div class="ui orange inverted menu" id='orange' >
      <div class="ui container"id='navBar'>
        <a class="header item" id='linkGlobal'>
          <Link
            to="/"
            //edit className
            className={currentPage === '/Home' ? 'nav-link active' : 'nav-link'} 
            ><img src={logo} alt="logo" class='logo' />
            </Link>
        </a>

        <div class="right menu">
          <a class="item" id='donateLink'>
            <Link
            to="/donate"
            //edit className
            className={currentPage === '/Donate' ? 'nav-link active' : 'nav-link'} class="ui primary button" id='itemDonate'
            >
            Donate
            </Link>
          </a>
          
          <div>
          {Auth.loggedIn() ? (
            <>
              <span id='userName'>Hey there, {Auth.getProfile().data.username}!</span>
              <button class="ui button" id='loggedIn' onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
            to="/login"
            className={currentPage === '/LoginForm' ? 'nav-link active' : 'nav-link'} class="item" id='itemLogin'
            >
            Log in
            </Link>
            </>
          )}
          </div>

          {/* <div>
            <a class="item" id='loginLink'>
            <Link
            to="/login"
            className={currentPage === '/LoginForm' ? 'nav-link active' : 'nav-link'} class="item" id='itemLogin'
            >
            Log in
            </Link>
            </a>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Navbar;

