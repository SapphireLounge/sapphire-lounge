import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedEvents from '../components/FeaturedEvents';
import SpecialOffers from '../components/SpecialOffers';
import ErrorBoundary from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { BackToTop } from '../components/ui/BackToTop';
import { Newsletter } from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { SEO } from '../components/SEO';
import { SkipToContent } from '../components/ui/SkipToContent';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { useDeviceType } from '../hooks/useDeviceType';
import SocialShare from '../components/SocialShare';

function Home() {
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [blurComplete, setBlurComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  // Desktop hero image remains default
  const heroImageUrl = "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
  // Mobile-optimized image (smaller, portrait oriented)
  const mobileHeroImageUrl = "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
  const blurImageUrl = deviceType === 'mobile' 
    ? "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=20"
    : "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=20";

  useKeyboardNav({
    onArrowDown: () => {
      setActiveSection(prev => Math.min(prev + 1, 4));
      document.querySelector(`[data-section="${activeSection + 1}"]`)?.scrollIntoView({ behavior: 'smooth' });
    },
    onArrowUp: () => {
      setActiveSection(prev => Math.max(prev - 1, 0));
      document.querySelector(`[data-section="${activeSection - 1}"]`)?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  useEffect(() => {
    // Preload both images
    const preloadImages = async () => {
      // Preload blur image first
      const blurImg = new Image();
      blurImg.src = blurImageUrl;
      await new Promise(resolve => {
        blurImg.onload = resolve;
      });

      // Then preload full resolution image
      const fullImg = new Image();
      fullImg.src = deviceType === 'mobile' ? mobileHeroImageUrl : heroImageUrl;
      await new Promise(resolve => {
        fullImg.onload = resolve;
      });
      
      setBgImageLoaded(true);
      // Add a small delay before removing blur for smoother transition
      setTimeout(() => {
        setBlurComplete(true);
      }, 50);
    };

    preloadImages();

    // Add preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = deviceType === 'mobile' ? mobileHeroImageUrl : heroImageUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [heroImageUrl, mobileHeroImageUrl, blurImageUrl, deviceType]);

  return (
    <>
      <SEO 
        title="Premium Shisha Experience"
        description="Experience the finest flavours in an atmosphere of luxury and comfort at Sapphire Lounge. Your journey to exceptional relaxation starts here."
        keywords={['shisha lounge', 'premium shisha', 'hookah bar', 'luxury lounge', 'sapphire lounge', 'events', 'special offers']}
      />
      <SkipToContent contentId="main-content" />
      <main id="main-content" className="relative">
        {/* Hero Section - Desktop First */}
        <motion.section
          data-section="0"
          className={`
            relative min-h-[60vh] flex items-center justify-center w-full
            ${!isMobile ? 'pt-24 pb-12' : 'pt-20 pb-8'}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Luxurious lounge interior with ambient lighting"
        >
          <div 
            className="absolute inset-0 w-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgImageLoaded ? (deviceType === 'mobile' ? mobileHeroImageUrl : heroImageUrl) : blurImageUrl})`,
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              width: '100vw',
              filter: blurComplete ? 'none' : 'blur(5px)',
              transition: 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: blurComplete ? 'scale(1)' : 'scale(1.05)',
              backgroundPosition: deviceType === 'mobile' ? 'center center' : 'center 65%',
              zIndex: 0
            }}
          />
          <div className="absolute inset-0" style={{
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw',
            background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%)',
            mixBlendMode: 'multiply',
            zIndex: 1
          }} />
          <div className="absolute inset-0 bg-black/30" style={{
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw',
            zIndex: 2
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-900" style={{
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw',
            opacity: 0.8,
            zIndex: 3
          }} />
          <div className={`
            container mx-auto ${deviceType === 'mobile' ? 'px-4' : 'px-8'} 
            relative z-10 py-6
          `}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center">
                <OptimizedImage 
                  src="/images/logo/Sapphire Lounge Circle Logo.png" 
                  alt="Sapphire Lounge" 
                  className={`${isMobile ? 'w-32 h-32 mb-2' : 'w-32 h-32 mb-3'}`}
                />
              </div>
              <h1 className={`
                font-bold text-white leading-normal tracking-wide
                ${isMobile ? 'text-4xl mb-0.5' : 'text-5xl mb-1'}
              `}>
                Sapphire Lounge
              </h1>
              <h2 className={`
                font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 
                uppercase tracking-wider
                ${isMobile ? 'text-xl mt-0 mb-1' : 'text-2xl md:text-3xl mb-2'}
              `}>
                Premium Shisha Experience
              </h2>
              <div className={`mt-0 mb-4 text-gray-200 max-w-3xl mx-auto ${
                deviceType === 'mobile' ? 'text-xs px-4 text-center' : 'text-base px-8'
              }`}>
                <p className={`${isMobile ? 'whitespace-nowrap inline-block' : ''}`}>
                  Experience the finest flavours in an atmosphere of luxury and comfort.
                </p>
                <p>Your journey to exceptional relaxation starts here.</p>
              </div>
              <div className={`
                flex flex-row items-center justify-center gap-4 mt-8
                ${!isMobile ? 'mb-6' : 'mb-4'}
              `}>
                <Link
                  to="/reservations"
                  className={`
                    px-8 py-3 rounded-lg bg-gradient-to-r from-primary-400 to-accent-400
                    text-white font-semibold shadow-lg hover:shadow-xl
                    transition-all duration-200 hover:-translate-y-0.5
                    min-w-[160px] text-center
                  `}
                >
                  Book Now
                </Link>
                <Link
                  to="/menu"
                  className={`
                    px-8 py-3 rounded-lg bg-transparent
                    text-white font-semibold shadow-lg hover:shadow-xl
                    transition-all duration-200 hover:-translate-y-0.5
                    border border-primary-400 hover:border-accent-400
                    min-w-[160px] text-center
                  `}
                >
                  View Menu
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Features Section */}
        <div className="w-full relative -mx-[50vw] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-black">
          <section className="w-full bg-black py-6 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
                <motion.article
                  whileHover={{ y: -5 }}
                  className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
                  role="listitem"
                >
                  <div className={`p-${isMobile ? '2' : '3'} text-center`}>
                    <div className="flex justify-center">
                      <Calendar className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-primary-300 ${isMobile ? 'mb-1' : 'mb-2'}`} aria-hidden="true" />
                    </div>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1`}>Easy Reservations</h3>
                    <p className={`text-gray-200 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>Book your perfect spot instantly.</p>
                  </div>
                </motion.article>

                <motion.article
                  whileHover={{ y: -5 }}
                  className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
                  role="listitem"
                >
                  <div className={`p-${isMobile ? '2' : '3'} text-center`}>
                    <div className="flex justify-center">
                      <Users className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-primary-300 ${isMobile ? 'mb-1' : 'mb-2'}`} aria-hidden="true" />
                    </div>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1`}>Loyalty Scheme</h3>
                    <p className={`text-gray-200 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>Unlock premium benefits & discounts.</p>
                  </div>
                </motion.article>

                <motion.article
                  whileHover={{ y: -5 }}
                  className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
                  role="listitem"
                >
                  <div className={`p-${isMobile ? '2' : '3'} text-center`}>
                    <div className="flex justify-center">
                      <Clock className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-primary-300 ${isMobile ? 'mb-1' : 'mb-2'}`} aria-hidden="true" />
                    </div>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1`}>Extended Hours</h3>
                    <p className={`text-gray-200 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>Open late for your convenience.</p>
                  </div>
                </motion.article>

                <motion.article
                  whileHover={{ y: -5 }}
                  className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
                  role="listitem"
                >
                  <div className={`p-${isMobile ? '2' : '3'} text-center`}>
                    <div className="flex justify-center">
                      <Star className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-primary-300 ${isMobile ? 'mb-1' : 'mb-2'}`} aria-hidden="true" />
                    </div>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1`}>Menu Choice</h3>
                    <p className={`text-gray-200 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>Premium flavours & blends.</p>
                  </div>
                </motion.article>
              </div>
            </div>
          </section>
        </div>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Featured Events */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner size="lg" color="accent" />}>
            <FeaturedEvents 
              titleClassName="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              buttonClassName="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            />
          </Suspense>
        </ErrorBoundary>

        {/* Special Offers */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner size="lg" color="accent" />}>
            <SpecialOffers />
          </Suspense>
        </ErrorBoundary>

        {/* Social Media */}
        <section className={`py-${isMobile ? '4' : '6'} bg-[#090909]`}>
          <div className={`container mx-auto ${isMobile ? 'px-3' : 'px-4'}`}>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-center ${isMobile ? 'mb-4' : 'mb-6'} bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400`}>
              Connect With Us
            </h2>
            <SocialShare />
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>
      <BackToTop />
    </>
  );
}

export default Home;