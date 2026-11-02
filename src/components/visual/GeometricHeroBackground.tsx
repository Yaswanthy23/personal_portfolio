'use client';

import React from 'react';
import Image from 'next/image';

interface GeometricHeroBackgroundProps {
  className?: string;
}

export const GeometricHeroBackground: React.FC<GeometricHeroBackgroundProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0 bg-[#FAF7F2] ${className}`}
      aria-hidden="true"
    >
      {/* 1. Base Warm Ivory / Soft Cream Backdrop Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-cream-geometric.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-[80%_center] opacity-90 transition-opacity duration-700"
        />
      </div>

      {/* 2. Layered SVG Vector 3D Folded Geometric Shapes (adds crisp architectural detail & soft shadows) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle warm gray & beige gradients for folded facets */}
          <linearGradient id="facet-ivory-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EDE6D8" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="facet-beige-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5EFE4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E8DFCE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#DFD5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="facet-shadow-3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#D8CFC0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#EFE8DB" stopOpacity="0.1" />
          </linearGradient>

          {/* Soft diffused shadow filter */}
          <filter id="soft-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="3" dy="8" stdDeviation="12" floodColor="#8C8170" floodOpacity="0.12" />
          </filter>

          <filter id="deep-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="6" dy="16" stdDeviation="20" floodColor="#7A6F5E" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Ambient geometric ribbon folds on the right side */}
        <g filter="url(#deep-soft-shadow)">
          {/* Primary folded triangular plane */}
          <polygon
            points="1100,60 1400,180 1280,480"
            fill="url(#facet-ivory-1)"
            className="transition-transform duration-1000"
          />
          {/* Adjoining folded facet in subtle beige */}
          <polygon
            points="1280,480 1400,180 1480,420"
            fill="url(#facet-beige-2)"
          />
          {/* Reverse crease fold */}
          <polygon
            points="1100,60 1280,480 1150,380"
            fill="url(#facet-shadow-3)"
          />
        </g>

        {/* Secondary lower folded plane */}
        <g filter="url(#soft-shadow)">
          <polygon
            points="1020,440 1250,520 1140,780"
            fill="url(#facet-beige-2)"
          />
          <polygon
            points="1250,520 1420,620 1310,850"
            fill="url(#facet-ivory-1)"
          />
          <polygon
            points="1020,440 1140,780 960,680"
            fill="url(#facet-shadow-3)"
          />
        </g>

        {/* Subtle accent fold near top-right edge */}
        <polygon
          points="1320,0 1440,60 1380,160"
          fill="url(#facet-ivory-1)"
          opacity="0.7"
        />
      </svg>

      {/* 3. Left-to-Right Readability Mask (keeps text crisp while blending smoothly into folded shapes) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(250, 247, 242, 0.96) 0%, rgba(250, 247, 242, 0.90) 38%, rgba(250, 247, 242, 0.50) 65%, rgba(250, 247, 242, 0.15) 85%, transparent 100%)',
        }}
      />

      {/* 4. Top Ambient Light Sheen (subtle warm ivory glow) */}
      <div
        className="absolute top-0 left-0 w-full h-64 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.55) 0%, transparent 100%)',
        }}
      />

      {/* 5. Bottom Transition Fade to Dark Obsidian Portfolio Theme */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(11, 17, 23, 0.15) 35%, rgba(11, 17, 23, 0.65) 75%, #0B1117 100%)',
        }}
      />
    </div>
  );
};
