import AceEditor from "react-ace";

function InputEditor() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="bg-[#FCF1D3] dark:bg-[#01313F] text-center text-[#616161] dark:text-[#CCCCCC] font-bold">
        Input
      </div>
      <AceEditor
        mode="plain_text"
        theme="solarized_light"
        name="inp-editor"
        value=""
        fontSize={14}
        width="100%"
        height="100%"
        highlightActiveLine={false}
        showGutter={false}
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

export default InputEditor;
