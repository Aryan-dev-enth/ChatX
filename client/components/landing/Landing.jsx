"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-4xl text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome to Chat X
        </h1>
        <p className="text-lg text-secondary-foreground mb-6 w-1/2">
          Chat X is your ultimate chat platform for connecting with friends and
          colleagues. Whether you're catching up or collaborating on a project,
          Chat X provides you with all the tools you need for seamless
          communication.
        </p>
       <Link href="/chat">
        <Button>
          Start Chat
        </Button>
       </Link>
      </div>
    </div>
  );
};

export default Landing;
