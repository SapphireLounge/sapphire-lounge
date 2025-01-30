import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronDown } from 'lucide-react';
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
  const [buttonText, setButtonText] = useState('Submit Feedback');
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    // Change button text after a delay
    setTimeout(() => {
        setButtonText('Feedback Submitted!');
        form.reset();
    }, 500);
  };

  return (
    <div className="py-8 bg-[#090909]">
      <div className={`container mx-auto ${isMobile ? 'px-4' : 'px-8 pb-8'}`}>
        <div className="text-center mb-8">
          <h2 className={`font-bold mb-1.5 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 leading-normal pb-1 ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}>
            What Our Guests Say
          </h2>
          <p className={`text-gray-300 max-w-2xl mx-auto ${
            isMobile ? 'text-sm mb-12' : 'text-lg mb-12'
          }`}>
            Hear from our valued customers and share your own experience
          </p>
        </div>

        <div className={`${isMobile ? '' : 'flex gap-12 items-stretch'}`}>
          {/* Testimonials Section */}
          <div className={`${isMobile ? 'mb-8' : 'flex-1'}`}>
            <div className={`relative ${
              isMobile ? 'h-[250px]' : 'h-[350px]'
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
                  className="absolute w-full h-full"
                >
                  <div className={`bg-[#0A0A0C] rounded-lg border border-[#1A1A1C] text-center relative shadow-xl h-full flex flex-col justify-center ${
                    isMobile ? 'p-4 pb-12' : 'p-6'
                  }`}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className={`bg-gradient-to-r from-primary-500 to-accent-500 rounded-full ${
                        isMobile ? 'p-3' : 'p-4'
                      }`}>
                        <Quote className={`text-white ${
                          isMobile ? 'w-6 h-6' : 'w-7 h-7'
                        }`} />
                      </div>
                    </div>
                    
                    <p className={`text-gray-200 mb-6 text-center ${
                      isMobile ? 'text-base mt-10 pt-4' : 'text-2xl leading-relaxed'
                    }`}>
                      "{testimonials[currentIndex].text}"  
                    </p>
                    
                    <div className="text-center">
                      <p className={`${
                        isMobile ? 'text-lg font-semibold' : 'text-2xl font-semibold'
                      }`}>
                        {testimonials[currentIndex].author}
                      </p>
                      <p className={`${
                        isMobile ? 'text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500' : 'text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500'
                      }`}>
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                    <div className={`flex justify-center ${isMobile ? 'mt-8 mb-2' : 'mt-10'}`}>
                      {testimonials.map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full mx-1 ${
                          index === currentIndex ? 'bg-primary-500' : 'bg-gray-400'
                        }`} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Feedback Form Section */}
          <div className={`${isMobile ? 'mt-12 -mx-4 flex justify-center' : 'flex-1'}`}>
            <div className={`bg-[#0A0A0C] rounded-lg border border-[#1A1A1C] relative shadow-xl ${
              isMobile ? 'p-4 w-[98vw]' : 'h-[350px] p-6'
            }`}>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col h-full">
                  <div className="space-y-5">
                    <h3 className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 ${
                      isMobile ? 'text-xl' : 'text-2xl'
                    }`}>
                      Share Your Experience
                    </h3>

                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      placeholder="Your Name" 
                      required 
                      autoComplete="name"
                      className={`w-full bg-[#1A1A1C] rounded-lg px-4 ${
                        isMobile ? 'py-2.5' : 'py-2'
                      } text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                    />

                    <div className="relative">
                      <select 
                        id="memberType" 
                        name="memberType" 
                        required 
                        defaultValue=""
                        autoComplete="off"
                        className={`w-full bg-[#1A1A1C] rounded-lg px-4 ${
                          isMobile ? 'py-2.5' : 'py-2'
                        } text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 appearance-none`}
                      >
                        <option value="" disabled>Member Type</option>
                        <option value="first" className="text-white">First-Time Visitor</option>
                        <option value="regular" className="text-white">Regular Member</option>
                        <option value="gold" className="text-white">Gold Member</option>
                        <option value="sapphire" className="text-white">Sapphire Member</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <textarea 
                      id="experience" 
                      name="experience" 
                      placeholder="Share your experience with us..." 
                      required 
                      rows={2}
                      autoComplete="off"
                      className={`w-full bg-[#1A1A1C] rounded-lg px-4 ${
                        isMobile ? 'py-2.5' : 'py-2'
                      } text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none`}
                    />
                  </div>

                  <div className="mt-5">
                    <button 
                      type="submit" 
                      className={`w-full rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-primary-600 hover:to-accent-600 text-center ${
                        isMobile ? 'py-2.5 text-base' : 'py-2 text-base'
                      }`}
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
