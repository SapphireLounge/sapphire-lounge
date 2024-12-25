import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Gift, Calendar } from 'lucide-react';

interface Feature {
  text: string;
}

interface Package {
  title: string;
  icon: React.ElementType;
  description: string;
  features: Feature[];
}

function SpecialOccasions() {
  const vipPackages: Package[] = [
    {
      title: "Premium VIP Experience",
      icon: Crown,
      description: "Elevate your night with our signature VIP service package",
      features: [
        { text: "Priority entry to the venue" },
        { text: "Reserved booth seating" },
        { text: "Dedicated VIP host" },
        { text: "Complimentary welcome mocktails" }
      ]
    },
    {
      title: "Group Celebration",
      icon: Users,
      description: "Perfect for larger groups celebrating special moments",
      features: [
        { text: "Reserved section for your group" },
        { text: "Premium shisha packages" },
        { text: "Special group discounts" },
        { text: "Party decorations" }
      ]
    }
  ];

  const specialOccasions: Package[] = [
    {
      title: "Birthday Celebration",
      icon: Gift,
      description: "Make your birthday unforgettable at Sapphire Lounge",
      features: [
        { text: "Complimentary birthday dessert" },
        { text: "Birthday decorations" },
        { text: "Priority booking" },
        { text: "Special 2 For 1 mocktails" }
      ]
    },
    {
      title: "Corporate Events",
      icon: Calendar,
      description: "Perfect for team gatherings and casual meetings",
      features: [
        { text: "Reserved booth or regular seating" },
        { text: "Group shisha packages" },
        { text: "Complimentary mocktails" },
        { text: "Flexible booking times" }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            VIP Services & Special Occasions
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Experience luxury and exclusivity with our premium VIP services and special occasion packages
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* VIP Packages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">VIP Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {vipPackages.map((pkg, index) => (
                <div 
                  key={pkg.title}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group overflow-hidden"
                >
                  <pkg.icon className="w-8 h-8 text-primary-300 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{pkg.title}</h3>
                  <p className="text-gray-400 mb-6">{pkg.description}</p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-primary-300">★</span>
                        <span className="text-gray-300">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Special Occasions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">Special Occasions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialOccasions.map((occasion, index) => (
                <div 
                  key={occasion.title}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group overflow-hidden"
                >
                  <occasion.icon className="w-8 h-8 text-primary-300 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{occasion.title}</h3>
                  <p className="text-gray-400 mb-6">{occasion.description}</p>
                  <ul className="space-y-3">
                    {occasion.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-primary-300">★</span>
                        <span className="text-gray-300">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">Ready to elevate your experience?</h2>
            <p className="text-gray-400 mb-8">Contact us to customize your perfect package or make a reservation</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-primary-400 to-accent-500 px-8 py-3 rounded-lg font-semibold 
                       hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOccasions;
