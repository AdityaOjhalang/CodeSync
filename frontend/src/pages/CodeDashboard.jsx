import React, { useEffect } from 'react';

import { NavBar, CodeEditor, OutputEditor } from "../components";
import { LanguageContextProvider} from "../contexts";
import { useParams } from "react-router-dom";
import { WebSocketProvider } from '../contexts/WebSocketContext';
import userPool from '../config/CognitoConfig';
import { useNavigate } from 'react-router-dom';


function CodeDashboard() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    console.log(currentUser)
    if (!currentUser) {
      navigate('/')
    }

    const checkRoom = async () => {
      const url = `https://8merbrjype.execute-api.us-east-1.amazonaws.com/dev/check-room`;
      const body = {
        'queryStringParameters': {
          'roomId': roomId
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

        const data = await response.json();
        console.log('Execution result:', data);

        if (data.statusCode === 404) {
          console.log('Room not found, redirecting');
          navigate('/home');
          // toast.success("Joining room: " + roomId);
        } else {
          console.log('Room exists');
          // Handle other statuses or successful check here
        }

      } catch (error) {
        console.error('Failed to check room:', error);
      }
    };

    checkRoom();
  }, [navigate, roomId]); 

  console.log("Current roomId:", roomId);
  return (
    <WebSocketProvider roomId={roomId}>
      <LanguageContextProvider>
        <div className="flex flex-col h-screen w-screen gap-3 bg-[#DDD6C1] dark:bg-[#00212B] px-3 py-3">
          <NavBar roomId={roomId}/>
          <CodeEditor roomId={roomId} />
          <div className="h-full w-full flex gap-3">
            {/* <InputEditor /> */}
            <OutputEditor />
          </div>
        </div>
      </LanguageContextProvider>
    </WebSocketProvider>
  );
}

export default CodeDashboard