import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Users, Clock, Scroll } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedEvents from '../components/FeaturedEvents';
import SpecialOffers from '../components/SpecialOffers';
import ErrorBoundary from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { BackToTop } from '../components/ui/BackToTop';
import { Newsletter } from '../components/Newsletter';

function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="h-[65vh] relative bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
        role="img"
        aria-label="Luxurious lounge interior with ambient lighting"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-900" />
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center"
          >
            <div className="flex flex-col items-center mb-4">
              <img 
                src="/images/logo/Sapphire Lounge Circle Logo.png" 
                alt="Sapphire Lounge" 
                className="w-28 h-28 mb-3 object-contain"
              />
              <h1 className="text-5xl md:text-6xl font-bold mb-1.5 text-white">
                Sapphire Lounge
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 uppercase tracking-wider">
              Premium Shisha Experience
            </h2>
            <p className="text-lg mb-3 text-gray-200">
              Experience the finest flavours in an atmosphere of luxury and comfort. 
              Your journey to exceptional relaxation begins here.
            </p>
            <div className="flex gap-3 justify-center">
              <Link 
                to="/reservations"
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Now
              </Link>
              <Link
                to="/menu"
                className="bg-dark-800/50 backdrop-blur-sm border border-blue-500/20 px-6 py-2.5 rounded-full font-semibold hover:bg-dark-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black container mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-3 max-w-6xl mx-auto">
          <motion.article
            whileHover={{ y: -5 }}
            className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
          >
            <div className="p-3 text-center">
              <div className="flex justify-center">
                <Calendar className="w-8 h-8 text-primary-300 mb-2" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Easy Reservations</h3>
              <p className="text-gray-200 text-xs">Book your perfect spot instantly.</p>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -5 }}
            className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
          >
            <div className="p-3 text-center">
              <div className="flex justify-center">
                <Users className="w-8 h-8 text-primary-300 mb-2" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Loyalty Scheme</h3>
              <p className="text-gray-200 text-xs">Unlock premium benefits & discounts.</p>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -5 }}
            className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
          >
            <div className="p-3 text-center">
              <div className="flex justify-center">
                <Clock className="w-8 h-8 text-primary-300 mb-2" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Extended Hours</h3>
              <p className="text-gray-200 text-xs">Open late for your comfort.</p>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -5 }}
            className="bg-black/90 rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
          >
            <div className="p-3 text-center">
              <div className="flex justify-center">
                <Scroll className="w-8 h-8 text-primary-300 mb-2" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Menu Choice</h3>
              <p className="text-gray-200 text-xs">Signature flavours & blends.</p>
            </div>
          </motion.article>
        </div>
      </div>

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
          <SpecialOffers 
            titleClassName="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            buttonClassName="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          />
        </Suspense>
      </ErrorBoundary>

      <Newsletter />
      <BackToTop />
    </div>
  );
}

export default Home;