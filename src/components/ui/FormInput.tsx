import { forwardRef } from 'react';
import { Skeleton } from './Skeleton';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  helperText?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, isLoading, helperText, className = '', ...props }, ref) => {
    if (isLoading) {
      return <Skeleton className="h-12 w-full" />;
    }

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-200 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            {...props}
            className={`
              w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent hover:border-neutral-600 transition-colors
              ${icon ? 'pl-10' : ''}
              ${error 
                ? 'border-red-500 focus:border-red-600' 
                : 'border-neutral-700 hover:border-neutral-600'
              }
              text-white placeholder-gray-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
          />
        </div>
        {(error || helperText) && (
          <div 
            className={`mt-1 text-sm ${error ? 'text-red-400' : 'text-gray-400'}`}
            id={error ? `${props.id}-error` : undefined}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);
