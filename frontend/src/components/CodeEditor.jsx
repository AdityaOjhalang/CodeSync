import React, { useEffect, useState, useRef } from 'react';
import AceEditor from "react-ace";

function CodeEditor({ roomId }) {
  const [code, setCode] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket(`wss://3laaw8k2df.execute-api.us-east-1.amazonaws.com/production/?roomId=${roomId}`);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      const { action, code } = JSON.parse(event.data);
      if (action === 'updateCode') {
        setCode(code);
      }
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    console.log(newCode)
    // Send the new code state over the WebSocket
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("sending request")
      socketRef.current.send(JSON.stringify({ action: 'updateCode',  roomId: roomId, code: newCode }));
    }
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
