import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen bg-[#020B18] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 leading-normal pb-1">
            About Sapphire Lounge
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
            Your premier destination for an authentic and refined shisha experience in Swansea
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800/50 rounded-xl p-6 border border-dark-700/50"
          >
            <h2 className="text-2xl font-semibold text-primary-400 mb-4">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Nestled in the heart of Swansea, South Wales, Sapphire Lounge emerged from a vision to create 
              a sophisticated space where traditional shisha culture meets modern luxury. Our establishment 
              brings together the timeless art of shisha with contemporary comfort and style.
            </p>
            <p className="text-gray-300">
              We've carefully crafted an atmosphere that honors the social and cultural heritage of shisha, 
              while providing a sleek, modern setting for our guests to unwind and connect. Located in vibrant
              Swansea, we're proud to be part of this dynamic city's diverse cultural landscape.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-800/50 rounded-xl p-6 border border-dark-700/50"
          >
            <h2 className="text-2xl font-semibold text-primary-400 mb-4">Shisha Culture & Heritage</h2>
            <p className="text-gray-300 mb-4">
              Shisha, also known as hookah, has been a cornerstone of social gatherings for centuries, 
              originating in the ancient Persian Empire. This tradition has evolved into a sophisticated 
              art form, bringing people together to share conversations and create memories.
            </p>
            <p className="text-gray-300">
              At Sapphire Lounge, we maintain this rich cultural heritage while adapting it for today's 
              lifestyle. Our expert staff are well-versed in shisha preparation techniques, ensuring an 
              authentic and enjoyable experience for both newcomers and connoisseurs alike.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-800/50 rounded-xl p-6 border border-dark-700/50"
          >
            <h2 className="text-2xl font-semibold text-primary-400 mb-4">Our Health-Conscious Approach</h2>
            <p className="text-gray-300 mb-4">
              We're proud to pioneer a healthier approach to shisha enjoyment. Our commitment to your 
              well-being is reflected in our exclusive use of non-tobacco and nicotine-free flavours, 
              allowing you to experience the pleasure of shisha without the traditional health concerns.
            </p>
            <p className="text-gray-300">
              Our premium herbal alternatives are carefully selected to provide the same rich flavours 
              and satisfying experience you expect, while being a more health-conscious choice. We also 
              maintain strict hygiene standards and use individual disposable mouthpieces as well as pipes for every session.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-800/50 rounded-xl p-6 border border-dark-700/50"
          >
            <h2 className="text-2xl font-semibold text-primary-400 mb-4">The Sapphire Experience</h2>
            <p className="text-gray-300 mb-4">
              At Sapphire Lounge, we've created more than just a shisha venue – we've crafted an 
              experience. From our carefully curated playlist to our ambient lighting and comfortable 
              seating, every detail has been considered to enhance your visit.
            </p>
            <p className="text-gray-300">
              Our diverse menu of premium flavours, expert staff, and dedication to exceptional service 
              ensures that whether you're a regular guest or first-time visitor, you'll find yourself 
              immersed in an atmosphere of warmth and sophistication that keeps you coming back.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
