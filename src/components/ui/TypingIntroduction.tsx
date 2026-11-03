'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const INTRO_TEXT =
  "Hi, I'm Yaswanth, an AWS DevOps Engineer. I work with AWS, Terraform, Docker, Kubernetes, and CI/CD to build cloud infrastructure and automate application deployments. I enjoy solving real infrastructure problems and turning manual processes into simple, automated solutions.";

// Key phrase highlighting configuration in Terracotta and warm espresso
const HIGHLIGHTS: { phrase: string; className: string }[] = [
  { phrase: 'AWS DevOps Engineer', className: 'text-[#B4532A] font-bold' },
  { phrase: 'Yaswanth', className: 'text-[#2A211B] font-extrabold' },
  { phrase: 'AWS', className: 'text-[#B4532A] font-semibold' },
  { phrase: 'Terraform', className: 'text-[#B4532A] font-semibold' },
  { phrase: 'Docker', className: 'text-[#B4532A] font-semibold' },
  { phrase: 'Kubernetes', className: 'text-[#B4532A] font-semibold' },
  { phrase: 'CI/CD', className: 'text-[#B4532A] font-bold' },
  { phrase: 'automated solutions', className: 'text-[#B4532A] font-bold' },
];

export interface TypingIntroductionProps {
  className?: string;
}

export const TypingIntroduction: React.FC<TypingIntroductionProps> = ({ className }) => {
  const [displayedChars, setDisplayedChars] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayedChars(0);
    setIsDone(false);

    let count = 0;
    const total = INTRO_TEXT.length;

    intervalRef.current = setInterval(() => {
      count += 1;
      setDisplayedChars(count);

      if (count >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsDone(true);
      }
    }, 18);
  };

  useEffect(() => {
    let count = 0;
    const total = INTRO_TEXT.length;

    intervalRef.current = setInterval(() => {
      count += 1;
      setDisplayedChars(count);

      if (count >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsDone(true);
      }
    }, 18);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentSubstr = INTRO_TEXT.slice(0, displayedChars);

  const renderFormattedText = (text: string) => {
    if (!text) return null;

    const pattern = new RegExp(
      `(${HIGHLIGHTS.map((h) => h.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'g'
    );

    const parts = text.split(pattern);

    return parts.map((part, index) => {
      const match = HIGHLIGHTS.find((h) => h.phrase === part);
      if (match) {
        return (
          <span key={index} className={match.className}>
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={cn('relative group max-w-[650px]', className)}>
      <p className="sr-only">{INTRO_TEXT}</p>

      <p
        aria-hidden="true"
        className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] leading-[1.68] text-[#7A6D65] font-normal min-h-[5.5rem] sm:min-h-[5rem] select-text"
      >
        {renderFormattedText(currentSubstr)}
        <span
          className="inline-block font-mono text-[#B4532A] font-bold ml-1 select-none animate-terminal-cursor align-baseline"
          aria-hidden="true"
        >
          ▌
        </span>
      </p>

      {isDone && (
        <button
          onClick={startAnimation}
          type="button"
          title="Replay typing animation"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-[#7A6D65] hover:text-[#B4532A] cursor-pointer"
        >
          <RotateCw className="w-3 h-3" />
          <span>Replay typing</span>
        </button>
      )}
    </div>
  );
};
