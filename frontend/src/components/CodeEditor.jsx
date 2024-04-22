import { useContext } from "react";
import AceEditor from "react-ace";
import { LanguageContext } from "../contexts";

function CodeEditor() {
  const { language } = useContext(LanguageContext);
  
  return (
    <div className="h-full w-full">
      <AceEditor
        mode="python"
        theme="solarized_light"
        name="code-editor"
        value={language["python"]}
        fontSize={14}
        width="100%"
        height="100%"
        highlightActiveLine={false}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: false }}
        setOptions={{
          useWorker: false,
          fontFamily: "SourceCodePro",
        }}
      />
    </div>
  );
}

export default CodeEditor;
