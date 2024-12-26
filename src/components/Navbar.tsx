import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black border-b border-gray-800/50">
      {/* Desktop Navigation */}
      <div className="container mx-auto px-4 safe-top">
        <div className="flex justify-between items-center h-16 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo/Sapphire Lounge Circle Logo.png" alt="Sapphire Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold text-white">Sapphire Lounge</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              Menu
            </NavLink>
            <NavLink to="/reservations" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              Reservations
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              Events
            </NavLink>
            <NavLink to="/special-occasions" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              Special Occasions
            </NavLink>
            <NavLink to="/loyalty" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              Loyalty Scheme
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}>
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } md:hidden fixed inset-0 bg-black transition-all duration-300 ease-in-out z-50`}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/images/logo/Sapphire Lounge Circle Logo.png" alt="Sapphire Logo" className="h-8 w-8" />
              <span className="text-xl font-semibold text-white">Sapphire Lounge</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/menu" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
            >
              Menu
            </NavLink>
            <NavLink 
              to="/reservations" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
            >
              Reservations
            </NavLink>
            <NavLink 
              to="/events" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
            >
              Events
            </NavLink>
            <NavLink 
              to="/special-occasions" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
            >
              Special Occasions
            </NavLink>
            <NavLink 
              to="/loyalty" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
            >
              Loyalty Scheme
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link text-lg ${isActive ? 'nav-link-active' : ''}`}
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