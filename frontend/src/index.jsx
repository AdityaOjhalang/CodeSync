import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "./fonts/FiraMono/FiraCode.otf";
import "./fonts/GoMono/GoMono.ttf";
import "./fonts/JetBrainsMono/JetBrainsMono.ttf";
import "./fonts/RobotoMono/Roboto.ttf";
import "./fonts/SourceCodePro/SourceCodePro.ttf";
import "./fonts/UbuntuMono/UbuntuMono.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
