'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';
import useDebounce from '@/hooks/useDebounce';
import { ChatState } from '@/context/ChatProvider';
import { Separator } from '@radix-ui/react-separator';
import { Alert } from '../Alert';

const SearchUsers = () => {
  const { user, setSelectedChat } = ChatState();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.trim() === '') {
        setResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            params: { search: debouncedSearch },
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setResults(response.data.data);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching results.');
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setIsAlertOpen(true);
  };

  const handleAction = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/`,
        { userId: selectedUserId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
       
      );
      console.log(response)

      setSelectedChat(response.data.data);
      console.log(`User with ID ${selectedUserId} confirmed`);

      setIsAlertOpen(false);
      setResults([]);
      setSearch('');
    } catch (error) {
      console.error('Failed to access chat', error);
      setError('Failed to access chat.');
      setIsAlertOpen(false);
    }
  };

  const handleCancel = () => {
    console.log(`Action cancelled`);
    setIsAlertOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 space-y-4">
      <Input
        placeholder="Search users"
        value={search}
        type="text"
        onChange={handleChange}
        className=""
      />
      {!!results.length && (
        <div className="absolute top-16 w-full max-w-md mx-auto">
          <ul className="border shadow-md max-h-48 overflow-y-scroll">
            {results.map((user) => (
              <React.Fragment key={user._id}>
                <li
                  className="text-sm py-2 px-4 cursor-pointer hover:bg-primary-foreground flex justify-between items-center"
                  onClick={() => handleUserClick(user._id)}
                >
                  <h1>{user.name}</h1>
                  <img
                    src={user.pfp}
                    alt="Profile"
                    className="w-8 h-8 rounded-full bg-secondary-foreground"
                  />
                </li>
                <Separator className="border-t" />
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}

      <Alert
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Are you sure?"
        description="Do you want to proceed with this user?"
        cancelText="Cancel"
        actionText="Confirm"
        onAction={handleAction}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default SearchUsers;
