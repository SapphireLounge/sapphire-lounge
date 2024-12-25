import { memo } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingSpinner = memo(({ size = 'md', color = 'primary-500' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div 
      className="relative inline-flex"
      role="status"
      aria-label="Loading"
    >
      <div className={sizeClasses[size]}>
        <div className={`absolute w-full h-full border-2 border-t-${color} border-r-${color}/80 border-b-${color}/60 border-l-${color}/40 rounded-full animate-[spin_0.8s_linear_infinite]`} />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
