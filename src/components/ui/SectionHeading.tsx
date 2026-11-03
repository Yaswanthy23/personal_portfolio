import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  label?: string; // e.g. "01 / ABOUT"
  title: React.ReactNode;  // e.g. "A little about me" or with highlighted span
  highlight?: string;      // optional substring to highlight in exact orange (#FFA800)
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  showLine?: boolean;
  variant?: 'light' | 'dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  highlight,
  description,
  align = 'left',
  className,
  showLine = true,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  const renderTitle = () => {
    if (typeof title === 'string' && highlight && title.includes(highlight)) {
      const parts = title.split(highlight);
      return (
        <>
          {parts[0]}
          <span className={isDark ? 'text-[#E8B89C]' : 'text-[#B4532A]'}>{highlight}</span>
          {parts.slice(1).join(highlight)}
        </>
      );
    }
    return title;
  };

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
          <span
            className={cn(
              'font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded',
              isDark
                ? 'text-[#E8B89C] bg-[#7D3414] border border-[#C4653D]'
                : 'text-[#B4532A] bg-[#F5EBE1] border border-[#E8D8CC]'
            )}
          >
            {label}
          </span>
          {showLine && (
            <span
              className={cn(
                'h-px w-8',
                isDark ? 'bg-[#C4653D]' : 'bg-[#E8D8CC]'
              )}
            />
          )}
        </div>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight',
          isDark ? 'text-[#FFFFFF]' : 'text-[#2A211B]'
        )}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-2 text-sm sm:text-base leading-relaxed',
            isDark ? 'text-[#F5EBE1]' : 'text-[#7A6D65]'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
