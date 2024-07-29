"use client";
import React from "react";

const ChatBox = () => {
  return (
    <>
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
  );
};

export default ChatBox;
