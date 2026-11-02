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
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00DC82] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1117] disabled:opacity-50 disabled:pointer-events-none rounded-full cursor-pointer select-none group';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#00DC82] text-[#050806] font-semibold hover:bg-[#00C575] hover:shadow-[0_0_24px_rgba(0,220,130,0.45)] hover:-translate-y-0.5 active:translate-y-0 shadow-md',
    secondary:
      'bg-[#0D1410] text-[#FFFFFF] border border-[#17261D] hover:border-[#00DC82] hover:text-[#00DC82] hover:bg-[#131E17] hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'bg-transparent text-[#FFFFFF] border border-[#17261D] hover:border-[#00DC82] hover:text-[#00DC82] hover:bg-[#00DC82]/10 hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-[#9CA3AF] hover:text-[#FFFFFF] hover:bg-[#0D1410] active:scale-[0.99]',
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
