'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const skillSets: [string, string][] = [
  ['Terraform', 'Kubernetes'],
  ['Docker', 'Kubernetes'],
  ['AWS', 'Terraform'],
  ['Jenkins', 'CI/CD'],
  ['EKS', 'Helm'],
  ['Prometheus', 'Grafana'],
  ['AWS', 'Docker'],
];

export interface RotatingSkillsProps {
  className?: string;
}

export const RotatingSkills: React.FC<RotatingSkillsProps> = ({ className }) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % skillSets.length);
        setIsTransitioning(false);
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentPair = skillSets[index];

  return (
    <div
      className={cn(
        'h-6 min-h-[24px] flex flex-wrap items-center gap-x-2 text-[14px] sm:text-[15px] select-text',
        className
      )}
      aria-label={`Skilled in: ${currentPair[0]} and ${currentPair[1]}`}
    >
      <span className="text-[#F4F9F5] font-bold shrink-0">
        Skilled in :
      </span>

      <span
        className={cn(
          'inline-flex items-center font-semibold text-[#CCFF00] transition-all duration-300 ease-out will-change-transform',
          isTransitioning
            ? 'opacity-0 -translate-y-1.5'
            : 'opacity-100 translate-y-0'
        )}
      >
        <span>{currentPair[0]}</span>
        <span className="text-[#A3E635]/60 mx-1.5 select-none" aria-hidden="true">
          ·
        </span>
        <span>{currentPair[1]}</span>
      </span>
    </div>
  );
};


