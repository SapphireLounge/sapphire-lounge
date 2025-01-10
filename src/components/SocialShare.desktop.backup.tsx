import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.86 4.49v-8.4a8.16 8.16 0 005.73 2.24V10.5a5.85 5.85 0 01-3.77-1.53z"/>
  </svg>
);

const SocialShare = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      url: 'https://instagram.com/sapphirelounge'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      gradient: 'from-blue-500 to-blue-600',
      url: 'https://facebook.com/sapphirelounge'
    },
    {
      name: 'TikTok',
      icon: <TikTokIcon />,
      gradient: 'from-black to-gray-800',
      url: 'https://tiktok.com/@sapphirelounge'
    }
  ];

  return (
    <div className="w-full bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
        Connect With Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socialLinks.map((social, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg text-white font-medium
              bg-gradient-to-r ${social.gradient} hover:opacity-90 transition-opacity`}
            onClick={() => window.open(social.url, '_blank')}
          >
            {social.icon}
            <span className="text-sm">Share on {social.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
