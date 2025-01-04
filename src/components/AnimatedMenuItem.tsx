import React from 'react';
import { motion } from 'framer-motion';
import { useHaptics } from '../hooks/useHaptics';

interface AnimatedMenuItemProps {
  name: string;
  price?: string;
  description?: string;
  ingredients?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const AnimatedMenuItem: React.FC<AnimatedMenuItemProps> = ({
  name,
  price,
  description,
  ingredients,
  onClick,
  isSelected
}) => {
  const { triggerHaptic } = useHaptics();

  const handleClick = () => {
    if (onClick) onClick();
    triggerHaptic();
  };

  return (
    <motion.div
      className={`relative p-4 rounded-lg cursor-pointer ${
        isSelected ? 'bg-primary-900/20' : 'bg-dark-800/20'
      }`}
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{
        backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 0, 0, 0)',
      }}
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
          <span className="text-primary-300 font-medium whitespace-nowrap">
            {price}
          </span>
        )}
      </div>
    </motion.div>
  );
};
