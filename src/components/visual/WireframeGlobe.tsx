'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface WireframeGlobeProps {
  className?: string;
}

export const WireframeGlobe: React.FC<WireframeGlobeProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center pointer-events-none select-none',
        className
      )}
      aria-hidden="true"
    >
      {/* Outer lime halo glow */}
      <div className="absolute inset-0 rounded-full bg-[#CCFF00]/10 blur-3xl" />
      <div className="absolute w-[80%] h-[80%] rounded-full bg-[#A3E635]/15 blur-2xl" />

      {/* SVG 3D Wireframe Globe with latitude, longitude & rotating radar lines */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full text-[#CCFF00] opacity-75 animate-wireframe-spin"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {/* Outer Ring */}
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
        
        {/* Concentric / Latitude Ellipses */}
        <ellipse cx="200" cy="200" rx="180" ry="140" strokeOpacity="0.45" strokeDasharray="3 3" />
        <ellipse cx="200" cy="200" rx="180" ry="90" strokeOpacity="0.55" />
        <ellipse cx="200" cy="200" rx="180" ry="40" strokeOpacity="0.65" strokeDasharray="4 4" />
        <line x1="20" y1="200" x2="380" y2="200" strokeOpacity="0.8" strokeWidth="1.2" />

        {/* Longitude Ellipses */}
        <ellipse cx="200" cy="200" rx="140" ry="180" strokeOpacity="0.45" strokeDasharray="3 3" />
        <ellipse cx="200" cy="200" rx="90" ry="180" strokeOpacity="0.55" />
        <ellipse cx="200" cy="200" rx="40" ry="180" strokeOpacity="0.65" strokeDasharray="4 4" />
        <line x1="200" y1="20" x2="200" y2="380" strokeOpacity="0.8" strokeWidth="1.2" />

        {/* Diagonal Orbit rings */}
        <ellipse
          cx="200"
          cy="200"
          rx="175"
          ry="70"
          transform="rotate(35 200 200)"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="175"
          ry="70"
          transform="rotate(-35 200 200)"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />

        {/* Dynamic Nodes / Coordinates on Globe */}
        <circle cx="270" cy="140" r="3" fill="#CCFF00" />
        <circle cx="120" cy="250" r="3.5" fill="#CCFF00" />
        <circle cx="310" cy="220" r="2.5" fill="#A3E635" />
        <circle cx="150" cy="110" r="3" fill="#CCFF00" />
        <circle cx="220" cy="300" r="2.5" fill="#A3E635" />
      </svg>
    </div>
  );
};
