"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "@/context/ChatProvider";
import { Button } from "@/components/ui/button";
import GroupChatModal from "@/components/miscellaneous/GroupChatModal";

const MyChats = () => {
  const { user, setSelectedChat, selectedChat } = ChatState();
  const [result, setResult] = useState([]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setResult(response.data.data);
      }
    } catch (error) {
      console.error("Error accessing chat:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [user, selectedChat]);

  if(!user){
    return <></>
  }

  return (
    <div className="flex flex-col p-4 bg-background h-full">
      <h2 className="text-xl font-bold mb-4">My Chats</h2>
      <GroupChatModal>
        <Button className="mb-8">Group Chat</Button>
      </GroupChatModal>
      <div className="space-y-2">
        {result.map((chat) => {
          // Determine the display name for the chat
          const chatName =
            chat.chatName === user.user.name
              ? chat.users.find((u) => u.name !== user.user.name)?.name
              : chat.chatName;

          return (
            <div
              key={chat._id}
              className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-primary-foreground transition"
              onClick={() => setSelectedChat(chat)}
            >
              <h3 className="font-semibold">{chatName}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyChats;
