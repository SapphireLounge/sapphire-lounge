import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';
import { useHaptics } from '../hooks/useHaptics';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const deviceType = useDeviceType();
  const { triggerHaptic } = useHaptics();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close mobile/tablet menu when switching to desktop
  useEffect(() => {
    if (deviceType === 'desktop') {
      setIsOpen(false);
    }
  }, [deviceType]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          mobileMenuRef.current && 
          hamburgerRef.current && 
          !mobileMenuRef.current.contains(event.target as Node) &&
          !hamburgerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        triggerHaptic();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, triggerHaptic]);

  const isMenuVisible = deviceType === 'desktop';
  const showHamburger = deviceType === 'mobile' || deviceType === 'tablet';

  const handleMobileClick = () => {
    if (showHamburger) {
      triggerHaptic();
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-black border-b border-gray-800/50">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:-ml-8">
            <img 
              src="/images/logo/Sapphire Lounge Circle Logo.png" 
              alt="Sapphire Logo" 
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-xl md:text-3xl font-semibold text-white">Sapphire Lounge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden ${isMenuVisible ? 'lg:flex' : ''} items-center space-x-10 md:mr-4`}>
            <NavLink 
              to="/" 
              className={({ isActive }) => `px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/menu" 
              className={({ isActive }) => `px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Menu
            </NavLink>
            <NavLink 
              to="/reservations" 
              className={({ isActive }) => `px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Reservations
            </NavLink>
            <NavLink 
              to="/events" 
              className={({ isActive }) => `px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Events
            </NavLink>
            <NavLink 
              to="/vip-services" 
              className={({ isActive }) => `px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Special Services
            </NavLink>
            <NavLink 
              to="/loyalty" 
              className={({ isActive }) => `px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors ${
                isActive ? 'text-white bg-dark-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Loyalty
            </NavLink>
          </div>

          {/* Mobile/Tablet Menu Button */}
          {showHamburger && (
            <button
              ref={hamburgerRef}
              onClick={() => {
                triggerHaptic();
                setIsOpen(!isOpen);
              }}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-8 w-8" aria-hidden="true" />
              ) : (
                <Menu className="h-8 w-8" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {/* Mobile/Tablet Navigation Menu */}
        {(deviceType === 'mobile' || deviceType === 'tablet') && (
          <div 
            ref={mobileMenuRef}
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'max-h-screen opacity-100 visible' 
                : 'max-h-0 opacity-0 invisible'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
                onClick={handleMobileClick}
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
                onClick={handleMobileClick}
              >
                Menu
              </NavLink>
              <NavLink
                to="/reservations"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
                onClick={handleMobileClick}
              >
                Reservations
              </NavLink>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
                onClick={handleMobileClick}
              >
                Events
              </NavLink>
              <NavLink
                to="/vip-services"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
                onClick={handleMobileClick}
              >
                Special Services
              </NavLink>
              <NavLink
                to="/loyalty"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
                onClick={handleMobileClick}
              >
                Loyalty
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;