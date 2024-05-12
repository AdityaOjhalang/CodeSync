// RunButton.jsx
import React from 'react';
import { FaPlay } from "react-icons/fa";
import { useWebSocket } from '../../contexts/WebSocketContext';  // Assuming this context provides access to the code

function RunButton({ roomId }) {
    const { code } = useWebSocket(); // Get the current code from your WebSocket context

    const handleRunCode = async () => {
      console.log(code)
      console.log(roomId)
        const url = `https://bulwpdvyfd.execute-api.us-east-1.amazonaws.com/dev/submit?roomId=${roomId}`; // Modify URL as necessary
        const body = { 'queryStringParameters': {
          'code': code, 'roomId': roomId.roomId }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'MGWj5JUyOF8pp0dQudCeH35gLHxAgREi8UOyHGee'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log('Execution result:', data);
        } catch (error) {
            console.error('Failed to run code:', error);
        }
    };

    return (
        <button onClick={handleRunCode} className="bg-orange-400 hover:bg-orange-600 dark:bg-green-400 dark:hover:bg-green-600 text-white font-bold py-2 px-2 rounded-lg flex items-center gap-1">
            <FaPlay /> Run
        </button>
    );
}

export default RunButton;
