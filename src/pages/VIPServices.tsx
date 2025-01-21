import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Users, Calendar, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PackageType {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const VIPServices: React.FC = () => {
  const vipPackages: PackageType[] = [
    {
      title: "Premium VIP Experience",
      description: "Elevate your night with our signature VIP service package",
      features: [
        "Priority entry to the venue",
        "Reserved booth seating",
        "Dedicated VIP host",
        "Complimentary welcome mocktails"
      ],
      icon: <Crown className="w-8 h-8 text-primary-400" />
    },
    {
      title: "Group Celebration",
      description: "Perfect for larger groups celebrating special moments",
      features: [
        "Reserved section for your group",
        "Premium shisha packages",
        "Special group discounts",
        "Party decorations"
      ],
      icon: <Users className="w-8 h-8 text-primary-400" />
    }
  ];

  const specialOccasions: PackageType[] = [
    {
      title: "Birthday Celebration",
      description: "Make your birthday unforgettable at Sapphire Lounge",
      features: [
        "Complimentary birthday dessert",
        "Birthday decorations",
        "Priority booking",
        "Special 2 For 1 mocktails"
      ],
      icon: <Gift className="w-8 h-8 text-primary-400" />
    },
    {
      title: "Corporate Events",
      description: "Perfect for team gatherings and casual meetings",
      features: [
        "Reserved booth or regular seating",
        "Group shisha packages",
        "Complimentary mocktails",
        "Flexible booking times"
      ],
      icon: <Calendar className="w-8 h-8 text-primary-400" />
    }
  ];

  const PackageCard: React.FC<{ package: PackageType }> = ({ package: pkg }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-900/50 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg border border-accent-700/20 h-full"
    >
      <div className="flex items-center mb-4 md:mb-6">
        <div className="md:scale-125">
          {pkg.icon}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold ml-3 md:ml-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">{pkg.title}</h3>
      </div>
      <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">{pkg.description}</p>
      <ul className="space-y-2 md:space-y-3">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300 text-sm md:text-base">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-primary-400 mr-2 md:mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            VIP Services
          </h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto">
            Experience luxury and exclusivity with our premium services.
          </p>
        </motion.div>

        {/* VIP Packages */}
        <div className="mb-8 md:mb-12">
          <div className="text-center mb-8 md:mb-10 px-4 md:px-0">
            <h2 className="inline-block text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 pb-1">
              VIP Packages
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 max-w-4xl mx-auto">
            {vipPackages.map((pkg, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                key={index}
              >
                <PackageCard package={pkg} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Special Occasions */}
        <div>
          <div className="text-center mb-8 md:mb-10 px-4 md:px-0">
            <h2 className="inline-block text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 pb-1">
              Special Occasions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 max-w-4xl mx-auto">
            {specialOccasions.map((pkg, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                key={index}
              >
                <PackageCard package={pkg} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-dark-900/50 backdrop-blur-sm rounded-lg p-4 md:p-6 mx-auto mt-6 md:mt-10 border border-accent-700/20 max-w-[90%] md:max-w-xl"
        >
          <h3 className="text-xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 mb-2 md:mb-4">
            Ready to elevate your experience?
          </h3>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-lg">
            Contact us to customize your perfect package or make a reservation
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-primary-400 to-accent-500 py-2 px-6 md:py-3 md:px-10 rounded-lg font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg text-sm md:text-lg"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default VIPServices;
