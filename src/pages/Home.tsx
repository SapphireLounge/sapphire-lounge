import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedEvents from '../components/FeaturedEvents';
import SpecialOffers from '../components/SpecialOffers';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { BackToTop } from '../components/ui/BackToTop';
import { Newsletter } from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import { SEO } from '../components/SEO';
import { SkipToContent } from '../components/ui/SkipToContent';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import SocialShare from '../components/SocialShare';
import { haptics } from '../utils/haptics';

function Home() {
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [blurComplete, setBlurComplete] = useState(false);
  const heroImageUrl = "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
  const blurImageUrl = "https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=20"; // Slightly larger blur image for better quality

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useKeyboardNav({
    onArrowDown: () => {
      const currentSection = parseInt(document.querySelector('[data-section]:target')?.getAttribute('data-section') || '0');
      const nextSection = Math.min(currentSection + 1, 4);
      scrollToSection(nextSection.toString());
    },
    onArrowUp: () => {
      const currentSection = parseInt(document.querySelector('[data-section]:target')?.getAttribute('data-section') || '0');
      const prevSection = Math.max(currentSection - 1, 0);
      scrollToSection(prevSection.toString());
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

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => {
      document.head.removeChild(link);
    };
  }, [heroImageUrl]);

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
        <div 
          className="relative h-[80vh] flex items-center justify-center text-center py-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("${bgImageLoaded ? heroImageUrl : blurImageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 0%',
            backgroundColor: '#020B18',
            filter: blurComplete ? 'none' : 'blur(5px)',
            transition: 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          role="banner"
          aria-label="Luxurious lounge interior with ambient lighting"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400 text-center mx-auto"
              style={{ maxWidth: "fit-content" }}
            >
              Sapphire Lounge
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto text-center"
            >
              Premium Shisha Experience | Sapphire Membership Club
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center gap-4 mt-16"
            >
              <Link
                to="/reservations"
                onClick={() => haptics.light()}
                className="w-32 py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium 
                hover:from-primary-600 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 
                focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 transform hover:scale-[1.02] text-center"
              >
                Book Now
              </Link>
              <Link
                to="/menu"
                onClick={() => haptics.light()}
                className="w-32 py-3 px-4 bg-black/30 text-white border border-white/20 rounded-lg font-medium 
                hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/20 
                focus:ring-offset-2 focus:ring-offset-gray-900 backdrop-blur-sm transition duration-200 transform hover:scale-[1.02] text-center"
              >
                View Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <section data-section="1" className="bg-black container mx-auto px-4 sm:px-8 py-6" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Our Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-gray-700/50 shadow-lg"
              role="listitem"
            >
              <div className="p-4 sm:p-5 text-center">
                <div className="flex justify-center">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Easy Reservations</h3>
                <p className="text-gray-200 text-xs sm:text-sm">Book your perfect spot instantly.</p>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-gray-700/50 shadow-lg"
              role="listitem"
            >
              <div className="p-4 sm:p-5 text-center">
                <div className="flex justify-center">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Loyalty Scheme</h3>
                <p className="text-gray-200 text-xs sm:text-sm">Unlock premium benefits & discounts.</p>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-gray-700/50 shadow-lg"
              role="listitem"
            >
              <div className="p-4 sm:p-5 text-center">
                <div className="flex justify-center">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Extended Hours</h3>
                <p className="text-gray-200 text-xs sm:text-sm">Open late for your convenience.</p>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ y: -5 }}
              className="bg-black/90 rounded-lg overflow-hidden border border-gray-700/50 shadow-lg"
              role="listitem"
            >
              <div className="p-4 sm:p-5 text-center">
                <div className="flex justify-center">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-primary-300 mb-2" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-1">Menu Choice</h3>
                <p className="text-gray-200 text-xs sm:text-sm">Premium flavours & blends.</p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Featured Events */}
        <Suspense fallback={<LoadingSpinner size="lg" color="accent" />}>
          <FeaturedEvents 
            titleClassName="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            buttonClassName="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          />
        </Suspense>

        {/* Special Offers */}
        <Suspense fallback={<LoadingSpinner size="lg" color="accent" />}>
          <SpecialOffers />
        </Suspense>

        {/* Social Media */}
        <section className="py-6 relative">
          <div className="absolute inset-0 bg-[#020B18]" />
          <div className="container mx-auto px-4 relative">
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