import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import React from 'react';

import Auth from '../utils/auth';

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main  id="mainContainer">
      <div id='containerMapForm'>
        <div class="ui middle aligned center aligned grid">
          
          <div class="ui large form" >
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} class="inline field">
                <p id='nameSign'>Full name</p>
                <input
                  placeholder="Example Full Name"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
              <form onSubmit={handleFormSubmit} class="inline field"></form>
                <p id='emailSign'>Email Address</p>
                <input
                  placeholder="Email address"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              <form onSubmit={handleFormSubmit} class="inline field"></form>
                <p id='passwordSign'>Password</p>
                <input
                  placeholder="Example password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div class="ui two column centered grid">
                  <button
                  class="ui fluid large teal submit button"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  id='submitButton'
                  >
                    Sign up
                  </button>
                </div>
                
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {/* edit */}
              {/* <div class="ui error message"> */}
                {error.message}
              </div>
            )}
            
            <div  class="ui two column centered grid" >
                Already have an account <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
