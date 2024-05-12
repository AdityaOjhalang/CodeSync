import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const WebSocketContext = createContext(null);

export function useWebSocket() {
    return useContext(WebSocketContext);
}

export const WebSocketProvider = ({ children, roomId }) => {
    const [code, setCode] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        if (!roomId) {
            console.error("WebSocket connection failed: roomId is required");
            return;
        }

        const socket = new WebSocket(`wss://3laaw8k2df.execute-api.us-east-1.amazonaws.com/production/?roomId=${roomId}`);
        socket.onopen = () => console.log("WebSocket connected");
        socket.onclose = () => console.log("WebSocket disconnected");
        socket.onerror = error => console.error("WebSocket error:", error);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received data:", data);
            if (data.action === 'updateCode') {
                setCode(data.code); // Update the code state on receiving new code
            }
        };

        socketRef.current = socket;

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [roomId]);

    const send = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log(message)
            socketRef.current.send(JSON.stringify(message));
        }
    };

    return (
        <WebSocketContext.Provider value={{ send, socket: socketRef.current, code, setCode}}>
            {children}
        </WebSocketContext.Provider>
    );
};
