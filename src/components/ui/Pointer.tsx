'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PointerProps {
  children?: React.ReactNode;
  className?: string;
  badgeText?: string;
}

/**
 * Magic UI Custom Animated Pointer Component
 *
 * Scoped to its parent container element:
 * - Hides the default cursor on hover
 * - Displays a fluid, physics-based custom pointer following mouse coordinates
 * - Custom themed in Forest Green (#294D38), Golden Yellow (#FFB800), and Warm White (#F7F7F3)
 * - Restores default cursor on leave with spring scale-out and fade-out
 * - Zero interference with clicks, selections, and accessibility (pointer-events-none)
 * - Automatically disabled on touch / coarse pointer devices
 */
export const Pointer: React.FC<PointerProps> = ({
  children,
  className,
  badgeText,
}) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isInside, setIsInside] = useState(false);
  const isInsideRef = useRef(false);

  // Lazy initialization prevents cascading re-renders
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const noHover = !window.matchMedia('(hover: hover)').matches;
      return isCoarse || noHover;
    }
    return false;
  });

  // Motion values for hardware-accelerated 60fps tracking without React re-renders
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for responsive cursor movement
  const springConfig = useMemo(() => ({ damping: 28, stiffness: 420, mass: 0.1 }), []);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Listen to media query changes (e.g. tablet mode toggle / orientation changes)
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const handleDeviceChange = (e: MediaQueryListEvent) => {
      const noHover = !window.matchMedia('(hover: hover)').matches;
      setIsTouchDevice(e.matches || noHover);
    };
    coarseQuery.addEventListener('change', handleDeviceChange);

    if (isTouchDevice) {
      return () => {
        coarseQuery.removeEventListener('change', handleDeviceChange);
      };
    }

    const parent = anchorRef.current?.parentElement;
    if (!parent) {
      return () => {
        coarseQuery.removeEventListener('change', handleDeviceChange);
      };
    }

    const originalCursor = parent.style.cursor;

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch and pen inputs
      if (e.pointerType !== 'mouse') return;

      const rect = parent.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      // Strict boundary check
      if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) {
        if (isInsideRef.current) {
          isInsideRef.current = false;
          setIsInside(false);
          parent.style.cursor = originalCursor;
        }
        return;
      }

      if (!isInsideRef.current) {
        // Immediate jump on first entry to prevent spring lag from (0,0)
        x.set(relX);
        y.set(relY);
        smoothX.jump(relX);
        smoothY.jump(relY);
        isInsideRef.current = true;
        setIsInside(true);
        parent.style.cursor = 'none';
      } else {
        x.set(relX);
        y.set(relY);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;

      const rect = parent.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      x.set(relX);
      y.set(relY);
      smoothX.jump(relX);
      smoothY.jump(relY);
      isInsideRef.current = true;
      setIsInside(true);
      parent.style.cursor = 'none';
    };

    const handlePointerLeave = () => {
      if (isInsideRef.current) {
        isInsideRef.current = false;
        setIsInside(false);
        parent.style.cursor = originalCursor;
      }
    };

    parent.addEventListener('pointerenter', handlePointerEnter);
    parent.addEventListener('pointermove', handlePointerMove);
    parent.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      coarseQuery.removeEventListener('change', handleDeviceChange);
      parent.removeEventListener('pointerenter', handlePointerEnter);
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      parent.style.cursor = originalCursor;
    };
  }, [smoothX, smoothY, x, y, isTouchDevice]);

  // Touch devices: completely unmounted / inert
  if (isTouchDevice) {
    return <div ref={anchorRef} className="hidden" aria-hidden="true" />;
  }

  return (
    <>
      {/* Invisible anchor element to discover and bind to parent card */}
      <div ref={anchorRef} className="hidden" aria-hidden="true" />

      <AnimatePresence>
        {isInside && (
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-4px',
              translateY: '-3px',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 360,
              mass: 0.15,
            }}
            className={cn(
              'pointer-events-none absolute top-0 left-0 z-50 flex items-start select-none will-change-transform',
              className
            )}
            aria-hidden="true"
          >
            {children || (
              <>
                {/* Custom Themed SVG Pointer: Forest Green body + Golden Yellow border + Warm White dot */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 drop-shadow-[0_2px_7px_rgba(41,77,56,0.45)]"
                >
                  <path
                    d="M4 3L11.5 21.5L14.8 13.8L22.5 10.5L4 3Z"
                    fill="#294D38"
                    stroke="#FFB800"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.5" cy="7.5" r="1.4" fill="#F7F7F3" />
                </svg>

                {/* Themed Pill Badge */}
                {badgeText && (
                  <div className="ml-1.5 mt-2 flex items-center gap-1.5 rounded-full bg-[#294D38] border border-[#FFB800]/50 px-2.5 py-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.22)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                    <span className="text-[10px] font-mono font-semibold tracking-wide text-[#F7F7F3] select-none whitespace-nowrap">
                      {badgeText}
                    </span>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
