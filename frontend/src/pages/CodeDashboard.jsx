import React from "react";

import { NavBar, CodeEditor, OutputEditor, InputEditor } from "../components";
import { LanguageContextProvider} from "../contexts";
import { useParams } from "react-router-dom";
import { WebSocketProvider } from '../contexts/WebSocketContext';

function CodeDashboard() {
  const { roomId } = useParams();

  console.log("Current roomId:", roomId);
  return (
    <WebSocketProvider roomId={roomId}>
      <LanguageContextProvider>
        <div className="flex flex-col h-screen w-screen gap-3 bg-[#DDD6C1] dark:bg-[#00212B] px-3 py-3">
          <NavBar roomId={roomId}/>
          <CodeEditor roomId={roomId} />
          <div className="h-full w-full flex gap-3">
            <InputEditor />
            <OutputEditor />
          </div>
        </div>
      </LanguageContextProvider>
    </WebSocketProvider>
  );
}

export default CodeDashboard