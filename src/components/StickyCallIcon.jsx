import React from 'react';

export default function StickyCallIcon() {
  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <a
        href="tel:+13432545205"
        className="group relative flex items-center justify-center w-16 h-16 rounded-2xl backdrop-filter backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(20,184,166,0.9), rgba(14,147,135,0.95))',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(20,184,166,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
        }}
        aria-label="Call AB Interior Works (343) 254-5205"
        onClick={() => {
          if (typeof window !== 'undefined' && typeof window.__trackPhoneCall === 'function') {
            window.__trackPhoneCall('Sticky Call Icon (343) 254-5205', '+13432545205');
          }
        }}
      >
        {/* Subtle pulse animation */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-75 animate-pulse"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.4), rgba(14,147,135,0.4))',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
        
        {/* Phone icon */}
        <svg 
          width="26" 
          height="26" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="relative z-10 text-white drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92z" />
        </svg>

        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.6), rgba(14,147,135,0.6))',
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
      </a>
    </div>
  );
}
