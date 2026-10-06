'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: 'top' | 'middle' | 'bottom';
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
      direction = 'middle',
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            mouseX: mouseX,
            magnification: magnification,
            distance: distance,
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
          'flex h-[54px] w-max items-center gap-2.5 rounded-2xl border border-[#19241C] bg-[#0E1410]/90 px-3 py-2 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[#CCFF00]/40 transition-colors',
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
  className?: string;
  children?: React.ReactNode;
}

export const DockIcon: React.FC<DockIconProps> = ({
  size = 40,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
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
        'flex aspect-square cursor-pointer items-center justify-center rounded-xl relative text-[#94A899] hover:text-[#CCFF00] hover:bg-[#CCFF00]/10 transition-colors duration-150',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = 'DockIcon';
