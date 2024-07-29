"use client";
import { useState, useEffect } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { ChatState } from "@/context/ChatProvider";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { user, setUser } = ChatState();
  

  const handleOnLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

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
          className="hidden lg:flex items-center gap-10"
        >
          <div className="flex gap-5 tracking-wider">
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden flex justify-center items-center gap-2 flex-row-reverse"
        >
          <ThemeToggle />
          <Hamburger toggled={isOpen} toggle={setOpen} color="currentColor" />
        </motion.div>
      </div>
      {isOpen && <MobileNavbar />}
    </div>
  );
};

export default Navbar;
