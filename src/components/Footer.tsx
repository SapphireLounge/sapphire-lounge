import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section">
          <p className="footer-tagline">
            Experience luxury and relaxation in<br />
            the heart of the city.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-primary-300 transition-colors">
              <Facebook size={20} className="h-7 w-7" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-primary-300 transition-colors">
              <Instagram size={20} className="h-7 w-7" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-primary-300 transition-colors">
              <TikTokIcon className="h-7 w-7" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <nav className="footer-nav">
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/events" className="footer-link">Events</Link>
            <Link to="/special-occasions" className="footer-link">Special Occasions</Link>
          </nav>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3 className="footer-heading">Support</h3>
          <nav className="footer-nav">
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
          </nav>
        </div>

        {/* Opening Hours */}
        <div className="footer-section">
          <h3 className="footer-heading">Opening Hours</h3>
          <div className="footer-hours">
            <p className="text-gray-400">Monday: Closed</p>
            <p className="text-gray-400">Tuesday - Sunday: 5PM - 2AM</p>
            <p className="text-gray-400">Open Bank Holidays</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p> 2024 Sapphire Lounge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;