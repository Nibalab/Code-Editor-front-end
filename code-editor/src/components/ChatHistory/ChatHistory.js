import React from 'react';
import './ChatHistory.css';

const ChatHistory = ({ chats, setSelectedChat, currentUser }) => {
  if (!chats || chats.length === 0) {
    return <p>No chats available</p>;
  }

  return (
    <div className="chat-history">
      <h2>Chat History</h2>
      <ul>
        {chats.map((chat) => {
          if (!chat.user1 || !chat.user2) {
            return null; // Skip chats where user information is not available
          }

          const otherUser = chat.user1.id === currentUser.id ? chat.user2 : chat.user1;

          return (
            <li key={chat.id} onClick={() => setSelectedChat(chat)}>
              <span>{otherUser.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatHistory;
