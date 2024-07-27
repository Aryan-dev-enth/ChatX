'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { register } from '@/apiCall';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from '@/components/ui/use-toast'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterPage = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await register(formData);

      if (response.status==='success') {
        toast({
          title: 'Registration Successful',
          description: 'You have successfully registered.',
          variant: 'success',
        });

        localStorage.setItem("userInfo", response.data);
        setFormData({ name: '', email: '', password: '' }); 
        router.push("/login");

        
      } else {
        toast({
          title: 'Registration Failed',
          description: response.message || 'Registration failed.',
          variant: 'error',
        });
      }
    } catch (error) {
      toast({
        title: 'An Error Occurred',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'error',
      });
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center bg-background">
      <div className="w-full max-w-md p-8 bg-background rounded-lg shadow-md border-[1px] border-primary">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-primary">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-primary">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-primary">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full"
              placeholder="Enter your password"
            />
          </div>
          <Toaster />
          <Button type="submit" className="w-full my-4" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <Link href="/login" className="underline text-sm">Login instead</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
