import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../config/CognitoConfig';
import classes from './SignIn.module.css'
import Logo from "./logo-2.png";
import { useNavigate } from 'react-router-dom';



const SignIn = () => {
  return (
    <div className={classes["container"]}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className={classes["leftPanel"]}>
      <h2 className='text-6xl'>Welcome to Codesync!</h2>
      <p className='text-lg'>Online Coding Interview Platform</p>
      {/* Placeholder for graphic */}
      <div className='w-[300px] h-auto'>
        <img alt="logo-2" src={Logo}/>
      </div>
    </div>
  );
};


const RightPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (event) => {
      event.preventDefault();

      const authenticationData = {
          Username: email,
          Password: password,
      };

      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const userData = {
          Username: email,
          Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
              console.log('access token + ' + result.getAccessToken().getJwtToken());
              navigate('/home', { state: { email: email } }); // Redirect to home with email state
          },
          onFailure: (err) => {
              alert(err.message || JSON.stringify(err));
          },
      });
  };

  return (
      <div className={classes["rightPanel"]}>
          <h2 className='text-3xl'>Welcome back!</h2>
          <p>Welcome to the new coding era!</p>
          <form onSubmit={handleSignIn}>
              <div className={classes["inputGroup"]}>
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={classes["inputGroup"]}>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className={classes["forgotPassword"]}>Forgot Password?</div>
              <button type="submit">Sign In</button>
              <div className={classes["signUp"]}>
              Don't have an account? <a href="/signup">Sign Up</a>
              </div>
          </form>
      </div>
  );
};



export default SignIn;
