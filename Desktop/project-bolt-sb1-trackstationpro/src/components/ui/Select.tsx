import { SelectHTMLAttributes, ReactNode, useId } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Select({
  label,
  options,
  error,
  icon,
  size = 'md',
  fullWidth = false,
  className = '',
  id,
  ...props
}: SelectProps) {
  // Always call hooks at the top level
  const generatedId = useId();
  const selectId = id || generatedId;
  const { theme } = useAppContext();
  const isDarkMode = theme === 'dark';
  
  const baseClasses = isDarkMode 
    ? 'bg-gray-800 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200' 
    : 'bg-white border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200';
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm md:text-base px-4 py-2 md:py-3',
    lg: 'text-base px-4 py-3'
  };
  
  const stateClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : isDarkMode 
      ? 'border-gray-600 focus:border-blue-500' 
      : 'border-gray-300 focus:border-blue-500';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const selectClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${stateClasses}
    ${widthClass}
    ${icon ? 'pl-10' : ''}
    ${className}
  `;

  const labelClasses = isDarkMode 
    ? 'block text-sm md:text-base font-medium text-gray-300 mb-1 md:mb-1 tracking-wide' 
    : 'block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-1 tracking-wide';
  
  const errorClasses = 'text-red-500 text-xs mt-1';
  
  const iconContainerClasses = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none';
  const iconClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  
  // Custom dropdown arrow styling
  const dropdownArrowStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${isDarkMode ? '%23ffffff' : '%23000000'}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.5rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5em 1.5em',
    paddingRight: '2.5rem'
  };
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={selectId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={iconContainerClasses}>
            <span className={iconClasses}>{icon}</span>
          </div>
        )}
        
        <select
          id={selectId}
          className={selectClasses}
          style={dropdownArrowStyle}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  );
}
