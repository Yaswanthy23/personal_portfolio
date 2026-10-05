'use client';

import React from 'react';
import { ArrowDown, FileText, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { profileData } from '@/data/profile';
import { socialLinks } from '@/data/social';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TypingIntroduction } from '@/components/ui/TypingIntroduction';
import { ProfileImage } from '@/components/ui/ProfileImage';
import { InfrastructureBackground } from '@/components/visual/InfrastructureBackground';

export const Hero: React.FC = () => {
  const githubLink = socialLinks.find((s) => s.id === 'github')?.href || '#';
  const linkedinLink = socialLinks.find((s) => s.id === 'linkedin')?.href || '#';
  const emailLink = socialLinks.find((s) => s.id === 'email')?.href || '#';

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-[#070B14] engineering-grid"
    >
      {/* Layer 3 — Very Low-Opacity Ambient Lighting */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] ambient-glow-orange rounded-full blur-3xl opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[400px] h-[260px] ambient-glow-cyan rounded-full blur-3xl opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Infrastructure Network Topology Background */}
      <InfrastructureBackground />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Role Label, Personal Introduction, CTAs & Socials */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-1">
            
            {/* Role Eyebrow with Small Orange Dot */}
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#FF9900]" />
              <span className="font-mono text-[12px] sm:text-[13px] font-semibold tracking-wider text-[#FF9900] uppercase">
                {profileData.eyebrow}
              </span>
            </div>

            {/* Single Primary Personal Introduction with Word-by-Word Typing */}
            <div className="pt-1">
              <TypingIntroduction className="max-w-[660px]" />
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 sm:pt-6">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center text-sm font-semibold px-6 py-3 gap-2 bg-[#FF9900] text-[#070B14] rounded-lg hover:bg-[#E08700] hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
              >
                <span>View My Work</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <Button
                variant="secondary"
                size="md"
                href={profileData.resumeUrl}
                isExternal
                leftIcon={<FileText className="h-4 w-4 text-[#94A3B8]" />}
              >
                Download Resume
              </Button>
            </div>

            {/* Secondary Social Links */}
            <div className="flex items-center gap-6 pt-5 text-xs font-mono text-[#64748B] border-t border-[#1E293B]/60 max-w-lg">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span>GitHub</span>
              </a>
              <span>•</span>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span>LinkedIn</span>
              </a>
              <span>•</span>
              <a
                href={emailLink}
                className="flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors"
                aria-label="Email"
              >
                <Mail className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean DevOps Portrait Image */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end order-2 lg:order-2 lg:-translate-y-[35px] md:-translate-y-[20px] translate-y-0">
            <ProfileImage />
          </div>
        </div>
      </Container>
    </section>
  );
};
