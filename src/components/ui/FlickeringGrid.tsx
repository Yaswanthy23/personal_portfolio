'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

/**
 * Magic UI Flickering Grid Component
 *
 * High-performance HTML5 canvas grid with randomly flickering status squares.
 * - Hardware-accelerated 2D canvas with Retina DPR scaling
 * - Typed Float32Array for memory-efficient frame updates
 * - Responsive to container size changes via ResizeObserver
 * - Automatically pauses rendering when off-screen via IntersectionObserver
 * - Fully non-interactive with pointer-events-none
 */
export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = '#FFB800',
  width,
  height,
  className,
  maxOpacity = 0.15,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Memoized color parser: converts any valid CSS color into an `rgba(r, g, b,` prefix
  const memoizedColor = useMemo(() => {
    if (typeof window === 'undefined') {
      return 'rgba(255, 184, 0,';
    }
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return 'rgba(255, 184, 0,';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    } catch {
      return 'rgba(255, 184, 0,';
    }
  }, [color]);

  // Viewport intersection observer to pause rendering when outside viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ResizeObserver to track container dimensions responsively
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        setDimensions({
          width: Math.floor(w),
          height: Math.floor(h),
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Canvas setup and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetWidth = width || dimensions.width;
    const targetHeight = height || dimensions.height;

    if (targetWidth <= 0 || targetHeight <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = targetWidth * dpr;
    canvas.height = targetHeight * dpr;
    canvas.style.width = `${targetWidth}px`;
    canvas.style.height = `${targetHeight}px`;

    ctx.scale(dpr, dpr);

    const cols = Math.floor(targetWidth / (squareSize + gridGap));
    const rows = Math.floor(targetHeight / (squareSize + gridGap));
    const totalSquares = cols * rows;

    if (totalSquares <= 0) return;

    // Typed array to track opacities
    const squares = new Float32Array(totalSquares);
    for (let i = 0; i < totalSquares; i++) {
      squares[i] = Math.random() * maxOpacity;
    }

    let animationFrameId: number;
    let lastTime = performance.now();
    const interval = 1000 / 30; // 30 FPS update rate for smooth flickering

    const render = (now: number) => {
      const elapsed = now - lastTime;

      if (elapsed > interval) {
        lastTime = now - (elapsed % interval);

        // Update opacities randomly
        for (let i = 0; i < totalSquares; i++) {
          if (Math.random() < flickerChance) {
            squares[i] = Math.random() * maxOpacity;
          }
        }

        // Draw grid
        ctx.clearRect(0, 0, targetWidth, targetHeight);

        let index = 0;
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            const opacity = squares[index];
            if (opacity > 0.005) {
              ctx.fillStyle = `${memoizedColor} ${opacity})`;
              ctx.fillRect(
                col * (squareSize + gridGap),
                row * (squareSize + gridGap),
                squareSize,
                squareSize
              );
            }
            index++;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    dimensions,
    width,
    height,
    squareSize,
    gridGap,
    flickerChance,
    maxOpacity,
    memoizedColor,
    isInView,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full overflow-hidden pointer-events-none', className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};

