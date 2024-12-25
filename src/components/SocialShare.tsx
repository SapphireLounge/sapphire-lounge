import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';

const TikTokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="relative top-[1px]"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SocialShare: FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      url: 'https://instagram.com/sapphirelounge'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      gradient: 'from-blue-500 to-blue-600',
      url: 'https://facebook.com/sapphirelounge'
    },
    {
      name: 'TikTok',
      icon: <TikTokIcon />,
      gradient: 'from-[#FF0050] from-20% via-black via-50% to-[#00F2EA] to-80%',
      url: 'https://tiktok.com/@sapphirelounge'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {socialLinks.map((social, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center gap-3 p-3 rounded-lg text-white font-medium
            bg-gradient-to-r ${social.gradient} hover:opacity-90 transition-opacity min-h-[48px]`}
          onClick={() => window.open(social.url, '_blank')}
        >
          <span className="flex items-center justify-center w-6 h-6">
            {social.icon}
          </span>
          <span className="text-sm whitespace-nowrap">Share on {social.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default SocialShare;
