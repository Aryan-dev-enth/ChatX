"use client";
import React, { useEffect, useRef, useState } from "react";
import { EyeIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ChatState } from "@/context/ChatProvider";
import { io } from "socket.io-client";
import { Dot } from "lucide-react";
import ChatSkeleton from "./ChatSkeleton";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
var socket, selectedChatCompare;

const DirectMessageChat = ({ selectedChat }) => {
  const { user } = ChatState();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setsocketConnected] = useState(false);
  const [isTyping, setisTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const endOfMessagesRef = useRef(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", user.user);

    socket.on("connected", () => {
      setsocketConnected(true);
    });

    socket.on('typing', ()=>{
      setisTyping(true);

    });
    socket.on('stop typing', ()=>{
      setisTyping(false);

    });
  }, []);

  const fetchMessages = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/message/${selectedChat._id}`,
        config
      );
      if (result.data.status === "success") {
        setMessages(result.data.data);
        toast({
          title: "Data retrieved",
          description: result.data.message,
          type: "success",
        });

        socket.emit("join chat", selectedChat._id);
      } else {
        toast({
          title: "Data Error",
          description: result.data.message,
          type: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Data Error",
        description: error.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  useEffect(() => {
    // Scroll to bottom when messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/message`,
        {
          chatId: selectedChat._id,
          content: newMessage,
        },
        config
      );

      if (result.data.status === "success") {
        setMessages((prevMessages) => [...prevMessages, result.data.data]);
        setNewMessage("");
        socket.emit('stop typing', selectedChat._id);
       

        socket.emit("new message", result.data.data);
        setTyping(false)
      } else {
        toast({
          title: "Send Error",
          description: result.data.message,
          type: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Send Error",
        description: error.message,
        type: "error",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (like form submission)
      handleSend();
    }
  };
  if (!user) {
    return <></>;
  }
  if(loading){
    return <div className="pt-32">
      <ChatSkeleton/>
    </div>;
  }

  return (
    <>
      <div className="flex items-center justify-between border-b pb-2 mb-4 px-4">
        <h2 className="text-xl font-semibold capitalize">
          {selectedChat.chatName}
          {isTyping?(
          <p className="text-xs ">Typing...</p>
        ):(
          <></>
        )}
        </h2>
       
        <EyeIcon />
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto space-y-4 px-4 py-2">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender._id === user.user._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.sender._id === user.user._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {/* This div will help in auto-scrolling */}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 px-4">
        
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          onChange={(e) =>{
            setNewMessage(e.target.value);
            if(!socketConnected){
              return;

            }
            if(!typing){
              setTyping(true);
              socket.emit('typing', selectedChat._id);
            }
            let lastTypingTime = new Date().getTime();
            var timerLength = 1500;
            setTimeout(()=>{
              var timeNow = new Date().getTime();
              var timeDifference = timeNow - lastTypingTime;
              if(timeDifference>=timerLength && typing){
                socket.emit('stop typing', selectedChat._id)
                setTyping(false)
              }
            }, timerLength);
          }}
          onKeyDown={handleKeyDown}
        />
        <Button size="sm" onClick={handleSend}>
          <Send />
        </Button>
      </div>
    </>
  );
};

export default DirectMessageChat;
