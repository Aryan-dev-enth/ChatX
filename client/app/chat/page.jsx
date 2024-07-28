import React from 'react';
import MyChats from './MyChats';
import ChatArea from './ChatArea';

const Page = () => {
  return (
    <div className="flex h-screen pt-16">
      <div className="w-1/4 p-4  border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4"></h2>
       <MyChats />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Chat Section</h2>
        <ChatArea />
      </div>
    </div>
  );
}

export default Page;
