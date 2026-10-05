'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TypingIntroductionProps {
  text?: string;
  className?: string;
  cursorChar?: string;
  baseDelayMs?: number;
  initialDelayMs?: number;
  showCursorAfterComplete?: boolean;
}

const DEFAULT_INTRO =
  "Hi, I'm Yaswanth, an AWS DevOps Engineer. I work with AWS, Terraform, Docker, Kubernetes, and CI/CD to build cloud infrastructure and automate application deployments. I enjoy solving real infrastructure problems and turning manual processes into simple, automated solutions.";

export const TypingIntroduction: React.FC<TypingIntroductionProps> = ({
  text = DEFAULT_INTRO,
  className,
  cursorChar = '▌',
  baseDelayMs = 60,
  initialDelayMs = 200,
  showCursorAfterComplete = true,
}) => {
  const words = useMemo(() => (text ? text.trim().split(/\s+/) : []), [text]);
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedCount(words.length);
          setIsComplete(true);
        }, 0);
        return;
      }
    }

    let currentIndex = 0;

    const step = () => {
      if (currentIndex < words.length) {
        currentIndex += 1;
        setDisplayedCount(currentIndex);

        if (currentIndex < words.length) {
          const currentWord = words[currentIndex - 1] || '';
          let nextDelay = baseDelayMs;

          // Natural human cadence: pauses for punctuation
          if (/[.!?]$/.test(currentWord)) {
            nextDelay += 130; // sentence boundary pause
          } else if (/[,;:]$/.test(currentWord)) {
            nextDelay += 70; // clause boundary pause
          }

          // Subtle organic variance (+/- 8ms)
          const variance = Math.floor(Math.random() * 16) - 8;
          timeoutRef.current = setTimeout(step, Math.max(30, nextDelay + variance));
        } else {
          setIsComplete(true);
        }
      }
    };

    timeoutRef.current = setTimeout(step, initialDelayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words, baseDelayMs, initialDelayMs]);

  const displayedText = useMemo(() => {
    if (displayedCount >= words.length) {
      return text;
    }
    return words.slice(0, displayedCount).join(' ');
  }, [words, displayedCount, text]);

  return (
    <div className={cn('relative', className)}>
      {/* Accessible text for screen readers & SEO bots */}
      <span className="sr-only">{text}</span>

      {/* Invisible layout spacer to reserve exact height and avoid layout shift */}
      <span aria-hidden="true" className="invisible select-none pointer-events-none block">
        {text}
        {/* Reservation for cursor width */}
        <span className="inline-block w-2 ml-0.5" />
      </span>

      {/* Visual progressively typed introduction with terminal cursor */}
      <span aria-hidden="true" className="absolute inset-0 top-0 left-0 block">
        <span>{displayedText}</span>
        {(showCursorAfterComplete || !isComplete) && (
          <span
            className={cn(
              'inline-block font-mono font-bold ml-1 select-none text-[#FF9900] align-baseline transition-opacity',
              'animate-terminal-cursor'
            )}
          >
            {cursorChar}
          </span>
        )}
      </span>
    </div>
  );
};
