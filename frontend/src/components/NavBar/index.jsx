// import ThemeButton from "./ThemeButton";
// import LanguageDropdown from "./LanguageDropdown";
// import SettingsButton from "./SettingsButton";
import FormatButton from "./FormatButton";
import RunButton from "./RunButton";
import CloseButton from "./CloseButton"

function NavBar( roomId ) {
  return (
    <div className="w-full h-28 bg-[#FCF1D3] dark:bg-[#01313F] flex items-center px-3 justify-between">
      <div className="flex gap-4">
        {/* <LanguageDropdown /> */}
        <input
          spellCheck={false}
          type="text"
          id="flags"
          className="rounded-lg h-10 border-[#717171] focus:border-[#717171] dark:border-[#93A1A1] dark:focus:border-[#93A1A1] bg-[#FDF6E3] dark:bg-[#012B36] text-[#717171] dark:text-[#93A1A1] focus:ring-transparent"
          placeholder="Compiler Flags"
        ></input>
        <input
          type="text"
          spellCheck={false}
          id="arguments"
          className="w-72 rounded-lg h-10 border-[#717171] focus:border-[#717171] dark:border-[#93A1A1] dark:focus:border-[#93A1A1] bg-[#FDF6E3] dark:bg-[#012B36] text-[#717171] dark:text-[#93A1A1] focus:ring-transparent"
          placeholder="Command Line Arguments"
        ></input>
        <RunButton roomId={roomId}/>
        <CloseButton />
      </div>
      <div className="flex gap-3 items-center">
        {/* <ThemeButton /> */}
        <FormatButton />
        {/* <SettingsButton /> */}
      </div>
    </div>
  );
}

export default NavBar;
