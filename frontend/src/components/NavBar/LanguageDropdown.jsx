import * as ace from "ace-builds";
import { useContext } from "react";
import { LanguageContext } from "../../contexts";

function LanguageDropdown() {
  const { language } = useContext(LanguageContext);

  const convertLangToMode = (lang) => {
    if (lang === "c" || lang === "cpp") {
      return "c_cpp";
    } else if (lang === "go") {
      return "golang";
    } else {
      return lang;
    }
  };

  return (
    <select
      id="languages"
      data-testid="languages"
      defaultValue="python"
      onChange={(e) => {
        const editor = ace.edit("code-editor");
        editor
          .getSession()
          .setMode(`ace/mode/${convertLangToMode(e.target.value)}`);
        editor.setValue(language[convertLangToMode(e.target.value)], 1);
      }}
      className="rounded-lg h-10 border-[#717171] focus:border-[#717171] dark:border-[#93A1A1] dark:focus:border-[#93A1A1] bg-[#FDF6E3] dark:bg-[#012B36] text-[#717171] dark:text-[#93A1A1] focus:ring-transparent"
    >
      <option value={"javascript"}>Javascript</option>
      <option value={"java"}>Java</option>
      <option value={"c"}>C</option>
      <option value={"cpp"}>C++</option>
      <option value={"python"}>Python</option>
      <option value={"dart"}>Dart</option>
      <option value={"go"}>Go</option>
    </select>
  );
}

export default LanguageDropdown;
