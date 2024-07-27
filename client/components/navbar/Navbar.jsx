'use client';
import { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { navLinks } from "@/constant";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatState } from "@/context/ChatProvider";
import { Input } from "../ui/input";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const {user} = ChatState();

  return (
    <div className="w-full fixed top-0 z-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 orbitron-bold text-black dark:text-white">
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
          {!!user && (
            <Input 
            type="text"
            placeholder="Add users"
            />
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex items-center gap-10"
        >
          <div className="flex gap-5 tracking-wider">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="navbar-link text-primary font-bold px-3 py-2 rounded-md text-sm relative"
              >
                {link.label}
                <span className="animated-line"></span>
              </Link>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden flex justify-center items-center gap-2 flex-row-reverse"
        >
             <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Hamburger toggled={isOpen} toggle={setOpen} color="currentColor" />
        </motion.div>
      </div>
      {isOpen && <MobileNavbar />}
    </div>
  );
};

export default Navbar;
