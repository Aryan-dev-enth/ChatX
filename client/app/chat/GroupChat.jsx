"use client";
import React from "react";
import UpdateGroupChat from "@/components/miscellaneous/UpdateGroupChat";
import ChatBox from "./ChatBox";

const GroupChat = ({ selectedChat }) => {
  return (
    <>
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-xl font-semibold capitalize">
          {selectedChat.chatName}
        </h2>
        <ul className="flex justify-center items-center">
          {selectedChat.users.slice(0, 4).map((user, index) => (
            <li key={index} className="text-sm px-1">
              {user.name},{` `}
            </li>
          ))}
          ...
        </ul>
        <UpdateGroupChat />
      </div>
      <ChatBox />
    </>
  );
};

export default GroupChat;
