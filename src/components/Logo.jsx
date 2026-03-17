import React from 'react';

export default function Logo({ className = '', size = 'default' }) {
  const heights = {
    small: 56,
    default: 80,
    large: 100
  };

  const h = heights[size] || heights.default;

  return (
    <div className={`logo-container ${className}`}>
      <img
        src="/logo-bugnot-light.png"
        alt="Bugnot Painting & Renovation"
        className="logo-img"
        style={{ height: `${h}px`, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  );
}
