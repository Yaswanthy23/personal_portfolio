'use client';

import React, { useEffect, useState } from 'react';

const INTRO_TEXT =
  "Hi, I'm Yaswanth, an AWS DevOps Engineer. I work with AWS, Terraform, Docker, Kubernetes, and CI/CD to build cloud infrastructure and automate application deployments. I enjoy solving real infrastructure problems and turning manual processes into simple, automated solutions.";

const INTRO_WORDS = INTRO_TEXT.split(' ');

export interface TypingIntroductionProps {
  className?: string;
}

export const TypingIntroduction: React.FC<TypingIntroductionProps> = ({
  className,
}) => {
  const [wordIndex, setWordIndex] = useState<number>(0);

  useEffect(() => {
    // If reduced motion is requested, display all words immediately
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const immediate = setTimeout(() => {
        setWordIndex(INTRO_WORDS.length);
      }, 0);
      return () => clearTimeout(immediate);
    }

    // Freeze permanently once complete
    if (wordIndex >= INTRO_WORDS.length) {
      return;
    }

    const timer = setTimeout(() => {
      setWordIndex((prev) => prev + 1);
    }, 80);

    return () => clearTimeout(timer);
  }, [wordIndex]);

  const visibleText = INTRO_WORDS.slice(0, wordIndex).join(' ');

  return (
    <div className={className}>
      {/* Accessible static element for screen readers & SEO */}
      <p className="sr-only">{INTRO_TEXT}</p>

      {/* Visual progressively typed introduction that freezes upon completion */}
      <p
        aria-hidden="true"
        className="text-[18px] sm:text-[20px] md:text-[21px] lg:text-[23px] leading-[1.7] text-[#CBD5E1] font-normal select-text"
      >
        <span>{visibleText}</span>
        <span
          className="inline-block font-mono text-[#FF9900] font-bold ml-1.5 select-none animate-terminal-cursor align-baseline"
          aria-hidden="true"
        >
          ▌
        </span>
      </p>
    </div>
  );
};
