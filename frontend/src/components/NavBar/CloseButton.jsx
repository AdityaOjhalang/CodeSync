import React from 'react';
import { FaDoorOpen } from "react-icons/fa";
import { useWebSocket } from '../../contexts/WebSocketContext';  // Assuming this context provides access to the WebSocket actions
import { useNavigate } from 'react-router-dom';  // Used for redirecting after leaving the room

function LeaveRoomButton({ roomId }) {
    const { socket } = useWebSocket();
    const navigate = useNavigate();  // For navigation after leaving the room

    const handleLeaveRoom = () => {
        console.log('Handling Leave room')
      if (socket) {
        console.log("Disconnecting socket");
        socket.close();  // Close the WebSocket connection, which triggers the $disconnect event in the backend
        navigate('/home');  // Redirect to home or any other page
      }
    };

    return (
        <button onClick={handleLeaveRoom} className="bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-1">
            <FaDoorOpen /> Leave Room
        </button>
    );
}

export default LeaveRoomButton;
