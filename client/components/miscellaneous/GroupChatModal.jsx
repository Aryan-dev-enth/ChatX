import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "../ui/toaster";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { ChatState } from "@/context/ChatProvider";
import { useToast } from "../ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const GroupChatModal = ({ children }) => {
  const { toast } = useToast();
  const { user } = ChatState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [chatName, setChatName] = useState('')

  useEffect(() => {
    const fetchResult = async () => {
      if (search.trim() === '') {
        setResult([]);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            params: { search: search },
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setResult(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResult();
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUserClick = (user) => {
    if (selectedUsers.some(selectedUser => selectedUser._id === user._id)) {
      toast({
        title: 'User already added.',
        description: 'This user is already in the group.',
        variant: 'error',
      });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
    setSearch('')
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== userId));
  };

  const createGroupChat = async () => {
    if(!chatName){
        toast({
            title: 'Set group chat name',
            description: `An error occurred while creating the group chat. Please try again.`,
            variant: 'error',
          });
          return;
    }
    if(selectedUsers<2){
        toast({
            title: 'Group chat must contain more than 2 users.',
            description: `An error occurred while creating the group chat. Please try again.`,
            variant: 'error',
          });
          return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/group`,
        {
          users: JSON.stringify(selectedUsers.map(user => user._id)), 
          name: chatName
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      
      if(response.data.status==="success"){
        toast({
            title: 'Group chat created',
            description: `Group chat "${chatName}" has been created successfully.`,
            variant: 'success',
          });
          setChatName('')
          return;
      }
      toast({
        title: 'Server error',
        description: `An error occurred while creating the group chat. Please try again.`,
        variant: 'error',
      });

    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
      toast({
        title: 'Error',
        description: 'An error occurred while creating the group chat. Please try again.',
        variant: 'error',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>{children}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-auto">
        <DialogHeader>
          <DialogTitle>Create Group Chat</DialogTitle>
          <DialogDescription>
            Set a name for your group chat and add participants.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user, index) => (
              <Badge key={index} variant="outline" className="flex items-center">
                {user.name}
                <button
                  type="button"
                  onClick={() => handleRemoveUser(user._id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </Badge>
            ))}
          </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Input
              id="chatName"
              className="col-span-3"
              placeholder="Chat Name"
              onChange={(e) => setChatName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4 relative">
            <Input
              id="searchUsers"
              placeholder="Search users"
              value={search}
              type="text"
              onChange={handleChange}
              className="col-span-3"
            />
            {result && !!result.length && (
              <div className="absolute top-14 w-full max-w-sm bg-background border shadow-md rounded-md z-50 mt-1">
                <ul className="max-h-48 overflow-y-scroll">
                  {result.map((user) => (
                    <React.Fragment key={user._id}>
                      <li
                        className="text-sm py-2 px-4 cursor-pointer flex justify-between items-center"
                        onClick={() => handleUserClick(user)}
                      >
                        <h1>{user.name}</h1>
                        <img
                          src={user.pfp}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                      </li>
                      <Separator className="border-t" />
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            )}
          </div>
         
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createGroupChat}>Create Group Chat</Button>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default GroupChatModal;
