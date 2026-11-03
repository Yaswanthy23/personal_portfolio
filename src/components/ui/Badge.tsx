import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'cyan' | 'green' | 'slate' | 'outline' | 'orange';
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
    blue: 'bg-[#B4532A]/15 text-[#B4532A] border border-[#B4532A]/40',
    orange: 'bg-[#B4532A]/15 text-[#B4532A] border border-[#B4532A]/40',
    cyan: 'bg-[#E8B89C]/25 text-[#B4532A] border border-[#E8B89C]',
    green: 'bg-[#B4532A]/15 text-[#B4532A] border border-[#B4532A]/30',
    slate: 'bg-[#F5EBE1] text-[#7A6D65] border border-[#E8D8CC]',
    outline: 'bg-transparent text-[#7A6D65] border border-[#E8D8CC]',
  };

  const dotColors = {
    blue: 'bg-[#B4532A]',
    orange: 'bg-[#B4532A]',
    cyan: 'bg-[#B4532A]',
    green: 'bg-[#B4532A]',
    slate: 'bg-[#7A6D65]',
    outline: 'bg-[#7A6D65]',
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)} {...props}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  );
};
