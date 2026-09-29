import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface SectionHeadingProps {
  eyebrow?: string;
  badgeVariant?: 'orange' | 'cyan' | 'green' | 'slate';
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  badgeVariant = 'orange',
  title,
  description,
  align = 'center',
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
      {eyebrow && (
        <div className="mb-3">
          <Badge variant={badgeVariant} dot size="sm">
            {eyebrow}
          </Badge>
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
