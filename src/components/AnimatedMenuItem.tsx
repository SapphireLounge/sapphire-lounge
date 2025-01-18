import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMenuItemProps {
  name: string;
  price?: string;
  description?: string;
  ingredients?: string;
  className?: string;
}

export const AnimatedMenuItem: React.FC<AnimatedMenuItemProps> = ({
  name,
  price,
  description,
  ingredients,
  className
}) => {
  return (
    <motion.div
      className={`relative p-4 rounded-lg bg-dark-800/20 ${className || ''}`}
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <div>
            <h3 className="text-white font-medium mb-1">{name}</h3>
            {description && (
              <p className="text-gray-400 text-sm mb-1">{description}</p>
            )}
            {ingredients && (
              <p className="text-gray-500 text-xs">{ingredients}</p>
            )}
          </div>
        </div>
        {price && (
          <span className="text-primary-300 font-medium whitespace-nowrap ml-4">
            {price}
          </span>
        )}
      </div>
    </motion.div>
  );
};
