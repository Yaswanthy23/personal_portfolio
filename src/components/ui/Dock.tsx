'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: 'top' | 'middle' | 'bottom';
  variant?: 'dark' | 'light';
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 56;
const DEFAULT_DISTANCE = 140;

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      variant = 'dark',
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<DockIconProps>, {
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
            variant: variant,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          'flex h-[54px] w-max items-center gap-2.5 rounded-2xl px-3 py-2 backdrop-blur-md transition-colors',
          variant === 'dark'
            ? 'border border-[#C4653D] bg-[#943E19]'
            : 'border border-[#E8D8CC] bg-[#F5EBE1] shadow-[0_10px_25px_rgba(180,83,42,0.08)] hover:border-[#B4532A]/40',
          className
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);
Dock.displayName = 'Dock';

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  variant?: 'dark' | 'light';
  className?: string;
  children?: React.ReactNode;
}

export const DockIcon: React.FC<DockIconProps> = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  variant = 'dark',
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const fallbackMouseX = useMotionValue(Infinity);
  const activeMouseX = mouseX || fallbackMouseX;

  const distanceCalc = useTransform(activeMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [38, magnification, 38]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-xl relative transition-colors duration-150',
        variant === 'dark'
          ? 'text-[#F5EBE1] hover:text-[#FFFFFF] hover:bg-[#E8B89C]/20'
          : 'text-[#7A6D65] hover:text-[#B4532A] hover:bg-[#E8D8CC]/60',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = 'DockIcon';
