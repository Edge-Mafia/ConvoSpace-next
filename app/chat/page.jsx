"use client"

import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import io from 'socket.io-client';

const ChatApp = () => {
  const [username, setUsername] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('username');
    }
    return null;
  });
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000', {
      transports: ['websocket'],
      autoConnect: false, 
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('connect_timeout', (timeout) => {
      console.error('Connection timeout:', timeout);
    });

    newSocket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Set up the event listener for incoming messages
    newSocket.on('chat message', (msg) => {
      if (!messages.some(existingMsg => existingMsg === `${msg.username}: ${msg.message}`)) {
        setMessages((prevMessages) => [...prevMessages, `${msg.username}: ${msg.message}`]);
      }
    });

    newSocket.on('video update', (updatedVideoUrl) => {
      const newVideoId = extractVideoIdFromUrl(updatedVideoUrl);
      setVideoId(newVideoId);
    });

    newSocket.connect();

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [username, messages, videoId, videoUrl]); 

  const sendMessage = () => {
    const message = messageInput.trim();
    if (message !== '') {
      const newMessage = `${username}: ${message}`;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('chat message', { username, message });

      setMessageInput('');

      const chatContainer = document.getElementById('chat-container');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };
  
  function extractVideoIdFromUrl(url) {
    // Regular expression to match various YouTube video URL formats
    const regex1 = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const regex2 = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const regex3 = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|live\/)([a-zA-Z0-9_-]{11}))/;

    const match = url.match(regex1) || url.match(regex2) || url.match(regex3);
  
    // If a match is found, return the video ID; otherwise, return null
    return match ? match[1] : null;
  }

  const setVideo = () => {
    if (videoUrl) {
      setVideoId(extractVideoIdFromUrl(videoUrl))
      socket.emit('video update', videoUrl);
      setVideoUrl('')
      console.log(videoId)
    }
  }

  return (
    <div>
      <div>
      <input 
      type="text"
      value={videoUrl}
      onChange={(e) => setVideoUrl(e.target.value)}
      placeholder='Enter the Youtube Video Link...'
    /> 
    <button id='send-button' onClick={setVideo}>Go</button>
      </div>
      {videoId && <YouTube videoId={videoId} />}
      <h1 style={{ margin: '1rem auto auto' }}>Convospace</h1>
      <div id="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button id="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatApp;
