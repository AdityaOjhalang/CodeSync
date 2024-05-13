// import * as ace from "ace-builds";
// import { useState } from "react";
// import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

// function ThemeButton() {
//   const [darkMode, setDarkMode] = useState(false);

//   const handleOnClick = () => {
//     !darkMode
//       ? document.documentElement.classList.add("dark")
//       : document.documentElement.classList.remove("dark");

//     const theme = !darkMode
//       ? "ace/theme/solarized_dark"
//       : "ace/theme/solarized_light";

//     ace.edit("code-editor").setTheme(theme);
//     ace.edit("out-editor").setTheme(theme);
//     ace.edit("inp-editor").setTheme(theme);

//     setDarkMode(!darkMode);
//   };

//   return (
//     <button onClick={handleOnClick} data-testid="theme-btn">
//       {darkMode ? (
//         <BsFillSunFill
//           className="text-2xl text-[#717171] dark:text-[#93A1A1]"
//           data-testid="sun-icon"
//         />
//       ) : (
//         <BsFillMoonFill
//           className="text-xl text-[#717171] dark:text-[#93A1A1]"
//           data-testid="moon-icon"
//         />
//       )}
//     </button>
//   );
// }

// export default ThemeButton;
