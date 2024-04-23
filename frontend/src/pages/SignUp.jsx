import React from 'react';
import classes from './SignIn.module.css'
import Logo from "./logo-2.png";

const App = () => {
  return (
    <div className={classes["container"]}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};
{/* <div className={classes["leftPanel"]}></div> */}
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

// const RightPanel = () => {
//   return (
//     <div className={classes["rightPanel"]}>
//       <h2 className='text-3xl'>Welcome back!</h2>
//       <p>Welcome to the new coding era!</p>
//       <form>
//         <div className={classes["inputGroup"]}>
//           <label htmlFor="email">E-mail or phone number</label>
//           <input type="text" id="email" />
//         </div>
//         <div className={classes["inputGroup"]}>
//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" />
//         </div>
//         <div className={classes["forgotPassword"]}>Forgot Password?</div>
//         <button type="submit">Sign In</button>
//         <div className={classes["signUp"]}>
//           Don't have an account? <a href="/signup">Sign Up</a>
//         </div>
//       </form>
//     </div>
//   );
// };

const RightPanel = () => {
    return (
      <div className={classes["rightPanel"]}>
        <h2 className='text-4xl'>Create your account</h2>
        <p className='text-2xl'>It’s free and easy</p>
        <form>
          <div className={classes["inputGroup"]}>
            <label htmlFor="fullname">Full name</label>
            <input type="text" id="fullname" placeholder="Enter your name" />
          </div>
          <div className={classes["inputGroup"]}>
            <label htmlFor="email">E-mail or phone number</label>
            <input type="text" id="email" placeholder="Type your e-mail or phone number" />
          </div>
          <div className={classes["inputGroup"]}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Type your password" />
            <p className={classes["passwordCriteria"]}>Must be 8 characters at least</p>
          </div>
          <div className={classes["terms"]}>
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">By creating an account means you agree to the Terms and Conditions, and our Privacy Policy</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };

export default App;
