import React from 'react';

function Modal({ isOpen, onClose, roomId, email }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Room Details</h2>
        <p>Room ID: {roomId}</p>
        <p>Email: {email}</p>
        <button onClick={() => {
          onClose(); // Optionally, navigate or do additional actions here
        }}>Join Room</button>
      </div>
    </div>
  );
}

export default Modal;
