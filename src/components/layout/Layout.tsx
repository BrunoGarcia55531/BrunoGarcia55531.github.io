import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen w-full">
    <Header />
    <main className="flex-1 flex flex-col justify-center items-center w-full max-w-full">{children}</main>
    <Footer />
  </div>
);
