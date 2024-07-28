import React from 'react';
import ChatNavbar from './ChatNavbar';

const ChatLayout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <ChatNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

export default ChatLayout;
