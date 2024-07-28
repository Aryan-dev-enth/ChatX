"use client";
import React from "react";
import { ChatState } from "@/context/ChatProvider";
import { Eye, EyeIcon } from "lucide-react";
import UpdateGroupChat from "@/components/miscellaneous/UpdateGroupChat";

const ChatArea = () => {
  const { selectedChat } = ChatState();

  return (
    <div className="flex flex-col h-4/5 p-4 bg-background">
      {selectedChat ? (
        <>
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold capitalize">
              {selectedChat.chatName}
            </h2>
            <ul className="flex justify-center items-center">
              {selectedChat.users.slice(0, 4).map((user, index) => (
                <li id={index} className="text-sm px-1">
                  {user.name},{` `}
                </li>
              ))}
              ...
            </ul>
            {selectedChat.isGroupChat ? <UpdateGroupChat /> : <EyeIcon/>}
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto space-y-4">
            {/* Chat messages will go here */}
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
        </>
      ) : (
        <h1 className="text-center">Click on a chat to continue</h1>
      )}
    </div>
  );
};

export default ChatArea;
