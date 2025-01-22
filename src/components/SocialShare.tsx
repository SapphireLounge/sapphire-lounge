import { Facebook, Instagram } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';

const TikTokIcon = () => (
  <svg
    className="w-5 h-5 md:w-7 md:h-7"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.045 5.073 5.073 0 0 1-2.797-1.487 5.044 5.044 0 0 1-1.49-2.797 5.122 5.122 0 0 1-.045-.443H9.934v11.928a2.338 2.338 0 0 1-1.233 2.06 2.338 2.338 0 0 1-2.368-.029 2.338 2.338 0 0 1-.748-3.707 2.338 2.338 0 0 1 3.708.748v-3.437a5.796 5.796 0 0 0-2.342-.486A5.835 5.835 0 0 0 1.116 14.7a5.835 5.835 0 0 0 5.835 5.835 5.835 5.835 0 0 0 5.835-5.835V8.35a8.387 8.387 0 0 0 4.796 1.49V5.562h-0.06z"/>
  </svg>
);

const SocialShare = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5 md:w-7 md:h-7" />,
      comingSoon: false,
      shareText: 'Share on Instagram',
      style: {
        backgroundColor: '#000000',
        borderImage: 'linear-gradient(45deg, #833AB4, #FD1D1D, #FCAF45) 1',
        borderWidth: '2px',
        borderStyle: 'solid',
        minWidth: 'min-w-[140px] md:min-w-[200px]',
        justifyContent: 'justify-center'
      },
      hoverStyle: {
        backgroundColor: '#141414'
      }
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5 md:w-7 md:h-7" />,
      comingSoon: false,
      shareText: 'Share on Facebook',
      style: {
        backgroundColor: '#000000',
        borderImage: 'linear-gradient(45deg, #1877F2, #0c5dc7) 1',
        borderWidth: '2px',
        borderStyle: 'solid',
        minWidth: 'min-w-[140px] md:min-w-[200px]',
        justifyContent: 'justify-center'
      },
      hoverStyle: {
        backgroundColor: '#141414'
      }
    },
    {
      name: 'TikTok',
      icon: <TikTokIcon />,
      comingSoon: false,
      shareText: 'Share on TikTok',
      style: {
        backgroundColor: '#000000',
        borderImage: 'linear-gradient(45deg, #25F4EE, #FE2C55) 1',
        borderWidth: '2px',
        borderStyle: 'solid',
        minWidth: 'min-w-[140px] md:min-w-[200px]',
        justifyContent: 'justify-center'
      },
      hoverStyle: {
        backgroundColor: '#141414'
      }
    }
  ];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = 'Check out Sapphire Lounge!';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/share?url=${encodeURIComponent(url)}`,
      tiktok: `https://www.tiktok.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={isMobile ? 'pt-6 pb-8' : ''}>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-[0.0625rem] bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 pb-0.5">
          Connect With Us
        </h2>
        <p className={`text-gray-400 text-center mt-1.5 ${isMobile ? 'mb-6' : 'mb-2 md:mb-6'} max-w-3xl mx-auto text-base`}>
          Follow us on social media and stay updated with our latest events and offers.
        </p>
        <div className={`flex ${isMobile ? 'flex-col items-center w-full max-w-[280px] mx-auto' : 'justify-center'} gap-${isMobile ? '4' : '6'}`}>
          {socialLinks.map((social, index) => (
            <button
              key={index}
              onClick={() => handleShare(social.name.toLowerCase())}
              className={`
                flex items-center gap-2 rounded-full text-white w-full
                transition-all duration-300 ease-in-out
                ${isMobile ? 'px-5 py-3 text-base justify-center' : 'px-6 py-3 text-lg'}
                ${social.comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
              `}
              style={social.style}
              onMouseEnter={(e) => {
                if (social.hoverStyle) {
                  Object.assign(e.currentTarget.style, social.hoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                if (social.style) {
                  Object.assign(e.currentTarget.style, social.style);
                }
              }}
              disabled={social.comingSoon}
            >
              {social.icon}
              <span className="flex-1 text-center">Share on {social.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
