'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import SidePanel from './SidePanel';
import { ChatState } from '@/context/ChatProvider';

const ChatNavbar = () => {
  const [isSidePanelOpen, setSidePanelOpen] = useState(false);
  const {user, setUser} = ChatState();

  const toggleSidePanel = () => {
    setSidePanelOpen(!isSidePanelOpen);
  };
  const handleOnLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };
  return (
    <div className="w-full fixed top-0 z-40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 orbitron-bold text-black dark:text-white">
      <div className="w-full flex justify-between items-center h-[75px] px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/">
            <img
              src="https://th.bing.com/th/id/OIG2.46p15k48yiMApzfci9Rm?w=1024&h=1024&rs=1&pid=ImgDetMain"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-10"
        >
          <div className="flex gap-5 tracking-wider">
            <Link href="/chats" className="navbar-link text-primary font-bold px-3 py-2 rounded-md text-sm relative">
              Chats
              <span className="animated-line"></span>
            </Link>
            {user ? (
              <Link
                href="/login"
                className="navbar-link text-primary font-bold px-3 py-2 rounded-md text-sm relative"
                onClick={handleOnLogout}
              >
                Logout
                <span className="animated-line"></span>
              </Link>
            ) : (
              <Link
                href="/register"
                className="navbar-link text-primary font-bold px-3 py-2 rounded-md text-sm relative"
              >
                Register
                <span className="animated-line"></span>
              </Link>
            )}
          </div>
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={toggleSidePanel}>
            <img
              src="https://icon-library.com/images/menu-icon-white-png/menu-icon-white-png-27.jpg"
              alt="Open Side Panel"
              className="h-[1.2rem] w-[1.2rem]"
            />
          </Button>
        </motion.div>
      </div>
      <SidePanel isSidePanelOpen={isSidePanelOpen} />
    </div>
  );
};

export default ChatNavbar;
