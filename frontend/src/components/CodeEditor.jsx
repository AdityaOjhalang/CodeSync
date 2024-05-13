import React, { useEffect } from 'react';
import { Controlled as  ControlledEditor } from 'react-codemirror2';
import { useWebSocket } from '../contexts/WebSocketContext';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/mode/python/python';

function CodeEditor({ roomId }) {
    const { code, setCode, send, socket } = useWebSocket();

    useEffect(() => {
        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.action === 'updateCode') {
                setCode(data.code);
            }
        };

        socket?.addEventListener('message', handleMessage);
        return () => {
            socket?.removeEventListener('message', handleMessage);
        };
    }, [socket]);

    const handleCodeChange = (editor, data, value) => {
        setCode(value);
        send({ action: 'updateCode', roomId: roomId, code: value });
    };

    return (
        <div className="h-full w-full">
            <ControlledEditor
                value={code}
                options={{
                    mode: 'python',
                    theme: 'solarized light',
                    lineNumbers: true,
                    readOnly: false,
                    scroll: false
                }}
                onBeforeChange={handleCodeChange}
            />
        </div>
    );
}

export default CodeEditor;
