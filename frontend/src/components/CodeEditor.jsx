import React, { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import { useWebSocket } from '../contexts/WebSocketContext';

function CodeEditor({ roomId }) {
  const { code, setCode, send, socket } = useWebSocket();
    // const [code, setCode] = useState('');
    // const { send, socket } = useWebSocket();

    useEffect(() => {
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Handling message:", data);
        if (data.action === 'updateCode') {
            console.log("Updating code to:", data.code);
            setCode(data.code);
        }
    };

    if (socket) {
        socket.addEventListener('message', handleMessage);
    }

    return () => {
        if (socket) {
            socket.removeEventListener('message', handleMessage);
        }
    };
}, [socket]);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        send({ action: 'updateCode', roomId: roomId, code: newCode });
    };

    return (
      <div className="h-full w-full">
        <AceEditor
          mode="python"
          theme="solarized_light"
          name="code-editor"
          onChange={handleCodeChange}
          value={code}
          fontSize={14}
          width="100%"
          height="100%"
          highlightActiveLine={false}
          showPrintMargin={false}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false,
            fontFamily: "SourceCodePro",
          }}
        />
      </div>
    );
}

export default CodeEditor;
