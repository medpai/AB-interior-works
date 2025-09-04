import React from 'react';

export default function Logo({ className = '', size = 'default' }) {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 40, height: 40 },
    large: { width: 56, height: 56 }
  };

  const { width, height } = dimensions[size] || dimensions.default;

  return (
    <div className={`logo-container ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        {/* Background circle with gradient */}
        <circle 
          cx="20" 
          cy="20" 
          r="19" 
          fill="url(#logoGradient)" 
          stroke="url(#logoBorder)" 
          strokeWidth="1"
        />
        
        {/* Paint brush handle */}
        <path 
          d="M12 28L16 24L18 26L14 30C13.5 30.5 12.5 30.5 12 30C11.5 29.5 11.5 28.5 12 28Z" 
          fill="#0a0f20" 
          opacity="0.9"
        />
        
        {/* Paint brush ferrule (metal part) */}
        <rect 
          x="15.5" 
          y="22.5" 
          width="3" 
          height="4" 
          rx="0.5" 
          fill="url(#metalGradient)" 
          transform="rotate(45 17 24.5)"
        />
        
        {/* Paint brush bristles */}
        <path 
          d="M18 26L22 22L24 20L26 18C26.5 17.5 27.5 17.5 28 18C28.5 18.5 28.5 19.5 28 20L20 28L18 26Z" 
          fill="url(#bristleGradient)"
        />
        
        {/* Paint stroke/splash effect */}
        <path 
          d="M25 15C25.5 14.5 26.5 14.5 27 15C27.5 15.5 27.5 16.5 27 17L25 19L23 17L25 15Z" 
          fill="#eab308" 
          opacity="0.8"
        />
        
        {/* Small paint drops */}
        <circle cx="29" cy="13" r="1.5" fill="#14b8a6" opacity="0.7" />
        <circle cx="31" cy="16" r="1" fill="#eab308" opacity="0.6" />
        <circle cx="26" cy="12" r="0.8" fill="#14b8a6" opacity="0.5" />
        
        {/* Letter 'A' integrated into design */}
        <path 
          d="M10 32L12 28L14 24L16 28L18 32H16L15.5 30.5H12.5L12 32H10ZM13 28.5H15L14 26L13 28.5Z" 
          fill="url(#letterGradient)" 
          opacity="0.3"
        />
        
        {/* Letter 'B' integrated into design */}
        <path 
          d="M30 10V18H33C34.1 18 35 17.1 35 16V15C35 14.4 34.6 14 34 14H33V12H34C34.6 12 35 11.6 35 11V10.5C35 9.7 34.3 9 33.5 9H30V10ZM32 11H33V13H32V11ZM32 15H33V17H32V15Z" 
          fill="url(#letterGradient)" 
          opacity="0.3"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.12" />
          </linearGradient>
          
          <linearGradient id="logoBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.2" />
          </linearGradient>
          
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
          
          <linearGradient id="bristleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0e9387" />
          </linearGradient>
          
          <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
        </defs>
      </svg>
      
      <span className="logo-text">AB Interior Works</span>
    </div>
  );
}
