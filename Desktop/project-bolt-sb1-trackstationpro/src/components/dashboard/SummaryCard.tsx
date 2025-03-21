import { ReactNode, ReactElement } from 'react';
import { Card } from '../ui/Card';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'amber';
}

export function SummaryCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'blue' 
}: SummaryCardProps): ReactElement {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    amber: 'from-amber-500 to-amber-600'
  };
  
  return (
    <Card className="h-32 sm:h-36 overflow-hidden custom-card relative transform-gpu">
      {/* Desktop layout */}
      <div className="hidden sm:flex items-center p-6 w-full h-full">
        <div 
          className={`rounded-full bg-gradient-to-br ${colorClasses[color]} shadow-lg text-white mr-6 flex-shrink-0 w-20 h-20 flex items-center justify-center transform-gpu`}
        >
          {icon}
        </div>
        
        <div className="flex-1 flex flex-col">
          <p className="text-gray-300 text-base font-medium summary-card-title whitespace-nowrap overflow-hidden text-ellipsis mb-2">{title}</p>
          <h3 className="text-2xl font-bold summary-card-value truncate">{value}</h3>
          
          {trend && (
            <div className={`flex items-center mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <svg 
                className={`w-7 h-7 mr-2 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span className="text-lg font-medium">{trend.value}%</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile layout */}
      <div className="sm:hidden flex flex-col p-4 w-full h-full relative">
        {/* Title centered at the top */}
        <div className="w-full text-center mb-3">
          <p className="text-gray-300 text-lg font-medium summary-card-title">{title}</p>
        </div>
        
        {/* Value and icon side by side in the center */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center flex-wrap justify-center">
            <div className={`rounded-full bg-gradient-to-br ${colorClasses[color]} shadow-lg text-white flex-shrink-0 w-14 h-14 flex items-center justify-center transform-gpu mr-4 mb-2`}>
              {icon}
            </div>
            <h3 className="text-5xl font-bold summary-card-value">{value}</h3>
          </div>
        </div>
        
        {trend && (
          <div className={`absolute bottom-4 right-4 flex items-center ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <svg 
              className={`w-5 h-5 mr-1 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-base font-medium">{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div className={`absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r ${colorClasses[color]}`}></div>
    </Card>
  );
}
