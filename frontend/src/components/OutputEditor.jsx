import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useWebSocket } from '../contexts/WebSocketContext';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/mode/python/python';  // Even though it's plain text, import to keep uniformity

function OutputEditor() {
    const { output } = useWebSocket();

    return (
        <div className="h-full w-full flex flex-col">
            <div className="bg-[#FCF1D3] dark:bg-[#01313F] text-center text-[#616161] dark:text-[#CCCCCC] font-bold">
                Output
            </div>
            <CodeMirror
                value={output}
                options={{
                    mode: 'plain_text',
                    theme: 'solarized light',
                    lineNumbers: false,
                    readOnly: true,
                    viewportMargin: Infinity,
                }}
                onBeforeChange={(editor, data, value) => {}}
            />
        </div>
    );
}

export default OutputEditor;
