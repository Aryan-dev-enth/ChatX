"use client";
import React from "react";
import { ChatState } from "@/context/ChatProvider";
import DirectMessageChat from "./DirectMessageChat";
import GroupChat from "./GroupChat";
import { Toaster } from "@/components/ui/toaster";

const ChatArea = () => {
  const { selectedChat } = ChatState();

  return (
    <div className="flex flex-col h-4/5 p-4 bg-background">
      {selectedChat ? (
        selectedChat.isGroupChat ? (
          <GroupChat selectedChat={selectedChat} />
        ) : (
          <DirectMessageChat selectedChat={selectedChat} />
        )
      ) : (
        <h1 className="text-center">Click on a chat to continue</h1>
      )}
      <Toaster />
    </div>
  );
};

export default ChatArea;
