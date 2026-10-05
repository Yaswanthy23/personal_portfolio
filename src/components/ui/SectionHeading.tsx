import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  label?: string; // e.g. "01 / ABOUT"
  title: string;  // e.g. "A little about me"
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  align = 'left',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {label && (
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#FF9900]">
            {label}
          </span>
          <span className="h-px w-8 bg-[#1E293B]" />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F8FAFC]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
