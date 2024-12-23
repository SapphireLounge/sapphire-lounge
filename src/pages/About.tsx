import React from 'react';
import { motion } from 'framer-motion';

const swanseaImages = [
  {
    src: '/images/swansea/marina.jpg.webp',
    alt: 'Swansea Marina',
    title: 'Swansea Marina'
  },
  {
    src: '/images/swansea/bay.jpg.jpg',
    alt: 'Swansea Bay',
    title: 'Beautiful Swansea Bay'
  },
  {
    src: '/images/swansea/wind-street.jpg.webp',
    alt: 'Wind Street',
    title: 'Vibrant Wind Street'
  },
  {
    src: '/images/swansea/mumbles.jpg.jpg',
    alt: 'Mumbles Pier',
    title: 'Historic Mumbles Pier'
  },
  {
    src: '/images/swansea/castle-square.jpg.webp',
    alt: 'Castle Square',
    title: 'Castle Square'
  },
  {
    src: '/images/swansea/swansea-arena.jpg.jpg',
    alt: 'Swansea Arena',
    title: 'Modern Swansea Arena'
  }
];

function About() {
  return (
    <div className="min-h-screen bg-[#020B18] pt-20 pb-10">
      <div style={{ width: '1200px' }} className="mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-1.5 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 leading-normal pb-1">
            About Sapphire Lounge
          </h1>
          <p className="text-gray-300 w-[600px] mx-auto text-base mb-4">
            Your premier destination for an authentic and refined shisha experience in Swansea
          </p>
        </motion.div>

        {/* Swansea Images Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-primary-400 mb-4 text-center">Our Beautiful City</h2>
          <div style={{ width: '1000px' }} className="mx-auto grid grid-cols-3 gap-4">
            {swanseaImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group overflow-hidden rounded-lg h-80 w-[300px]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 object-[50%_85%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">{image.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div style={{ width: '1000px' }} className="mx-auto grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-lg font-semibold text-primary-400 mb-2">Our Story</h2>
            <p className="text-gray-300 text-[15px] mb-2">
              Nestled in the heart of Swansea, South Wales, Sapphire Lounge emerged from a vision to create 
              a sophisticated space where traditional shisha culture meets modern luxury. Our establishment 
              brings together the timeless art of shisha with contemporary comfort and style.
            </p>
            <p className="text-gray-300 text-[15px]">
              We've carefully crafted an atmosphere that honors the social and cultural heritage of shisha, 
              while providing a sleek, modern setting for our guests to unwind and connect. Located in vibrant
              Swansea, we're proud to be part of this dynamic city's diverse cultural landscape.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-lg font-semibold text-primary-400 mb-2">Shisha Culture & Heritage</h2>
            <p className="text-gray-300 text-[15px] mb-2">
              Shisha, also known as hookah, has been a cornerstone of social gatherings for centuries, 
              originating in the ancient Persian Empire. This tradition has evolved into a sophisticated 
              art form, bringing people together to share conversations and create memories.
            </p>
            <p className="text-gray-300 text-[15px]">
              At Sapphire Lounge, we maintain this rich cultural heritage while adapting it for today's 
              lifestyle. Our expert staff are well-versed in shisha preparation techniques, ensuring an 
              authentic and enjoyable experience for both newcomers and connoisseurs alike.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-lg font-semibold text-primary-400 mb-2">Our Health-Conscious Approach</h2>
            <p className="text-gray-300 text-[15px] mb-2">
              We're proud to pioneer a healthier approach to shisha enjoyment. Our commitment to your 
              well-being is reflected in our exclusive use of non-tobacco and nicotine-free flavours, 
              allowing you to experience the pleasure of shisha without the traditional health concerns.
            </p>
            <p className="text-gray-300 text-[15px]">
              Our premium herbal alternatives are carefully selected to provide the same rich flavours 
              and satisfying experience you expect, while being a more health-conscious choice. We also 
              maintain strict hygiene standards and use individual disposable mouthpieces as well as pipes for every session.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-lg font-semibold text-primary-400 mb-2">The Sapphire Experience</h2>
            <p className="text-gray-300 text-[15px] mb-2">
              At Sapphire Lounge, we've created more than just a shisha venue – we've crafted an 
              experience. From our carefully curated playlist to our ambient lighting and comfortable 
              seating, every detail has been considered to enhance your visit.
            </p>
            <p className="text-gray-300 text-[15px]">
              Our friendly staff are dedicated to providing exceptional service, ensuring your time with 
              us is memorable. Whether you're celebrating a special occasion or simply seeking a relaxing 
              evening out, Sapphire Lounge offers the perfect setting.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
