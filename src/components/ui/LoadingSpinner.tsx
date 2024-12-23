import { memo } from 'react';

export const LoadingSpinner = memo(() => (
  <div 
    className="relative inline-flex"
    role="status"
    aria-label="Loading"
  >
    <div className="w-8 h-8">
      <div className="absolute w-full h-full border-2 border-t-primary-500 border-r-primary-400 border-b-primary-300 border-l-primary-200 rounded-full animate-[spin_0.8s_linear_infinite]" />
    </div>
    <span className="sr-only">Loading...</span>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';
