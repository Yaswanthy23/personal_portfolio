import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'orange' | 'cyan' | 'green' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'slate',
  size = 'md',
  dot = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded-full transition-colors';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2',
  };

  const variantStyles = {
    orange: 'bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/30',
    cyan: 'bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30',
    green: 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30',
    slate: 'bg-[#172033] text-[#94A3B8] border border-[#263449]',
    outline: 'bg-transparent text-[#94A3B8] border border-[#263449]',
  };

  const dotColors = {
    orange: 'bg-[#FF9900]',
    cyan: 'bg-[#22D3EE]',
    green: 'bg-[#22C55E]',
    slate: 'bg-[#94A3B8]',
    outline: 'bg-[#94A3B8]',
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)} {...props}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  );
};
