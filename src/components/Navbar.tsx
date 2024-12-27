import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 safe-top">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/logo/Sapphire Lounge Circle Logo.png" 
              alt="Sapphire Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-semibold text-white">Sapphire Lounge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Menu
            </NavLink>
            <NavLink to="/reservations" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Reservations
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Events
            </NavLink>
            <NavLink to="/vip-services" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              VIP Services
            </NavLink>
            <NavLink to="/special-occasions" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Special Occasions
            </NavLink>
            <NavLink to="/loyalty" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Loyalty
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link block ${isActive ? 'nav-link-active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link block ${isActive ? 'nav-link-active' : ''}`}
            >
              Menu
            </NavLink>
            <NavLink
              to="/reservations"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link block ${isActive ? 'nav-link-active' : ''}`}
            >
              Reservations
            </NavLink>
            <NavLink
              to="/events"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link block ${isActive ? 'nav-link-active' : ''}`}
            >
              Events
            </NavLink>
            <NavLink
              to="/vip-services"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link block ${isActive ? 'nav-link-active' : ''}`}
            >
              VIP Services
            </NavLink>
            <NavLink
              to="/special-occasions"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link block ${isActive ? 'nav-link-active' : ''}`}
            >
              Special Occasions
            </NavLink>
            <NavLink
              to="/loyalty"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-link block ${isActive ? 'nav-link-active' : ''}`}
            >
              Loyalty
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;