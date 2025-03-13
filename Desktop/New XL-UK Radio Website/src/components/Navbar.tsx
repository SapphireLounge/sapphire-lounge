import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black backdrop-blur-md py-3 shadow-lg shadow-primary/10' : 'bg-black py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 md:ml-16">
            <Radio className="h-8 w-8 text-primary" />
            <span className="text-2xl font-display font-bold">XL:UK Radio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1 pr-4">
            <nav className="flex items-center space-x-6 ml-auto">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/about" className="nav-link">About</NavLink>
              <NavLink to="/shows" className="nav-link">Shows</NavLink>
              <NavLink to="/news" className="nav-link">News</NavLink>
              <NavLink to="/events" className="nav-link">Events</NavLink>
              <NavLink to="/djs" className="nav-link">Roster</NavLink>
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>
                <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</NavLink>
                <NavLink to="/shows" className="nav-link" onClick={() => setIsOpen(false)}>Shows</NavLink>
                <NavLink to="/news" className="nav-link" onClick={() => setIsOpen(false)}>News</NavLink>
                <NavLink to="/events" className="nav-link" onClick={() => setIsOpen(false)}>Events</NavLink>
                <NavLink to="/djs" className="nav-link" onClick={() => setIsOpen(false)}>Roster</NavLink>
                <NavLink to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</NavLink>
                {/* Listen Live button removed from mobile menu */}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;