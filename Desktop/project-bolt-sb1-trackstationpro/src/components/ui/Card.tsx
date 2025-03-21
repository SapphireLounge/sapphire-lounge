import { ReactNode, CSSProperties } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
  hover?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export function Card({
  title,
  subtitle,
  icon,
  footer,
  className = '',
  children,
  hover = false,
  onClick,
  style
}: CardProps) {
  const { theme } = useAppContext();
  const isDarkMode = theme === 'dark';
  
  const baseClasses = isDarkMode 
    ? 'bg-lighter-black rounded-lg shadow-md overflow-hidden' 
    : 'bg-white rounded-lg shadow-md overflow-hidden';
    
  const borderClasses = isDarkMode ? 'border-gray-900' : 'border-gray-200';
  const textClasses = isDarkMode ? 'text-gray-300' : 'text-gray-500';
  const iconClasses = 'text-blue-500';
  const footerClasses = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  
  const hoverClasses = hover 
    ? isDarkMode 
      ? 'hover:shadow-lg cursor-pointer' 
      : 'hover:shadow-lg hover:bg-gray-50 cursor-pointer' 
    : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      style={{ willChange: 'transform, opacity', ...style }}
    >
      {(title || icon) && (
        <div className={`px-8 py-5 border-b ${borderClasses} flex items-center justify-between`}>
          <div className="flex items-center space-x-4">
            {icon && <div className={`${iconClasses} text-xl`}>{icon}</div>}
            {title && (
              <div>
                <h3 className="text-lg font-medium tracking-wide text-center sm:text-left w-full">{title}</h3>
                {subtitle && <p className={`${textClasses} mt-1 tracking-wide`}>{subtitle}</p>}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="px-8 py-6">
        {children}
      </div>
      
      {footer && (
        <div className={`px-8 py-4 ${footerClasses} border-t ${borderClasses}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
