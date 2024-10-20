import React from 'react';

const OrbitalCircles = () => {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%">
      {/* Outer circle */}
      <circle cx="200" cy="200" r="180" fill="none" stroke="#333" strokeWidth="1" opacity="0.2" />
      
      {/* Middle circle */}
      <circle cx="200" cy="200" r="120" fill="none" stroke="#333" strokeWidth="1" opacity="0.2" />
      
      {/* Inner circle */}
      <circle cx="200" cy="200" r="60" fill="none" stroke="#333" strokeWidth="1" opacity="0.2" />
      
      {/* Orbiting dot */}
      <circle cx="200" cy="20" r="8" fill="#1890ff">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 200 200"
          to="360 200 200"
          dur="10s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default React.memo(OrbitalCircles);
