'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { login } from '@/apiCall';  // Adjust the import path as needed
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router= useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData);

      if (response.status === 'success') {
        toast({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          variant: 'success',
        });

        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setFormData({ email: '', password: '' }); // Reset form
        router.push("/")
      } else {
        toast({
          title: 'Login Failed',
          description: response.message || 'Login failed.',
          variant: 'error',
        });
      }
    } catch (error) {
      toast({
        title: 'An Error Occurred',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'error',
      });
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center bg-background">
      <div className="w-full max-w-md p-8 bg-background rounded-lg shadow-md border-[1px] border-primary">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
