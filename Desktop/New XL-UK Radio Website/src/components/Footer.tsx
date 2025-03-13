import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Radio } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-darker/90 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* About */}
          <div className="md:col-span-3">
            <div className="flex items-center mb-5">
              <Radio className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-display font-bold ml-2">XL:UK Radio</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              XL:UK Radio is your favourite music station that broadcasts 24/7 with the latest hits and best diverse shows.
            </p>
            <div className="flex space-x-5 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110" 
                aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110" 
                aria-label="X (formerly Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110" 
                aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110" 
                aria-label="YouTube">
                <Youtube className="h-7 w-7" />
              </a>
            </div>
            <div className="mt-6 text-gray-400 text-sm">
              <p className="mb-2 font-medium text-white/80">Listen on:</p>
              <p className="flex items-center flex-wrap gap-x-4">
                <span className="inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5 opacity-75"></span>
                  Web
                </span>
                <span className="inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5 opacity-75"></span>
                  App
                </span>
                <span className="inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5 opacity-75"></span>
                  Cardiff DAB
                </span>
                <span className="inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5 opacity-75"></span>
                  Streaming
                </span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 pl-0 md:pl-4">
            <h3 className="text-lg font-semibold mb-5 text-white/90">Quick Links</h3>
            <ul className="space-y-3 pl-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-75"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shows" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-75"></span>
                  Shows
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-75"></span>
                  News
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-75"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/djs" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-75"></span>
                  Roster
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-75"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="md:col-span-7 pl-0 md:pl-8 lg:pl-12 relative">
            <h3 className="text-lg font-semibold mb-5 text-white/90">Legal Information</h3>
            <div className="bg-dark-lighter/30 rounded-lg p-5 backdrop-blur-sm text-gray-400 text-sm leading-relaxed md:w-[calc(100%+4rem)] lg:w-[calc(100%+6rem)] relative right-0">
              <p>
                XL:UK Radio operates independently & does not hold any information. It is strictly regulated by the station management so that the end-user has a comfortable & safe feeling about viewing content when they visit the official website or using the app when it's installed & used to stream music from the station on either Android or iOS devices as well.
              </p>
              <p className="mt-3">
                If there are any concerns or queries about your privacy when visiting the official site or using the station app, then feel free to email us. All logos, names & branding as well as anything else that's associate/related to the station whether here on the website or anywhere else that it's featured/promoted is copyrighted & patented.
              </p>
              <p className="mt-3">
                If there are attempts to use all or any part of them, then it will result in a take down notice or legal action being taken.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="border-t border-dark-medium mt-10 pt-6 md:w-[calc(100%+4rem)] lg:w-[calc(100%+6rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-3 sm:mb-0">
                &copy; {currentYear} XL:UK Radio. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;