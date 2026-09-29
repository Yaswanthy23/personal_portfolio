import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'outline' | 'subtle';
  hoverGlow?: 'orange' | 'cyan' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hoverGlow = 'none',
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-all duration-200';

  const variantStyles = {
    default: 'bg-[#172033] border border-[#263449] text-[#F8FAFC]',
    interactive:
      'bg-[#172033] border border-[#263449] text-[#F8FAFC] hover:border-[#374863] hover:-translate-y-1 hover:shadow-lg',
    outline: 'bg-transparent border border-[#263449] text-[#F8FAFC]',
    subtle: 'bg-[#111827] border border-[#263449]/60 text-[#F8FAFC]',
  };

  const glowStyles = {
    orange: 'hover:border-[#FF9900]/50 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5),0_0_20px_-3px_rgba(255,153,0,0.15)]',
    cyan: 'hover:border-[#22D3EE]/50 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5),0_0_20px_-3px_rgba(34,211,238,0.15)]',
    none: '',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverGlow !== 'none' && glowStyles[hoverGlow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
