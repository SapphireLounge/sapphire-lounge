import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  className?: string;
}

function Footer({ className, ...otherProps }: FooterProps) {
  // Custom TikTok icon component
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      className={className}
    >
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
    </svg>
  );

  return (
    <div className={`${className} w-full relative -mx-[50vw] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-black`} {...otherProps}>
      <footer className="w-full bg-black text-gray-400 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Quick Links - First column on mobile */}
            <div className="md:col-span-1 space-y-4 order-1 md:order-2">
              <h3 className="text-white font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors text-lg">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors text-lg">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/vip-services" className="text-gray-400 hover:text-primary-400 transition-colors text-lg">
                    Special Occasions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Description and Social Links - Second column on mobile */}
            <div className="md:col-span-1 space-y-4 order-2 md:order-1">
              <p className="text-gray-400 text-lg">
                Experience luxury and relaxation in the heart of the city.
              </p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" aria-label="TikTok" className="text-gray-400 hover:text-primary-300 transition-colors">
                  <TikTokIcon className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Support - Third column on mobile */}
            <div className="md:col-span-1 space-y-4 order-3">
              <h2 className="text-white font-semibold text-lg">Support</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-primary-300 transition-colors text-lg">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-primary-300 transition-colors text-lg">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-primary-300 transition-colors text-lg">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-primary-300 transition-colors text-lg">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Opening Hours - Fourth column on mobile */}
            <div className="md:col-span-1 space-y-4 order-4">
              <h2 className="text-white font-semibold text-lg">Opening Hours</h2>
              <ul className="space-y-2 text-lg text-gray-400">
                <li>Monday: Closed</li>
                <li>Tuesday - Sunday: 5PM - 2AM</li>
                <li>Open Bank Holidays</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-accent-700/20 mt-8 pt-6">
            <p className="text-center text-lg text-gray-400">&copy; {new Date().getFullYear()} Sapphire Lounge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;