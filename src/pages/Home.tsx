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
import SocialShare from '../components/SocialShare';

function Home() {
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [blurComplete, setBlurComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const heroImageUrl = "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
  const blurImageUrl = "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=20"; // Slightly larger blur image for better quality

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
      fullImg.src = heroImageUrl;
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
    link.href = heroImageUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [heroImageUrl, blurImageUrl]);

  return (
    <>
      <SEO 
        title="Premium Shisha Experience"
        description="Experience the finest flavours in an atmosphere of luxury and comfort at Sapphire Lounge. Your journey to exceptional relaxation starts here."
        keywords={['shisha lounge', 'premium shisha', 'hookah bar', 'luxury lounge', 'sapphire lounge', 'events', 'special offers']}
      />
      <SkipToContent contentId="main-content" />
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <motion.section
          data-section="0"
          className="h-[55vh] relative bg-cover bg-center flex items-center justify-center pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("${bgImageLoaded ? heroImageUrl : blurImageUrl}")`,
            backgroundColor: '#020B18',
            filter: blurComplete ? 'none' : 'blur(5px)',
            transition: 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: blurComplete ? 'scale(1)' : 'scale(1.05)'
          }}
          role="banner"
          aria-label="Luxurious lounge interior with ambient lighting"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-900" />
          <div className="container mx-auto px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center mt-6"
            >
              <div className="flex flex-col items-center mb-6">
                <OptimizedImage 
                  src="/images/logo/Sapphire Lounge Circle Logo.png" 
                  alt="Sapphire Lounge" 
                  className="w-24 h-24 mb-4 object-contain"
                />
                <h1 className="text-5xl md:text-6xl font-bold mb-0 text-white">
                  Sapphire Lounge
                </h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold -mt-3 mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 uppercase tracking-wider">
                Premium Shisha Experience
              </h2>
              <div className="text-sm mt-0.5 mb-4 text-gray-200 max-w-3xl mx-auto">
                <p>Experience the finest flavours in an atmosphere of luxury and comfort.</p>
                <p>Your journey to exceptional relaxation starts here.</p>
              </div>
              <div className="flex gap-8 justify-center items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/reservations"
                    className="bg-gradient-to-r from-primary-400 to-accent-500 py-3 px-8 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg"
                  >
                    Book Now
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/menu"
                    className="inline-flex px-6 py-3 bg-dark-800/50 backdrop-blur-sm border border-primary-400/20 text-white rounded-lg font-medium hover:bg-dark-700/50 hover:border-primary-400/40 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-900 transition-all duration-300"
                  >
                    View Menu
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section data-section="1" className="bg-black container mx-auto px-8 py-6" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Our Features</h2>
          <div className="grid grid-cols-4 gap-3 max-w-6xl mx-auto">
            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
              role="listitem"
            >
              <div className="p-3 text-center">
                <div className="flex justify-center">
                  <Calendar className="w-8 h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Easy Reservations</h3>
                <p className="text-gray-200 text-xs">Book your perfect spot instantly.</p>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
              role="listitem"
            >
              <div className="p-3 text-center">
                <div className="flex justify-center">
                  <Users className="w-8 h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Loyalty Scheme</h3>
                <p className="text-gray-200 text-xs">Unlock premium benefits & discounts.</p>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
              role="listitem"
            >
              <div className="p-3 text-center">
                <div className="flex justify-center">
                  <Clock className="w-8 h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Extended Hours</h3>
                <p className="text-gray-200 text-xs">Open late for your convenience.</p>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
              role="listitem"
            >
              <div className="p-3 text-center">
                <div className="flex justify-center">
                  <Star className="w-8 h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Menu Choice</h3>
                <p className="text-gray-200 text-xs">Premium flavours & blends.</p>
              </div>
            </motion.article>
          </div>
        </section>

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
        <section className="py-6 bg-[#090909]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
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