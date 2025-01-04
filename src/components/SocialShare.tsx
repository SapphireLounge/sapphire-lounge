import { Facebook, Instagram } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';

const TikTokIcon = () => (
  <svg
    className="w-5 h-5 md:w-6 md:h-6"
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
      icon: <Instagram className="w-5 h-5 md:w-6 md:h-6" />,
      comingSoon: false,
      shareText: 'Share on Instagram',
      style: {
        background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #FCAF45)',
        borderColor: '#E1306C',
        minWidth: 'min-w-[160px] md:min-w-[180px]',
        justifyContent: 'justify-center'
      },
      hoverStyle: {
        background: 'linear-gradient(45deg, #6d2e96, #e41818, #f5a333)'
      }
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5 md:w-6 md:h-6" />,
      comingSoon: false,
      shareText: 'Share on Facebook',
      style: {
        backgroundColor: '#1877F2',
        borderColor: '#1877F2',
        minWidth: 'min-w-[160px] md:min-w-[180px]',
        justifyContent: 'justify-center'
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
        borderImage: 'linear-gradient(45deg, #25F4EE, #FE2C55) 1',
        borderWidth: '1px',
        borderStyle: 'solid',
        minWidth: 'min-w-[140px] md:min-w-[180px]',
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
      <div className={`flex ${isMobile ? 'flex-col items-center' : 'justify-center'} gap-${isMobile ? '2' : '6'}`}>
        {socialLinks.map((social, index) => (
          <button
            key={index}
            onClick={() => handleShare(social.name.toLowerCase())}
            className={`
              flex items-center gap-2 rounded-full text-white
              transition-all duration-300 ease-in-out
              ${isMobile ? 'px-5 py-2.5 text-base' : 'px-4 py-2 text-base'}
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
            <span>Share on {social.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
