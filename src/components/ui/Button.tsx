import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] disabled:opacity-50 disabled:pointer-events-none rounded-md cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#FF9900] text-[#0B1120] font-semibold hover:bg-[#E08700] active:scale-[0.98] shadow-sm hover:shadow-[0_0_15px_rgba(255,153,0,0.3)]',
    secondary:
      'bg-[#172033] text-[#F8FAFC] border border-[#263449] hover:border-[#374863] hover:bg-[#1E2B45] active:scale-[0.98]',
    outline:
      'bg-transparent text-[#F8FAFC] border border-[#263449] hover:border-[#FF9900] hover:text-[#FF9900] active:scale-[0.98]',
    cyan:
      'bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30 hover:bg-[#22D3EE]/20 hover:border-[#22D3EE] active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#172033]/60 active:scale-[0.98]',
  };

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  const content = (
    <>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0 items-center transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
    </>
  );

  if (href) {
    if (isExternal || href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={isExternal || href.startsWith('http') ? '_blank' : undefined}
          rel={isExternal || href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
