import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/globalLight.jpg';
import Auth from '../utils/auth';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Navbar = () => {
  const currentPage = useLocation().pathname;
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  
  function submitCheckout() {
    getCheckout();
  }

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
          <div>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Donate</button>
            ) : (
              <h1 id='donateError'>Log in to Donate us! 😊</h1>
            )}
          </div>
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

