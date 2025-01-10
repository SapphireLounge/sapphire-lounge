import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

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

const MobileSocialShare: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      comingSoon: false,
      shareText: 'Share on Instagram',
      style: {
        background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #FCAF45)',
        borderColor: '#E1306C',
        minWidth: '140px', // Reduced width for mobile
        justifyContent: 'center'
      },
      hoverStyle: {
        background: 'linear-gradient(45deg, #6d2e96, #e41818, #f5a333)'
      }
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      comingSoon: false,
      shareText: 'Share on Facebook',
      style: {
        backgroundColor: '#1877F2',
        borderColor: '#1877F2',
        minWidth: '140px', // Reduced width for mobile
        justifyContent: 'center'
      },
      hoverStyle: {
        backgroundColor: '#0c5dc7'
      }
    },
    {
      name: 'TikTok',
      icon: <TikTokIcon />,
      comingSoon: false,
      shareText: 'Share on TikTok',
      style: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        minWidth: '140px', // Reduced width for mobile
        justifyContent: 'center'
      },
      hoverStyle: {
        backgroundColor: '#141414'
      }
    }
  ];

  return (
    <div className="flex flex-col gap-3 p-4 w-full">
      {socialLinks.map((link) => (
        <button
          key={link.name}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-white transition-all duration-300 ${
            link.comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
          style={{
            ...link.style,
            fontSize: '0.9rem' // Slightly smaller font for mobile
          }}
          onMouseOver={(e) => {
            if (link.hoverStyle) {
              Object.assign(e.currentTarget.style, link.hoverStyle);
            }
          }}
          onMouseOut={(e) => {
            if (link.style) {
              Object.assign(e.currentTarget.style, link.style);
            }
          }}
          disabled={link.comingSoon}
        >
          {link.icon}
          <span>{link.shareText}</span>
          {link.comingSoon && <span className="text-xs">(Coming Soon)</span>}
        </button>
      ))}
    </div>
  );
};

export default MobileSocialShare;
