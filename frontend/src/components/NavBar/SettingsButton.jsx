// import { useState, Fragment } from "react";
// import { BiCog } from "react-icons/bi";
// import SettingsModal from "./SettingsModal";

// function SettingsButton() {
//   const [modalProps, setModalProps] = useState({
//     visible: false,
//     fontFamily: "SourceCodePro",
//     fontSize: 14,
//   });

//   return (
//     <Fragment>
//       <button
//         onClick={() => setModalProps({ ...modalProps, visible: true })}
//         data-testid="cog-icon"
//       >
//         <BiCog
//           className="text-2xl text-[#717171] dark:text-[#93A1A1] font-bold"
//           data-testid="settings-btn"
//         />
//       </button>
//       {modalProps.visible && (
//         <SettingsModal setModalProps={setModalProps} {...modalProps} />
//       )}
//     </Fragment>
//   );
// }

// export default SettingsButton;
