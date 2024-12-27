import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md">
      {/* Desktop Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center h-16">
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/menu" 
              className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Menu
            </NavLink>
            <NavLink 
              to="/reservations" 
              className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Reservations
            </NavLink>
            <NavLink 
              to="/loyalty" 
              className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Loyalty Scheme
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button - Positioned Absolutely */}
          <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} />
              <X className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Centered */}
      <div 
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden w-full bg-black shadow-lg`}
      >
        <div className="container mx-auto px-4">
          <div className="py-2 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-center ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-center ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/menu" 
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-center ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Menu
            </NavLink>
            <NavLink 
              to="/reservations" 
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-center ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Reservations
            </NavLink>
            <NavLink 
              to="/loyalty" 
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-center ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Loyalty Scheme
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium text-center ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;