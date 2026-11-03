import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hoverEffect?: boolean;
  variant?: 'light' | 'dark';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  elevated = false,
  hoverEffect = true,
  variant,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-200 p-6 sm:p-8',
        variant === 'dark'
          ? 'bg-[#943E19] border border-[#C4653D]'
          : variant === 'light'
          ? 'bg-[#F5EBE1] border border-[#E8D8CC]'
          : elevated
          ? 'bg-[#943E19] border border-[#C4653D]'
          : 'border border-[#E8D8CC] bg-[#F5EBE1]',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-lg transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
