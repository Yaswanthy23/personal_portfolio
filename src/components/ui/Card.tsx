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
        'rounded-2xl border border-[#1E293B] transition-all duration-200 p-6 sm:p-8',
        elevated ? 'bg-[#111C2D]' : 'bg-[#101827]',
        hoverEffect && 'hover:border-[#2A3B52] hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
