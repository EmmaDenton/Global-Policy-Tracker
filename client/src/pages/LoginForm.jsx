import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
// import mapImg from '../assets/img/map.png';

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
      
      <main  id='mainContainer'>
        <div id='containerMapForm'>
          <div class="ui middle aligned center aligned grid">
            
            <div class="ui large form" >
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} class="inline field" >
                  <p>Email Address</p>
                  <input
                    placeholder="Email address"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                
                  <form onSubmit={handleFormSubmit} class="inline field" ></form>
                  <p id='passwordP'>Password</p>
                  <input
                    placeholder="Example password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <div class="ui two column centered grid">
                    <button
                    class="ui fluid  large submit button "
                    id='submitButton'
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    
                  >
                    Log in
                  </button>
                  </div>
                  
                </form>
                
              )}
              {error && (
                <div class="ui error message">
                  {error.message}
                </div>
              )}
              <div  class="ui two column centered grid" >
                Don't have an account <Link to="/signup">Sign Up!</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    
  );
};

export default LoginForm;
