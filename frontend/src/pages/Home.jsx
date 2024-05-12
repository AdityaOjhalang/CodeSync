

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';
// import toast from 'react-hot-toast';
// import classes from './Home.module.css';
// import Logo from "./logo-2.png";
// import userPool from '../config/CognitoConfig';
// import Modal from '../pages/Modal'; // Ensure this is the correct path
// import jwt_decode from 'jwt_decode';

// function App() {
//   const [roomId, setRoomId] = useState("");
//   const [email, setEmail] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const fetchUserEmail = () => {
//     const currentUser = userPool.getCurrentUser();
//     if (currentUser) {
//       currentUser.getSession((err, session) => {
//         if (err) {
//           toast.error("Could not fetch user session.");
//           console.error(err);
//           return;
//         }
//         if (session.isValid()) {
//           currentUser.getUserAttributes((err, attributes) => {
//             if (err) {
//               toast.error("Could not fetch user attributes.");
//               console.error(err);
//               return;
//             }
//             const emailAttribute = attributes.find(attr => attr.Name === 'email');
//             if (emailAttribute) {
//               setEmail(emailAttribute.Value);
//             }
//           });
//         }
//       });
//     } else {
//       toast.error("User not logged in.");
//     }
//   };

//   const createRoom = () => {
//     const newRoomId = uuid();
//     setRoomId(newRoomId);
//     fetchUserEmail(); // Fetch the email when creating a room
//     setShowModal(true);
//     toast.success("Room ID is generated: " + newRoomId);
//   };

//   const joinRoom = () => {
//     if (!roomId) {
//       toast.error("No Room ID available. Please create one first.");
//       return;
//     }
//     navigate(`/room/${roomId}`);
//     toast.success("Joining room: " + roomId);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className={classes["App"]}>
//       <header className={classes["App-header"]}>
//         <nav>
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/practice">Practice</a></li>
//             <li><a href="/blog">Blog</a></li>
//             <li><a href="/about">About Us</a></li>
//             <li><a href="/contact">Contact</a></li>
//           </ul>
//         </nav>
//       </header>
//       <main className={classes["App-main"]}>
//         <section className={classes["Hero"]}>
//           <figure>
//             <img alt="Logo" src={Logo}/>
//           </figure>
//           <h1>CODESYNC</h1>
//           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//           <button className={classes["JoinButton"]} onClick={createRoom}>Create Room</button>
//           <Modal isOpen={showModal} onClose={closeModal} roomId={roomId} email={email} />
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;

//v2//////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';
// import toast from 'react-hot-toast';
// import classes from './Home.module.css';
// import Logo from "./logo-2.png";
// import userPool from '../config/CognitoConfig';
// import Modal from '../pages/Modal';
// // Assuming jwt-decode exports its function directly


// function App() {
//   const [roomId, setRoomId] = useState("");
//   const [email, setEmail] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const fetchUserEmail = () => {
//     const currentUser = userPool.getCurrentUser();
//     if (currentUser) {
//       currentUser.getSession(async (err, session) => {
//         if (err) {
//           toast.error("Could not fetch user session.");
//           console.error(err);
//           return;
//         }
//         if (session.isValid()) {
//           const userId = await getUserIDFromAccessToken(session.getIdToken().getJwtToken());
//           console.log('User ID:', userId); // Log the user ID to console

//           currentUser.getUserAttributes((err, attributes) => {
//             if (err) {
//               toast.error("Could not fetch user attributes.");
//               console.error(err);
//               return;
//             }
//             const emailAttribute = attributes.find(attr => attr.Name === 'email');
//             if (emailAttribute) {
//               setEmail(emailAttribute.Value);
//             }
//           });
//         }
//       });
//     } else {
//       toast.error("User not logged in.");
//     }
//   };

//   const createRoom = async () => {
//     const newRoomId = uuid();
//     setRoomId(newRoomId);
//     fetchUserEmail(); // Fetch the email when creating a room
//     setShowModal(true);

//     const url = `https://bulwpdvyfd.execute-api.us-east-1.amazonaws.com/dev/createRoom`; // Modify URL as necessary
//     const body = { 'queryStringParameters': {
//           'userId': userId, 'roomId': newRoomId }
//         };

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': 'MGWj5JUyOF8pp0dQudCeH35gLHxAgREi8UOyHGee'
//         },
//         body: JSON.stringify(body)
//       });
//       const data = await response.json();
//       console.log('Execution result:', data);
//     } catch (error) {
//       console.error('Failed to run code:', error);
//     }
//     toast.success("Room ID is generated: " + newRoomId);
//   };
  

//   const joinRoom = () => {
//     if (!roomId) {
//       toast.error("No Room ID available. Please create one first.");
//       return;
//     }
//     navigate(`/room/${roomId}`);
//     toast.success("Joining room: " + roomId);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };



//   function getUserIDFromAccessToken(accessToken) {
//     try {
//       const base64Url = accessToken.split('.')[1]; // Get the payload part of the token
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64Url to Base64
//       const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//       }).join(''));
  
//       const { sub } = JSON.parse(jsonPayload); // Decode the payload as JSON and extract the user ID
//       return sub;
//     } catch (error) {
//       console.error('Failed to decode access token:', error);
//       return null;
//     }
//   };

//   return (
//     <div className={classes["App"]}>
//       <header className={classes["App-header"]}>
//         <nav>
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/practice">Practice</a></li>
//             <li><a href="/blog">Blog</a></li>
//             <li><a href="/about">About Us</a></li>
//             <li><a href="/contact">Contact</a></li>
//           </ul>
//         </nav>
//       </header>
//       <main className={classes["App-main"]}>
//         <section className={classes["Hero"]}>
//           <figure>
//             <img alt="Logo" src={Logo}/>
//           </figure>
//           <h1>CODESYNC</h1>
//           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//           <button className={classes["JoinButton"]} onClick={createRoom}>Create Room</button>
//           <Modal isOpen={showModal} onClose={closeModal} roomId={roomId} email={email} />
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import classes from './Home.module.css';
import Logo from "./logo-2.png";
import userPool from '../config/CognitoConfig';
import Modal from '../pages/Modal';

function App() {
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");  // State for storing user ID
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchUserEmail = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession(async (err, session) => {
        if (err) {
          toast.error("Could not fetch user session.");
          console.error(err);
          return;
        }
        if (session.isValid()) {
          const fetchedUserId = await getUserIDFromAccessToken(session.getIdToken().getJwtToken());
          console.log('User ID:', fetchedUserId); // Log the user ID to console
          setUserId(fetchedUserId); // Update the userId state

          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              toast.error("Could not fetch user attributes.");
              console.error(err);
              return;
            }
            const emailAttribute = attributes.find(attr => attr.Name === 'email');
            if (emailAttribute) {
              setEmail(emailAttribute.Value);
            }
          });
        }
      });
    } else {
      toast.error("User not logged in.");
    }
  };

  const createRoom = async () => {
    const newRoomId = uuid();
    setRoomId(newRoomId);
    fetchUserEmail(); // Fetch the email and user ID when creating a room
    setShowModal(true);

    const url = `https://3blezbrfvh.execute-api.us-east-1.amazonaws.com/test/createRoom`; // Modify URL as necessary
    const body = {
      'queryStringParameters': {
        'userId': userId, 'roomId': newRoomId
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Headers' : '*',
          // 'Access-Control-Allow-Methods': '*',
          // 'Access-Control-Allow-Origin': '*',
          'x-api-key': 'hbXYJh8cSoRgNNpzCmBtraSBccfFNw4aWB6N3Hi0'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      console.log('Execution result:', data);
    } catch (error) {
      console.error('Failed to run code:', error);
    }
    toast.success("Room ID is generated: " + newRoomId);
  };

  const joinRoom = () => {
    if (!roomId) {
      toast.error("No Room ID available. Please create one first.");
      return;
    }
    navigate(`/code/${roomId}`);
    toast.success("Joining room: " + roomId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function getUserIDFromAccessToken(accessToken) {
    try {
      const base64Url = accessToken.split('.')[1]; // Get the payload part of the token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64Url to Base64
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      const { sub } = JSON.parse(jsonPayload); // Decode the payload as JSON and extract the user ID
      return sub;
    } catch (error) {
      console.error('Failed to decode access token:', error);
      return null;
    }
  };

  return (
    <div className={classes["App"]}>
      <header className={classes["App-header"]}>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/practice">Practice</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className={classes["App-main"]}>
        <section className={classes["Hero"]}>
          <figure>
            <img alt="Logo" src={Logo}/>
          </figure>
          <h1>CODESYNC</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <button className={classes["JoinButton"]} onClick={createRoom}>Create Room</button>
          <button className={classes["JoinButton"]} onClick={joinRoom}>Join Room</button>
          <Modal isOpen={showModal} onClose={closeModal} roomId={roomId} email={email} />
        </section>
      </main>
    </div>
  );
}

export default App;






