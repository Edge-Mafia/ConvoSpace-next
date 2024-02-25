"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import io from "socket.io-client";

const ChatApp = () => {
  const [username, setUsername] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("username");
    }
    return null;
  });
  const [twitterHandle, setTwitterHandle] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("twitterHandle");
    }
    return null;
  });
  // console.log(twitterHandle);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [socket, setSocket] = useState(null);
  const videoRef = useRef(null);
  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      transports: ["websocket"],
      autoConnect: false,
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    newSocket.on("connect_timeout", (timeout) => {
      console.error("Connection timeout:", timeout);
    });

    newSocket.on("connect", () => {
      console.log("Connected to the server");
      // Set the username and twitterHandle when connecting to the server
      newSocket.emit("set_user_info", {
        username,
        twitterHandle,
      });
    });

    // Set up the event listener for incoming messages
    newSocket.on("chat message", (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: msg.username,
          twitterHandle: msg.twitterHandle,
          message: msg.message,
        },
      ]);
      console.log(msg.twitterHandle);
    });

    newSocket.on("video_pause", (currentTime) => {
      const internarlPlayer = videoRef.current.getInternalPlayer();
      internarlPlayer.seekTo(currentTime);
      internarlPlayer.pauseVideo();
    });
    newSocket.on("video_play", async (currentTime) => {
      const internarlPlayer = videoRef.current.getInternalPlayer();
      const playerState = await internarlPlayer.getPlayerState();
      const playerCurrentTime = await internarlPlayer.getCurrentTime();
      const timeDiff = Math.abs(currentTime - playerCurrentTime);
      console.log("Time Diff: ", timeDiff);
      if (timeDiff > 1 || (playerState !== 1 && currentTime == 0)) {
        internarlPlayer.seekTo(currentTime);
        internarlPlayer.playVideo();
      }
      console.log(`Video has beed played somewhere: `, internarlPlayer);
    });
    newSocket.on("video update", (updatedVideoUrl) => {
      const newVideoId = extractVideoIdFromUrl(updatedVideoUrl);
      setVideoId(newVideoId);
    });

    newSocket.connect();
    newSocket.emit("set_twitter_handle", twitterHandle);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [username, messages, videoId, videoUrl, twitterHandle]);

  const sendMessage = () => {
    const message = messageInput.trim();
    if (message !== "") {
      const newMessage = {
        username,
        twitterHandle,
        message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("chat message", { username, message, twitterHandle });

      setMessageInput("");

      const chatContainer = document.getElementById("chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  function extractVideoIdFromUrl(url) {
    // Regular expression to match various YouTube video URL formats
    const regex1 =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const regex2 =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const regex3 =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|live\/)([a-zA-Z0-9_-]{11}))/;

    const match = url.match(regex1) || url.match(regex2) || url.match(regex3);

    // If a match is found, return the video ID; otherwise, return null
    return match ? match[1] : null;
  }

  const setVideo = () => {
    if (videoUrl) {
      setVideoId(extractVideoIdFromUrl(videoUrl));
      socket.emit("video update", videoUrl);
      setVideoUrl("");
      console.log(videoId);
    }
  };

  const handlePlay = (event) => {
    const currentTime = Math.floor(event.target.getCurrentTime());
    console.log(`Played at ${currentTime}`);
    socket.emit("video_play", { currentTime });
  };

  const handlePause = (event) => {
    const currentTime = Math.floor(event.target.getCurrentTime());
    console.log(`Paused at ${currentTime}`);
    socket.emit("video_pause", { currentTime });
  };

  // console.log(messages);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior of Enter key (e.g., form submission)
      sendMessage();
    }
  };

  return (
    <div className="w-screen px-8">
      <div className="header flex justify-between relative">
        <div className="logo flex items-center">
          <img src="convospace-logo.png" alt="LOGO" className="w-1/6" style={{top: "5%", bottom: ""}} />
          <h1 className="text-3xl font-semibold">Convospace</h1>
        </div>

        <div className="flex mt-6">
          <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter the Youtube Video Link..."
          className="w-full p-2 rounded mt-1 mr-4"
          style={{ height: "2rem" }}
          onKeyPress={(e) => {
            e.preventDefault()
            setVideo()
          }}
          />
          <Button onClick={setVideo} className="text-black text-xl/2 font-semibold">
            Go
          </Button>
        </div>
      </div>
      {videoId && (
        <>
          <div className="chats w-full grid justify-items-center overflow-x-clip">
            <div className="video p-5 w-3/4 flex justify-center">
              <YouTube
                ref={videoRef}
                videoId={videoId}
                onPlay={handlePlay}
                onPause={handlePause}
                onStateChange={(e) => {
                  console.log(e);
                }}
                onReady={(e) => {
                  // console.log(e);
                  // e.target.playVideoAt(7);
                }}
              />
            </div>

            <div id="chat-container" className="flex flex-col items-center relative w-1/2 h-3/4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`w-full flex flex-row justify-start h-auto message ${msg.username === username ? 'text-white justify-end' : ''}`}>
                  <span className="username font-semibold"> 
                    <HoverCard>
                      <HoverCardTrigger>{msg.username}</HoverCardTrigger>
                      <HoverCardContent className="w-50">
                        <div className="flex justify-between space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={`https://static.toiimg.com/thumb/msid-102075304,width-1280,height-720,resizemode-4/102075304.jpg`}
                            />
                            <AvatarFallback>X</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              {" "}
                              <Link
                                href={`https://x.com/${msg.twitterHandle}`}
                                target="_blank"
                              >
                                @{msg.twitterHandle}
                              </Link>
                            </h4>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    :{" "}
                  </span>
                  <div className="msg w-1/4 h-auto break-words">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input w-full flex bottom-2 md:w-1/2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full p-2 rounded mr-2"
              />
              <Button onClick={sendMessage} className="text-black text-xl/2 font-semibold">
                Send
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatApp;
