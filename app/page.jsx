"use client"

import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter(); 

  const handleLogin = async () => {
    try {
      if (username.trim() !== '') {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ username: username.trim() }),
        });
        
        console.log(response)

        if (response.ok) {
          const data = await response.json();
          alert(`Login successful! Welcome, ${username.trim()}!`);
          sessionStorage.setItem('username', username.trim());
          router.push('/chat'); 
        } else {
          const { message } = await response.json();
          alert(message);
          console.log('Error: ', message);
        }
      } else {
        alert('Please enter a valid username.');
      }
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  return (
    <div id="login-container">
      <h2>Login to use Convospace</h2>
      <input
        type="text"
        id="username-input"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button id="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
