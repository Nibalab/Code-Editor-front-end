import React, { useState } from 'react';
import axios from 'axios';
import './ChatWindow.css';

const ChatWindow = ({ selectedChat, currentUser }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/chat/send', {
        receiver_id: selectedChat.user2.id === currentUser.id ? selectedChat.user1.id : selectedChat.user2.id,
        message: newMessage,
      }, {
        withCredentials: true,
      });

      selectedChat.messages.push(response.data);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!selectedChat || !selectedChat.user1 || !selectedChat.user2) {
    return <div className="chat-window">No chat selected</div>;
  }

  return (
    <div className="chat-window">
      <h2>Chat with {selectedChat.user1.id === currentUser.id ? selectedChat.user2.name : selectedChat.user1.name}</h2>
      <div className="chat-messages">
        {selectedChat.messages.map((message) => (
          <div key={message.id} className={message.sender_id === currentUser.id ? 'message sender' : 'message receiver'}>
            {message.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
