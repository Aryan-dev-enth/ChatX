import Navbar from '@/components/navbar/Navbar';
import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <>
    <Navbar />
        {children}
    </>
  );
}
