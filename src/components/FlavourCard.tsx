import React from 'react';
import { motion } from 'framer-motion';

interface FlavourCardProps {
  name: string;
  description: string;
  image: string;
  strength: 'Light' | 'Medium' | 'Strong';
  price: string;
}

export function FlavourCard({ name, description, image, strength, price }: FlavourCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-dark-500 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            strength === 'Light' ? 'bg-green-500/80' :
            strength === 'Medium' ? 'bg-yellow-500/80' :
            'bg-red-500/80'
          } text-white backdrop-blur-sm`}>
            {strength}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-primary-300">{name}</h3>
          <span className="text-lg font-semibold text-accent-400">{price}</span>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
