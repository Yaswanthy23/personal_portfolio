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
    const isLight = variant === 'light';
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
          isLight
            ? 'border border-[#E2DDD3] bg-white/85 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:border-[#047857]/40'
            : 'border border-[#17261D] bg-[#0D1410]/90 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[#00DC82]/50',
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
  const isLight = variant === 'light';
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
        isLight
          ? 'text-[#475569] hover:text-[#047857] hover:bg-[#047857]/10'
          : 'text-[#9CA3AF] hover:text-[#00DC82] hover:bg-[#00DC82]/15',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = 'DockIcon';
