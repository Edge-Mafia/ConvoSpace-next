"use client"

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const router = useRouter(); 
  const { toast } = useToast();

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
          toast({
            title: "Login Successful !",
            description: `Welcome ${username.trim()}`
          });
          // alert(`Login successful! Welcome, ${username.trim()}!`);
          sessionStorage.setItem('username', username.trim());
          sessionStorage.setItem('twitterHandle', twitterHandle.trim());
          router.push('/chat'); 
        } else {
          const { message } = await response.json();
          toast({
            variant: "destructive",
            title: "Try Again",
            description: message
          });
          console.log('Error: ', message);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Try Again",
          description: "Please enter a valid username."
        });
        // alert('Please enter a valid username.');
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
      <input
        type="text"
        id="username-input"
        placeholder="Enter your Twitter Handle"
        value={twitterHandle}
        onChange={(e) => setTwitterHandle(e.target.value)}
      />
      <button id="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
