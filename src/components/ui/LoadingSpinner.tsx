import { memo } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const LoadingSpinner = memo(({ size = 'md', color = 'primary-500', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div 
      className={`relative inline-flex ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className={sizeClasses[size]}>
        <div 
          className={`absolute w-full h-full border-2 border-t-${color} border-r-${color} border-b-${color} border-l-${color} rounded-full animate-[spin_0.8s_linear_infinite] opacity-75`} 
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
