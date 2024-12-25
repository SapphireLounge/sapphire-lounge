import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const landmarks = [
  {
    src: '/images/swansea/marina.jpg.webp',
    alt: 'Swansea Marina',
    title: 'Swansea Marina',
    description: 'Modern waterfront development featuring the Meridian Tower, Wales\' tallest building'
  },
  {
    src: '/images/swansea/swansea-arena.jpg.jpg',
    alt: 'Swansea Arena',
    title: 'Swansea Arena',
    description: 'State-of-the-art entertainment venue with stunning coastal views'
  },
  {
    src: '/images/swansea/wind-street.jpg.webp',
    alt: 'Wind Street',
    title: 'Wind Street',
    description: 'Swansea\'s vibrant entertainment district'
  },
  {
    src: '/images/swansea/bay.jpg.jpg',
    alt: 'Swansea Bay',
    title: 'Swansea Bay',
    description: '5-mile stretch of golden sandy beach'
  },
  {
    src: '/images/swansea/mumbles.jpg.jpg',
    alt: 'Mumbles Pier',
    title: 'Mumbles Pier',
    description: 'Historic Victorian pier with stunning bay views'
  },
  {
    src: '/images/swansea/castle-square.jpg.webp',
    alt: 'Castle Square',
    title: 'Castle Square',
    description: 'Historic heart of the city with modern amenities'
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020B18] text-white">
      <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] opacity-20 bg-repeat"></div>
      
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            About Sapphire Lounge
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Located in the heart of Swansea, Sapphire Lounge offers an unparalleled
            shisha experience in a luxurious setting.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Our Story */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-400">
              <p>
                Nestled in the heart of Swansea, South Wales, Sapphire Lounge emerged from a vision to create a sophisticated space where traditional shisha culture meets modern luxury. Our establishment brings together the timeless art of shisha with contemporary comfort and style.
              </p>
              <p>
                We've carefully crafted an atmosphere that honors the social and cultural heritage of shisha, while providing a sleek, modern setting for our guests to unwind and connect. Located in vibrant Swansea, we're proud to be part of this dynamic city's diverse cultural landscape.
              </p>
            </div>
          </div>

          {/* Shisha Culture & Heritage */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
              Shisha Culture & Heritage
            </h2>
            <div className="space-y-4 text-gray-400">
              <p>
                Shisha, also known as hookah, has been a cornerstone of social gatherings for centuries, originating in the ancient Persian Empire. This tradition has evolved into a sophisticated art form, bringing people together to share conversations and create memories.
              </p>
              <p>
                At Sapphire Lounge, we maintain this rich cultural heritage while adapting it for today's lifestyle. Our expert staff are well-versed in shisha preparation techniques, ensuring an authentic and enjoyable experience for both newcomers and connoisseurs alike.
              </p>
            </div>
          </div>

          {/* Our Health-Conscious Approach */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
              Our Health-Conscious Approach
            </h2>
            <div className="space-y-4 text-gray-400">
              <p>
                We're proud to pioneer a healthier approach to shisha enjoyment. Our commitment to your well-being is reflected in our exclusive use of non-tobacco and nicotine-free flavours, allowing you to experience the pleasure of shisha without the traditional health concerns.
              </p>
              <p>
                Our premium herbal alternatives are carefully selected to provide the same rich flavours and satisfying experience you expect, while being a more health-conscious choice. We also maintain strict hygiene standards and use individual disposable mouthpieces as well as pipes for every session.
              </p>
            </div>
          </div>

          {/* The Sapphire Experience */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
              The Sapphire Experience
            </h2>
            <div className="space-y-4 text-gray-400">
              <p>
                At Sapphire Lounge, we've created more than just a shisha venue – we've crafted an experience. From our carefully curated playlist to our ambient lighting and comfortable seating, every detail has been considered to enhance your visit.
              </p>
              <p>
                Our friendly staff are dedicated to providing exceptional service, ensuring your time with us is memorable. Whether you're celebrating a special occasion or simply seeking a relaxing evening out, Sapphire Lounge offers the perfect setting.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-primary-400" />
            <h2 className="text-2xl font-bold text-white">Our Location</h2>
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Situated in one of Wales' most vibrant cities, we're surrounded by iconic landmarks and attractions.
            Our prime location makes us easily accessible while offering a perfect vantage point to experience
            the city's rich culture and nightlife.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landmarks.map((landmark, index) => (
            <motion.div
              key={landmark.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary-400/50 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 relative group">
                <img
                  src={landmark.src}
                  alt={landmark.alt}
                  className={`object-cover w-full h-full ${
                    landmark.title === 'Swansea Marina' || landmark.title === 'Swansea Bay'
                    ? 'brightness-110 contrast-105 saturate-105'
                    : 'brightness-125 contrast-105 saturate-105'
                  } ${
                    landmark.title === 'Swansea Marina' ? 'object-[center_25%]' : ''
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {landmark.title}
                </h3>
                <p className="text-gray-400">{landmark.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
