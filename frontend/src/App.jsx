// import React from "react";

// import { NavBar, CodeEditor, OutputEditor, InputEditor } from "./components";
// import { LanguageContextProvider } from "./contexts";

// function App() {
//   return (
//     // routers goes here
//   );
// }

// export default App;


////////

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { UserProvider } from './userContext'; // Import UserProvider
// import Home from './components/Home';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import Profile from './components/profile';
// import Feed from './components/Feed';
import CodeDashboard from "./pages/CodeDashboard";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route exact path="/" element={<CodeDashboard />} />
        {/* <Route path="/signin" element={<SignIn />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} /> */}
      </Routes>
      
    </Router>
  );
}

export default App;