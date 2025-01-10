import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';

const testimonials = [
  {
    text: "The best shisha lounge in Swansea! The non-tobacco options are amazing, and the atmosphere is perfect for a relaxing evening.",
    author: "Sarah J.",
    role: "Regular Customer"
  },
  {
    text: "Love the premium membership perks! The staff really know their flavours and always make great recommendations.",
    author: "Michael R.",
    role: "Gold Member"
  },
  {
    text: "Such a sophisticated venue with amazing vibes. Their health-conscious approach to shisha is exactly what I was looking for.",
    author: "Emma W.",
    role: "First-time Visitor"
  },
  {
    text: "The perfect spot for our friend group. Great music, comfortable seating, and excellent service every time we visit.",
    author: "David L.",
    role: "Regular Customer"
  },
  {
    text: "Sapphire Lounge sets the standard for premium shisha experiences. The flavour selection is unmatched!",
    author: "James K.",
    role: "Sapphire Member"
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Desktop uses longer interval for testimonial rotation
  const rotationInterval = isMobile ? 8000 : 10000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [rotationInterval]);

  return (
    <div className="py-8 bg-[#090909]">
      <div className={`container mx-auto ${isMobile ? 'px-4' : 'px-8'}`}>
        <div className="text-center mb-8">
          <h2 className={`font-bold mb-1.5 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 leading-normal pb-1 ${
            isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
          }`}>
            What Our Guests Say
          </h2>
          <p className={`text-gray-300 max-w-2xl mx-auto ${
            isMobile ? 'text-[10px]' : 'text-xs'
          }`}>
            Hear from our valued customers about their experience at Sapphire Lounge
          </p>
        </div>

        <div className={`max-w-3xl mx-auto relative ${
          isMobile ? 'h-[145px]' : 'h-[180px]'
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.5,
                ease: isMobile ? 'easeOut' : 'easeInOut'
              }}
              className="absolute w-full"
            >
              <div className={`bg-[#0A0A0C] rounded-lg border border-[#1A1A1C] text-center relative shadow-xl ${
                isMobile ? 'p-4' : 'p-5'
              }`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={`bg-gradient-to-r from-primary-500 to-accent-500 rounded-full ${
                    isMobile ? 'p-1.5' : 'p-2'
                  }`}>
                    <Quote className={`text-white ${
                      isMobile ? 'w-3 h-3' : 'w-4 h-4'
                    }`} />
                  </div>
                </div>
                
                <p className={`text-gray-300/90 mb-3 mt-2 italic ${
                  isMobile ? 'text-xs leading-relaxed' : 'text-sm'
                }`}>
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div>
                  <p className={`text-gray-200 font-semibold ${
                    isMobile ? 'text-[11px]' : 'text-xs'
                  }`}>
                    {testimonials[currentIndex].author}
                  </p>
                  <p className={`text-primary-400/90 ${
                    isMobile ? 'text-[9px]' : 'text-[10px]'
                  }`}>
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={`absolute ${isMobile ? '-bottom-6' : '-bottom-1'} left-0 right-0 flex justify-center space-x-1.5`}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500/90'
                    : 'bg-[#1A1A1C] hover:bg-[#222224]'
                } ${
                  isMobile 
                    ? 'w-1 h-1' 
                    : 'w-1.5 h-1.5'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
