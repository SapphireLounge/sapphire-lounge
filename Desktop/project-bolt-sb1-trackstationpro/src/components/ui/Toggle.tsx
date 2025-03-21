import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = ''
}: ToggleProps) {
  const id = React.useId();
  const { theme } = useAppContext();
  const isDarkMode = theme === 'dark';
  
  const sizeClasses = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'h-3 w-3 translate-x-0.5 peer-checked:translate-x-4'
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'h-5 w-5 translate-x-0.5 peer-checked:translate-x-5'
    },
    lg: {
      toggle: 'w-14 h-7',
      circle: 'h-6 w-6 translate-x-0.5 peer-checked:translate-x-7'
    }
  };
  
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };
  
  // Dynamic classes based on theme
  const labelTextClass = isDarkMode ? 'text-gray-200' : 'text-gray-700';
  const descriptionTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const toggleBgClass = isDarkMode ? 'bg-gray-600' : 'bg-gray-300';
  const toggleRingClass = isDarkMode ? 'peer-focus:ring-blue-800' : 'peer-focus:ring-blue-300';
  
  return (
    <div className={`flex items-center ${className}`}>
      {(label || description) && (
        <div className="flex-grow">
          {label && (
            <label htmlFor={id} className={`text-sm font-medium ${labelTextClass} cursor-pointer`}>
              {label}
            </label>
          )}
          {description && (
            <p className={`text-sm ${descriptionTextClass}`}>{description}</p>
          )}
        </div>
      )}
      
      <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className={`
          ${sizeClasses[size].toggle}
          ${toggleBgClass}
          peer-focus:outline-none 
          peer-focus:ring-4 
          ${toggleRingClass}
          rounded-full 
          peer 
          peer-checked:after:translate-x-full 
          peer-checked:after:border-white 
          peer-checked:bg-blue-600
          transition-all
          duration-300
          ease-in-out
        `}></div>
        <div className={`
          absolute 
          ${sizeClasses[size].circle}
          bg-white 
          rounded-full 
          transition-all
          duration-300
          ease-in-out
        `}></div>
      </label>
    </div>
  );
}
