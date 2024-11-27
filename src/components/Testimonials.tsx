import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10 second interval

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-12 bg-[#090909]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 leading-normal pb-1">
            What Our Guests Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            Hear from our valued customers about their experience at Sapphire Lounge
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <div className="bg-[#0A0A0C] rounded-lg p-6 border border-[#1A1A1C] text-center relative shadow-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-full p-2.5">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <p className="text-gray-300/90 text-base mb-4 mt-3 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div>
                  <p className="text-gray-200 font-semibold text-sm">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-primary-400/90 text-xs">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-1.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500/90'
                    : 'bg-[#1A1A1C] hover:bg-[#222224]'
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
