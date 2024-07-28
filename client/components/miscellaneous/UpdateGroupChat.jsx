"use client";
import React, { useState, useEffect } from "react";
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
import { ChatState } from "@/context/ChatProvider";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const UpdateGroupChat = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const { toast } = useToast();
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameChangeLoading, setNameChangeLoading] = useState(false);
  const [nameChangeResult, setNameChangeResult] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (nameChangeResult) {
      if (nameChangeResult.status === "success") {
        toast({
          title: nameChangeResult.message,
          description: "Group name change successful",
          type: "success",
        });
        setSelectedChat(nameChangeResult.data);
      } else {
        toast({
          title: nameChangeResult.message,
          description: "Group name change failed",
          type: "error",
        });
      }
    }
  }, [nameChangeResult, toast]);

  const handleNameChange = async () => {
    if (!chatName) {
      toast({
        title: "Set a valid name to continue.",
        description: "Group name change failed",
        type: "error",
      });
      return;
    }
    if (chatName === selectedChat.chatName) {
      toast({
        title: "There is no change in name.",
        description: "Group name change failed",
        type: "error",
      });
      return;
    }
    try {
      setNameChangeLoading(true);
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/grouprename`,
        {
          chatId: selectedChat._id,
          chatName: chatName,
        },
        config
      );
      setNameChangeResult(response.data);
    } catch (error) {
      toast({
        title: error.response?.data?.message || error.message,
        description: "Group name change failed",
        type: "error",
      });
    }
    setNameChangeLoading(false);
  };

  const handleRemoveUser = async (userId) => {
    if (user.user._id !== selectedChat.groupAdmin._id) {
      toast({
        title: "Authorization Declined",
        description: "Only admins can remove users",
        type: "error",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userId,
        },
        config
      );
      if (response.data.status === 'success') {
        toast({
          title: response.data.message,
          description: "User removed successfully",
          type: "success",
        });
        setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
        setSelectedChat(response.data.data);
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || error.message,
        description: "User removal failed",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/?search=${e.target.value}`,
          config
        );
        if (response.data.status === 'success') {
          setResults(response.data.data);
        } else {
          toast({
            title: "Error occurred",
            description: "User search failed",
            type: "error",
          });
        }
      } catch (error) {
        toast({
          title: error.response?.data?.message || error.message,
          description: "User search failed",
          type: "error",
        });
      }
    } else {
      setResults([]);
    }
  };

  const handleUserClick = (userId) => {
    if (!selectedUsers.some((user) => user._id === userId)) {
      setSelectedUsers((prev) => [
        ...prev,
        results.find((user) => user._id === userId),
      ]);
    } else {
      toast({
        title: "User is already in chat.",
        description: "Cannot be added again.",
        type: "error",
      });
    }
    setResults([]);
    setSearch("");
  };

  const handleAddToGroup = async (userId) => {
    if (user.user._id !== selectedChat.groupAdmin._id) {
      toast({
        title: "Authorization Declined",
        description: "Only admins can add to Group",
        type: "error",
      });
      return;
    }
    if (selectedUsers.some((user) => user._id === userId)) {
      toast({
        title: "User is already in chat.",
        description: "Cannot be added again.",
        type: "error",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/groupadd`, 
        {
          userId: userId,
          chatId: selectedChat._id
        },
        config
      );
     if(response.data.status === 'success'){
      toast({
        title: response.data.message,
        description: "User added successfully",
        type: "success",
      });
      setSelectedUsers((prev) => [
        ...prev,
        results.find((user) => user._id === userId),
      ]);
     }
    } catch (error) {
      toast({
        title: error.response?.data?.message || error.message,
        description: "User addition failed",
        type: "error",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setChatName(selectedChat.chatName);
            setSelectedUsers(selectedChat.users);
          }}
        >
          Edit Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Group</DialogTitle>
          <DialogDescription>
            Make changes to your group here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((user, index) => (
            <Badge key={index} variant="outline" className="flex items-center">
              {user.name}
              {user._id === selectedChat.groupAdmin._id && " (Admin)"}
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={chatName}
              className="col-span-3"
              onChange={(e) => {
                setChatName(e.target.value);
              }}
            />
            <Button onClick={handleNameChange}>
              {nameChangeLoading ? <Loader /> : "Update"}
            </Button>
          </div>
          <div className="relative flex flex-col items-center justify-center p-4 space-y-4">
            <Input
              placeholder="Search users"
              value={search}
              type="text"
              onChange={handleChange}
            />
            {!!results.length && (
              <div className="absolute top-16 w-full max-w-md mx-auto">
                <ul className="border shadow-md max-h-48 overflow-y-scroll">
                  {results.map((user) => (
                    <React.Fragment key={user._id}>
                      <li
                        className="text-sm py-2 px-4 cursor-pointer bg-background hover:bg-primary-foreground flex justify-between items-center"
                      >
                        <span>{user.name}</span>
                        <img
                          src={user.pfp}
                          alt="user profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <Button
                          className="ml-2"
                          onClick={()=>{
                            handleAddToGroup(user._id)
                          }}
                          
                        >
                          Add
                        </Button>
                      </li>
                      <Separator />
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit">Save changes</Button>
          </DialogTrigger>
        </DialogFooter>
        
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default UpdateGroupChat;
