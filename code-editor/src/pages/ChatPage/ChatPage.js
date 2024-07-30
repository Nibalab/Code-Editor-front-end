import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatHistory from '../../components/ChatHistory/ChatHistory';
import UserSearch from '../../components/UserSearch/UserSearch';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import './ChatPage.css';

const ChatPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      fetchCurrentUser();
      fetchChatHistory();
    }, []);
  
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          withCredentials: true,
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
  
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chat/history', {
          withCredentials: true,
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
  
    const searchUsers = async (query) => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/search', {
          params: { query },
          withCredentials: true,
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };
  
    const selectUser = async (user) => {
      const existingChat = chats.find(chat => 
        (chat.user1 && chat.user1.id === user.id) || 
        (chat.user2 && chat.user2.id === user.id)
      );
  
      if (existingChat) {
        setSelectedChat(existingChat);
      } else if (currentUser) {
        try {
          const response = await axios.post('http://localhost:8000/api/chat/send', {
            receiver_id: user.id,
            message: 'Starting a new chat',
          }, {
            withCredentials: true,
          });
  
          const newChat = {
            id: response.data.chat_id,
            user1: { id: currentUser.id, name: currentUser.name },
            user2: user,
            messages: [response.data]
          };
  
          setChats([...chats, newChat]);
          setSelectedChat(newChat);
        } catch (error) {
          console.error('Error starting new chat:', error);
        }
      }
      setSearchResults([]);
    };
  
    return (
      <div className="chat-page">
        <div className="chat-sidebar">
          <UserSearch searchUsers={searchUsers} searchResults={searchResults} selectUser={selectUser} />
          <ChatHistory chats={chats} setSelectedChat={setSelectedChat} currentUser={currentUser} />
        </div>
        <div className="chat-main">
          {selectedChat ? (
            <ChatWindow selectedChat={selectedChat} currentUser={currentUser} />
          ) : (
            <p>Select a chat to start messaging</p>
          )}
        </div>
      </div>
    );
  };
  
  export default ChatPage;