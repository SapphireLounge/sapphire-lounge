import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 50 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Radio Wave Animation */}
      <g className="animate-pulse">
        <circle cx="25" cy="25" r="23" stroke="#00eeff" strokeWidth="1.5" strokeOpacity="0.3" />
        <circle cx="25" cy="25" r="18" stroke="#00eeff" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle cx="25" cy="25" r="13" stroke="#00eeff" strokeWidth="1.5" strokeOpacity="0.7" />
      </g>
      
      {/* Center Circle */}
      <circle cx="25" cy="25" r="8" fill="#00eeff" className="animate-pulse" />
      
      {/* XL:UK Text */}
      <text 
        x="25" 
        y="27" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fill="white" 
        fontWeight="bold" 
        fontSize="6"
        fontFamily="sans-serif"
      >
        XL:UK
      </text>
    </svg>
  );
};

export default Logo;
