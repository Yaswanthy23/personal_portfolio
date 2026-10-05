import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B14] disabled:opacity-50 disabled:pointer-events-none rounded-lg cursor-pointer select-none group';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#FF9900] text-[#070B14] font-semibold hover:bg-[#E08700] hover:-translate-y-0.5 active:translate-y-0 shadow-sm',
    secondary:
      'bg-[#101827] text-[#F8FAFC] border border-[#1E293B] hover:border-[#2A3B52] hover:bg-[#111C2D] hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'bg-transparent text-[#F8FAFC] border border-[#1E293B] hover:border-[#FF9900] hover:text-[#FF9900] hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101827] active:scale-[0.99]',
  };

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  const content = (
    <>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && (
        <span className="inline-flex shrink-0 items-center transition-transform duration-200 group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
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
