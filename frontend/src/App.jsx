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
import SignIn from './pages/SignIn';
import CodeDashboard from "./pages/CodeDashboard";
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      
      <Routes>
        <Route exact path="/" element={<SignIn />} /> 
        <Route path="/code/:roomid" element={<CodeDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
      
    </Router>
  );
}

export default App;