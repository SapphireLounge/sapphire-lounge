import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

function Footer() {
  // Custom TikTok icon component
  const TikTokIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.045a5.073 5.073 0 0 1-2.797-1.487a5.044 5.044 0 0 1-1.49-2.797a5.122 5.122 0 0 1-.045-.443H9.934v11.928a2.338 2.338 0 0 1-1.233 2.06a2.338 2.338 0 0 1-2.368-.029a2.338 2.338 0 0 1-.748-3.707a2.338 2.338 0 0 1 3.708.748v-3.437a5.796 5.796 0 0 0-2.342-.486A5.835 5.835 0 0 0 1.116 14.7a5.835 5.835 0 0 0 5.835 5.835a5.835 5.835 0 0 0 5.835-5.835V8.35a8.387 8.387 0 0 0 4.796 1.49V5.562h-0.06z"/>
    </svg>
  );

  return (
    <div className="w-full relative -mx-[50vw] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-black">
      <footer className="w-full bg-black text-gray-400 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2 sm:mb-3">
                Experience luxury and relaxation in the heart of the city.
              </p>
              <div className="flex space-x-3">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" aria-label="TikTok" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <TikTokIcon />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2 sm:mb-4">Quick Links</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/vip-services" className="text-gray-400 hover:text-primary-400 transition-colors">
                    Special Occasions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-1 sm:mb-2 text-gray-200">Support</h2>
              <ul className="space-y-1 sm:space-y-1.5">
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-primary-300 transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-1 sm:mb-2 text-gray-200">Opening Hours</h2>
              <ul className="space-y-1 sm:space-y-1.5 text-sm text-gray-400">
                <li>Monday: Closed</li>
                <li>Tuesday - Sunday: 5PM - 2AM</li>
                <li>Open Bank Holidays</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-accent-700/20 mt-4 sm:mt-6 pt-4 sm:pt-6">
            <p className="text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} Sapphire Lounge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;