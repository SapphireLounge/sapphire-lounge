import { InputHTMLAttributes, ReactNode, useId } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  icon,
  rightIcon,
  size = 'md',
  fullWidth = false,
  className = '',
  id,
  ...props
}: InputProps) {
  // Always call hooks at the top level
  const generatedId = useId();
  const inputId = id || generatedId;
  const { theme, currency } = useAppContext();
  const isDarkMode = theme === 'dark';
  
  // Update currency icon if this is a currency input
  const isCurrencyInput = 
    (label && (label.toLowerCase().includes('cost') || label.toLowerCase().includes('amount'))) ||
    (props.name && (props.name.toLowerCase().includes('cost') || props.name.toLowerCase().includes('amount')));
  
  // Get the current currency symbol based on the selected currency
  const currencySymbol = isCurrencyInput 
    ? (currency === 'GBP' ? '£' : '$')
    : null;
  
  // Create a currency icon with the correct symbol
  const currencyIcon = isCurrencyInput 
    ? <span className="flex items-center justify-center w-4 h-4">{currencySymbol}</span>
    : icon;
  
  const baseClasses = isDarkMode
    ? 'bg-gray-800 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
    : 'bg-white border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200';
  
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
  
  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${stateClasses}
    ${widthClass}
    ${currencyIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `;
  
  const labelClasses = isDarkMode
    ? 'block text-sm md:text-base font-medium text-gray-300 mb-1 md:mb-1 tracking-wide'
    : 'block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-1 tracking-wide';
    
  const iconClasses = isDarkMode
    ? 'text-gray-400'
    : 'text-gray-500';
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {currencyIcon && (
          <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${iconClasses}`}>
            {currencyIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${iconClasses}`}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
