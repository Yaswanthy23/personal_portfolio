'use client';

import React, { useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const TooltipContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className="relative inline-flex items-center justify-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger: React.FC<{
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn('inline-flex items-center justify-center w-full h-full', className)}>{children}</div>;
};

export const TooltipContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
}> = ({ children, className, sideOffset = 8 }) => {
  const { isOpen } = useContext(TooltipContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 2, scale: 0.96 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{ bottom: `calc(100% + ${sideOffset}px)` }}
          className={cn(
            'absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap rounded-md border border-[#243529] bg-[#060907] px-2.5 py-1 text-[11px] font-mono font-medium text-[#F4F9F5] shadow-[0_4px_16px_rgba(0,0,0,0.6)]',
            className
          )}
        >
          {children}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#243529]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
