import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  pill?: boolean;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  pill = false
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium';
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };
  
  const variantClasses = {
    primary: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
    secondary: 'bg-gray-600/20 text-gray-400 border border-gray-600/30',
    success: 'bg-green-600/20 text-green-400 border border-green-600/30',
    danger: 'bg-red-600/20 text-red-400 border border-red-600/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30',
    info: 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/30'
  };
  
  const roundedClass = pill ? 'rounded-full' : 'rounded-md';
  
  const badgeClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${roundedClass}
    ${className}
  `;
  
  return (
    <span className={badgeClasses}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
}
