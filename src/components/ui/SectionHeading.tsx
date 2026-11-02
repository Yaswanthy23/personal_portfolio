import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  label?: string; // e.g. "01 / ABOUT"
  title: string;  // e.g. "A little about me"
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  showLine?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  align = 'left',
  className,
  showLine = true,
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
        <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#00DC82] bg-[#0D1410] border border-[#17261D] px-2.5 py-0.5 rounded">
            {label}
          </span>
          {showLine && <span className="h-px w-8 bg-[#17261D]" />}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#FFFFFF]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
