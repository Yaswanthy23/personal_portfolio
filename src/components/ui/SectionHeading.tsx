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
        'mb-8 sm:mb-10',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {label && (
        <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
          <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-wider text-[#CCFF00]">
            {label}
          </span>
          <span className="h-px w-8 bg-[#19241C]" />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F9F5]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

