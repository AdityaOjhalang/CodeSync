import React from 'react';
import { FaDoorOpen } from "react-icons/fa";
import { useWebSocket } from '../../contexts/WebSocketContext';  // Assuming this context provides access to the WebSocket actions
import { useNavigate } from 'react-router-dom';  // Used for redirecting after leaving the room
import { useUser } from '../../contexts/UserContext';

function LeaveRoomButton({ roomId }) {
    const { socket } = useWebSocket();
    const navigate = useNavigate();  // For navigation after leaving the room
    const { userId, setUserId } = useUser();

    const handleLeaveRoom = () => {
        console.log('Handling Leave room')
      if (socket) {
        console.log("Disconnecting socket");
        socket.close();  // Close the WebSocket connection, which triggers the $disconnect event in the backend
        deleteRoom();
      }

    };

    const deleteRoom = async () => {
        console.log('roomID:', roomId.roomId)
        console.log('userID:', userId)
        const url = `https://z1jarncw45.execute-api.us-east-1.amazonaws.com/prod/leaveRoom`;
        const body = {
          'queryStringParameters': {
            'roomId': roomId.roomId,
            'userId': userId
          }
        };
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Execution result:', data);
            console.log('Room deleted, redirecting');
            navigate('/home'); 
          } else {
            const data = await response.json();
            console.log('Execution result:', data);
            console.log('Room not deleted');
            // Handle other statuses or successful check here
          }
  
        } catch (error) {
          console.error('Failed to check room:', error);
        }
      };

    return (
        <button onClick={handleLeaveRoom} className="bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-1">
            <FaDoorOpen /> Leave Room
        </button>
    );
}

export default LeaveRoomButton;
