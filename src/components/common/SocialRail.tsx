'use client';

import React from 'react';
import { Mail, Terminal } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { socialLinks } from '@/data/social';

export const SocialRail: React.FC = () => {
  const githubLink = socialLinks.find((s) => s.id === 'github')?.href || 'https://github.com/Yaswanthy23';
  const linkedinLink = socialLinks.find((s) => s.id === 'linkedin')?.href || 'https://www.linkedin.com/in/yaswanth-gedela-84946b250/';
  const emailLink = socialLinks.find((s) => s.id === 'email')?.href || 'mailto:yaswanthgedela27@gmail.com';

  return (
    <aside
      aria-label="Social links rail"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-5 p-2 rounded-full bg-[#FAF5F0]/90 border border-[#E8D8CC] backdrop-blur-md shadow-lg shadow-[#2A211B]/5"
    >
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="p-2 text-[#7A6D65] hover:text-[#B4532A] hover:bg-[#B4532A]/10 rounded-full transition-all duration-200"
      >
        <GitHubIcon className="h-4 w-4" />
      </a>

      <a
        href={linkedinLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="p-2 text-[#7A6D65] hover:text-[#B4532A] hover:bg-[#B4532A]/10 rounded-full transition-all duration-200"
      >
        <LinkedInIcon className="h-4 w-4" />
      </a>

      <a
        href={emailLink}
        aria-label="Email Yaswanth"
        className="p-2 text-[#7A6D65] hover:text-[#B4532A] hover:bg-[#B4532A]/10 rounded-full transition-all duration-200"
      >
        <Mail className="h-4 w-4" />
      </a>

      <a
        href="#technologies"
        aria-label="DevOps Tech Stack"
        className="p-2 text-[#7A6D65] hover:text-[#B4532A] hover:bg-[#B4532A]/10 rounded-full transition-all duration-200"
      >
        <Terminal className="h-4 w-4" />
      </a>
    </aside>
  );
};
