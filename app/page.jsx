"use client"

import { Courgette } from "next/font/google";
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

// const Courgette = Courgette();

const courgette = Courgette({ subsets: ["latin"], weight: '400' })

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
    <main className="snap-y snap-mandatory flex flex-col justify-center items-center" style={{ scrollSnapType: 'y mandatory' }}>
      <div className="snap-always snap-start banner flex flex-col justify-center items-center w-9/12 space-y-5  p-24">
        <div className="logo flex justify-center items-center">
          <img src="/convospace-logo.png" alt="LOGO" />
          <div className={cn("logo-text", courgette.className)}>
            <h1 className="text-6xl" style={{ color: "#d84146" }}>CONVOSPACE</h1>
            <h3 className="text-xl" style={{ color: "#b92a2e" }}>EVENTS REIMAGINED, CONECTIONS AMPLIFIED.</h3>
          </div>
        </div>

        <div className="content flex flex-col justify-center items-center text-center space-y-5">
          <p>A Powerful platform designed for seamless virtual event networking.</p>
          <p>Whether you’re organizing conferences, trade shows, or job fairs, Convospace empowers attendees, speakers, and organizers to connect, collaborate, and build meaningful relationships.</p>
        </div>

        <div className="buttons flex justify-center items-center">
          <a href="#card-create"><button className="text-2xl" variant="secondary">GET STARTED</button></a>
        </div>
      </div>

      <div id='card-create' className="snap-always snap-start flex flex-col md:flex-row space-x-40 justify-center items-center  py-32 pt-44">
        <div className="container md:flex space-x-44">
          <div className="side-post text-center">
            <div className="logo">
              <img src="/convospace-logo.png" alt="LOGO" />
            </div>
            <h2 className={cn("text-center text-5xl", courgette.className)}>Host a Table</h2>
          </div>

          <div id="login-container" className="courgette-regular w-full md:w-8/12 p-8 md:my-4 md:mt-4 md:mb-4 bg-white rounded-md">
            <h2 className='courgette-regular mb-4 pt-14 text-xl font-semibold'>Login to use Convospace</h2>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                id="username-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 mb-4 border rounded-md"
              />
              <input
                type="text"
                id="twitter-input"
                placeholder="Enter your Twitter Handle"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <Button onClick={handleLogin} className="w-full px-3 py-5 my-2 border rounded-md text-black text-xl/2 font-semibold">
              Login
            </Button>
          </div>
        </div>
      </div>

    </main>

  );
}

export default LoginPage;
