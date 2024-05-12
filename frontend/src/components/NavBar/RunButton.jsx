// RunButton.jsx
import React from 'react';
import { FaPlay } from "react-icons/fa";
import { useWebSocket } from '../../contexts/WebSocketContext';  // Assuming this context provides access to the code

function RunButton({ roomId }) {
    const { code,  send } = useWebSocket(); // Get the current code from your WebSocket context

    const handleRunCode = async () => {
      console.log(code)
      console.log(roomId)
      const url = `https://3blezbrfvh.execute-api.us-east-1.amazonaws.com/test/submit`; // Modify URL as necessary
      const body = {
          'queryStringParameters': {
              'code': code, 
              'roomId': roomId.roomId  // Ensure that roomId is correctly extracted
          }
      };

      const body2 = {
        'queryStringParameters': {
            'roomId': roomId.roomId  // Ensure that roomId is correctly extracted
        }
    };

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': 'hbXYJh8cSoRgNNpzCmBtraSBccfFNw4aWB6N3Hi0'  // Consider managing API keys securely
              },
              body: JSON.stringify(body)
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log('Execution result:', data);
              
              // Call the second API based on the success of the first one
              const secondUrl = 'https://3blezbrfvh.execute-api.us-east-1.amazonaws.com/test/fetchOutput';  // Replace with your actual second API URL
              const secondResponse = await fetch(secondUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'x-api-key': 'hbXYJh8cSoRgNNpzCmBtraSBccfFNw4aWB6N3Hi0'
                  },
                  body: JSON.stringify(body2)
              });
              
              if (secondResponse.ok) {
                  const secondData = await secondResponse.json();
                  console.log('Second API result:', secondData.output);
                  send({ action: 'sendOutput', roomId: roomId.roomId, output: secondData.output });
              } else {
                  console.error('Failed to fetch from second API');
              }
          } else {
              console.error('First API call failed:', await response.text());
          }
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
