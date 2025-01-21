import { motion } from 'framer-motion';

const swanseaImages = [
  {
    src: '/images/swansea/marina.jpg.webp',
    alt: 'Swansea Marina',
    title: 'Swansea Marina',
    objectPosition: 'center 20%'  // Adjusted position to show more of the Meridian Tower
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
    <div className="min-h-screen pt-24 pb-8 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 px-4 py-2">
            About Sapphire Lounge
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto">
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
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-400 mb-4 text-center">Our Beautiful City</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
            {swanseaImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group overflow-hidden rounded-lg h-56 md:h-72"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ${
                    image.objectPosition ? '' : 'object-[50%_85%]'
                  }`}
                  style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-base md:text-lg font-medium">{image.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1400px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-primary-400 mb-2">Our Story</h2>
            <p className="text-gray-300 text-base md:text-lg mb-3">
              Nestled in the heart of Swansea, South Wales, Sapphire Lounge emerged from a vision to create 
              a sophisticated space where traditional shisha culture meets modern luxury. Our establishment 
              brings together the timeless art of shisha with contemporary comfort and style.
            </p>
            <p className="text-gray-300 text-base md:text-lg">
              We've carefully crafted an atmosphere that honors the social and cultural heritage of shisha, 
              while providing a sleek, modern setting for our guests to unwind and connect.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-primary-400 mb-2">Shisha Culture & Heritage</h2>
            <p className="text-gray-300 text-base md:text-lg mb-3">
              Shisha, also known as hookah, has been a cornerstone of social gatherings for centuries, 
              originating in the ancient Persian Empire. This tradition has evolved into a sophisticated 
              art form, bringing people together to share conversations and create memories.
            </p>
            <p className="text-gray-300 text-base md:text-lg">
              At Sapphire Lounge, we maintain this rich cultural heritage while adapting it for today's 
              lifestyle. Our friendly & expert staff are on hand to ensure that our customers have that 
              authentic experience whether they're newcomers or connoisseurs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-primary-400 mb-2">Our Health-Conscious Approach</h2>
            <p className="text-gray-300 text-base md:text-lg mb-3">
              We're proud to pioneer a healthier approach to shisha enjoyment. Our commitment to your 
              well-being is reflected in our exclusive use of non-tobacco and nicotine-free flavours, 
              allowing you to experience the pleasure of shisha without the traditional health concerns.
            </p>
            <p className="text-gray-300 text-base md:text-lg">
              Our premium herbal alternatives provide rich flavours while being a more health-conscious choice, 
              with strict hygiene standards including individual disposable mouthpieces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-primary-400 mb-2">The Sapphire Experience</h2>
            <p className="text-gray-300 text-base md:text-lg mb-3">
              At Sapphire Lounge, we've created more than just a shisha venue – we've crafted an 
              experience. From our curated playlist to our ambient lighting and comfortable 
              seating, every detail has been considered to enhance your visit.
            </p>
            <p className="text-gray-300 text-base md:text-lg">
              Our friendly staff ensure your time with us is memorable. Whether you're celebrating 
              or seeking a relaxing evening, Sapphire Lounge offers the perfect setting.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
