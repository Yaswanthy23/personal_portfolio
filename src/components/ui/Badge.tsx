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
    blue: 'bg-[#00DC82]/15 text-[#34D399] border border-[#00DC82]/40',
    orange: 'bg-[#00DC82]/15 text-[#34D399] border border-[#00DC82]/40',
    cyan: 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/40',
    green: 'bg-[#00DC82]/15 text-[#00DC82] border border-[#00DC82]/40',
    slate: 'bg-[#0D1410] text-[#9CA3AF] border border-[#17261D]',
    outline: 'bg-transparent text-[#9CA3AF] border border-[#17261D]',
  };

  const dotColors = {
    blue: 'bg-[#00DC82]',
    orange: 'bg-[#00DC82]',
    cyan: 'bg-[#34D399]',
    green: 'bg-[#00DC82]',
    slate: 'bg-[#9CA3AF]',
    outline: 'bg-[#9CA3AF]',
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)} {...props}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  );
};
