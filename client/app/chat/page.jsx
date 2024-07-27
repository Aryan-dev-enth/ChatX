"use client";
import React from "react";
import { ChatState } from "@/context/ChatProvider";
const page = () => {
  const { user } = ChatState();
  
  return <div className="bg-background w-screen min-h-screen">something</div>;
};

export default page;
