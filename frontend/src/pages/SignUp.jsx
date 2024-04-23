import React, { useState} from 'react';
import userPool from '../config/CognitoConfig';
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
//     return (
//       <div className={classes["rightPanel"]}>
//         <h2 className='text-4xl'>Create your account</h2>
//         <p className='text-2xl'>It’s free and easy</p>
//         <form>
//           <div className={classes["inputGroup"]}>
//             <label htmlFor="fullname">Full name</label>
//             <input type="text" id="fullname" placeholder="Enter your name" />
//           </div>
//           <div className={classes["inputGroup"]}>
//             <label htmlFor="email">E-mail or phone number</label>
//             <input type="text" id="email" placeholder="Type your e-mail or phone number" />
//           </div>
//           <div className={classes["inputGroup"]}>
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" placeholder="Type your password" />
//             <p className={classes["passwordCriteria"]}>Must be 8 characters at least</p>
//           </div>
//           <div className={classes["terms"]}>
//             <input type="checkbox" id="terms" />
//             <label htmlFor="terms">By creating an account means you agree to the Terms and Conditions, and our Privacy Policy</label>
//           </div>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     );
// };


// const RightPanel = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [agreedToTerms, setAgreedToTerms] = useState(false); // State to manage checkbox

//     const handleSignUp = (event) => {
//         event.preventDefault();
//         if (!agreedToTerms) {
//             alert("Please agree to the terms and conditions.");
//             return; // Make sure user agrees to terms
//         }

//         userPool.signUp(email, password, [
//             { Name: 'name', Value: fullName }, // Ensure these attribute names are correct
//             { Name: 'email', Value: email } // Custom attributes should match those configured in Cognito
//         ], null, (err, result) => {
//             if (err) {
//                 alert(err.message); // Providing feedback directly to the user
//                 console.error(err);
//                 return;
//             }
//             alert(`User ${result.user.getUsername()} has been created. Please check your email to confirm the registration.`);
//             console.log(`User ${result.user.getUsername()} has been created.`);
//             // Implement redirection or further user feedback here
//         });
//     };

//     return (
//         <div className={classes["rightPanel"]}>
//             <h2 className='text-4xl'>Create your account</h2>
//             <p className='text-2xl'>It’s free and easy</p>
//             <form onSubmit={handleSignUp}>
//                 <div className={classes["inputGroup"]}>
//                     <label htmlFor="fullname">Full name</label>
//                     <input type="text" id="fullname" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
//                 </div>
//                 <div className={classes["inputGroup"]}>
//                     <label htmlFor="email">E-mail</label>
//                     <input type="email" id="email" placeholder="Type your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className={classes["inputGroup"]}>
//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     <p className={classes["passwordCriteria"]}>Must be 8 characters at least</p>
//                 </div>
//                 <div className={classes["terms"]}>
//                     <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
//                     <label htmlFor="terms">By creating an account, you agree to the Terms and Conditions, and our Privacy Policy</label>
//                 </div>
//                 <button type="submit">Sign Up</button>
//             </form>
//         </div>
//     );
// };

const RightPanel = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [username, setUsername] = useState(''); // State for the username
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();
        if (!agreedToTerms) {
            alert("Please agree to the terms and conditions.");
            return; // Make sure user agrees to terms
        }

        userPool.signUp(email, password, [  // Use username for the Cognito username
            // { Name: 'name', Value: fullName },
            { Name: 'email', Value: email },
            // { Name: 'username', Value: username } // Assuming 'custom:username' is your custom attribute in Cognito
        ], null, (err, result) => {
            console.log(email);
            console.log(password);
            if (err) {
                alert(err.message); // Providing feedback directly to the user
                console.error(err);
                return;
            }

            alert(`User has been created. Please check your email to confirm the registration.`);
            // console.log(`User ${result.user.getUsername()} has been created.`);
        });
    };

    return (
        <div className={classes["rightPanel"]}>
            <h2 className='text-4xl'>Create your account</h2>
            <p className='text-2xl'>It’s free and easy</p>
            <form onSubmit={handleSignUp}>
                {/* <div className={classes["inputGroup"]}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div> */}
                <div className={classes["inputGroup"]}>
                    <label htmlFor="fullname">Full name</label>
                    <input type="text" id="fullname" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className={classes["inputGroup"]}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="Type your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={classes["inputGroup"]}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className={classes["passwordCriteria"]}>Must be 8 characters at least</p>
                </div>
                <div className={classes["terms"]}>
                    <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                    <label htmlFor="terms">By creating an account, you agree to the Terms and Conditions, and our Privacy Policy</label>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};



export default App;
