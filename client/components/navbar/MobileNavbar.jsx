
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ChatState } from "@/context/ChatProvider";
const MobileNavbar = () => {
  const {user, setUser} = ChatState();
  const handleOnLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center items-center lg:hidden gap-4 pb-5"
    >
      <div className="flex flex-col justify-center items-center gap-2 tracking-wider">
        
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
     
      
    </motion.div>
  );
};

export default MobileNavbar;