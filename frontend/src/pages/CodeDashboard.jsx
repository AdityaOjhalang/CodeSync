import React from "react";

import { NavBar, CodeEditor, OutputEditor, InputEditor } from "../components";
import { LanguageContextProvider } from "../contexts";

function CodeDashboard() {
  return (
    <LanguageContextProvider>
      <div className="flex flex-col h-screen w-screen gap-3 bg-[#DDD6C1] dark:bg-[#00212B] px-3 py-3">
        <NavBar />
        <CodeEditor />
        <div className="h-full w-full flex gap-3">
          <InputEditor />
          <OutputEditor />
        </div>
      </div>
    </LanguageContextProvider>
  )
}

export default CodeDashboard