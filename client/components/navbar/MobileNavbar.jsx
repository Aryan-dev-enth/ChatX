
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { navLinks } from "../../constant";

const MobileNavbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center items-center lg:hidden gap-4 pb-5"
    >
      <div className="flex flex-col justify-center items-center gap-2 tracking-wider">
        
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="navbar-link text-primary font-bold px-3 py-2  text-sm relative border-b-[1px] "
          >
            {link.label}
            <span className="animated-line"></span>
          </Link>
        ))}
        
      </div>
     
      
    </motion.div>
  );
};

export default MobileNavbar;