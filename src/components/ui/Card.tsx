import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  elevated = false,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[#17261D] transition-all duration-200 p-6 sm:p-8',
        elevated ? 'bg-[#131E17]' : 'bg-[#0D1410]',
        hoverEffect && 'hover:border-[#00DC82]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,220,130,0.08)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
