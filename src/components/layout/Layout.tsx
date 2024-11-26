import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-dark-500 text-white">
      <Navbar />
      <main>
        <div className="min-h-screen bg-gradient-to-b from-dark-300 to-dark-400 text-gray-100">
          <div className="fixed inset-0 bg-gradient-radial from-accent-700/20 via-dark-300/50 to-dark-400 pointer-events-none" />
          <main className="relative">
            <Outlet />
          </main>
        </div>
      </main>
      <Footer />
    </div>
  );
}
