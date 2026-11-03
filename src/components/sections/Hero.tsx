'use client';

import React from 'react';
import { ArrowDown, FileText, Mail } from 'lucide-react';
import { profileData } from '@/data/profile';
import { socialLinks } from '@/data/social';
import { Container } from '@/components/ui/Container';
import { TypingIntroduction } from '@/components/ui/TypingIntroduction';
import { RotatingSkills } from '@/components/ui/RotatingSkills';
import { ProfileImage } from '@/components/ui/ProfileImage';
import { InfrastructureBackground } from '@/components/visual/InfrastructureBackground';
import { FloatingTechIcons } from '@/components/visual/FloatingTechIcons';
import { Dock, DockIcon } from '@/components/ui/Dock';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

export const Hero: React.FC = () => {
  const githubLink = socialLinks.find((s) => s.id === 'github')?.href || 'https://github.com/Yaswanthy23';
  const linkedinLink = socialLinks.find((s) => s.id === 'linkedin')?.href || 'https://www.linkedin.com/in/yaswanth-gedela-84946b250/';
  const emailLink = socialLinks.find((s) => s.id === 'email')?.href || 'mailto:yaswanthgedela27@gmail.com';

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 75;
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
      className="relative flex items-center pt-16 pb-12 sm:pt-18 sm:pb-14 md:pt-20 md:pb-16 overflow-hidden bg-[#FBF7F4] engineering-grid"
    >
      {/* Ambient Lighting */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] ambient-glow-sand rounded-full blur-3xl opacity-50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[400px] h-[260px] ambient-glow-terracotta rounded-full blur-3xl opacity-35 pointer-events-none"
        aria-hidden="true"
      />

      {/* Infrastructure Network Topology Background */}
      <InfrastructureBackground />

      {/* Subtle DevOps Technology Floating Background Icons */}
      <FloatingTechIcons />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Name, Role Label, Personal Introduction, Rotating Skills, CTAs & Social Dock */}
          <div className="lg:col-span-7 flex flex-col text-left order-1">
            
            {/* 1. Name & Role Block */}
            <div className="space-y-2 sm:space-y-2.5">
              <h1 className="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[60px] font-extrabold tracking-[-0.02em] text-[#B4532A] leading-[0.95] select-text">
                YASWANTH
              </h1>

              {/* 2. Role Eyebrow with Terracotta Dot & Text */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#B4532A] shadow-[0_0_8px_#B4532A]" />
                <span className="font-mono text-[12px] sm:text-[13px] font-bold tracking-[0.1em] text-[#B4532A] uppercase leading-[1.2]">
                  {profileData.eyebrow}
                </span>
              </div>
            </div>

            {/* 3. Single Primary Personal Introduction with Typewriter */}
            <div className="mt-7 sm:mt-8">
              <TypingIntroduction className="max-w-[650px]" />
            </div>

            {/* 4. Rotating Skills Line */}
            <div className="mt-5 sm:mt-6">
              <RotatingSkills />
            </div>

            {/* 5. Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-7 sm:mt-8">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center text-sm font-semibold px-7 py-3 gap-2 bg-[#B4532A] text-[#FFFFFF] rounded-full hover:bg-[#9C431D] hover:shadow-[0_4px_20px_rgba(180,83,42,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all font-mono uppercase font-bold"
              >
                <span>View My Work</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center text-sm font-semibold px-7 py-3 gap-2 bg-[#F5EBE1] border border-[#E8D8CC] text-[#2A211B] rounded-full hover:border-[#B4532A] hover:bg-[#B4532A] hover:text-[#FFFFFF] hover:-translate-y-0.5 active:translate-y-0 transition-all font-mono uppercase font-bold"
              >
                <FileText className="h-4 w-4 text-[#B4532A] group-hover:text-inherit transition-colors" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* 6. Interactive Social Dock (GitHub, LinkedIn, Email) */}
            <div className="pt-6 mt-6 max-w-lg border-t border-[#E8D8CC]">
              <TooltipProvider>
                <Dock direction="middle">
                  {/* GitHub */}
                  <DockIcon>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="flex items-center justify-center w-full h-full rounded-xl text-[#7A6D65] hover:text-[#2A211B]"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  </DockIcon>

                  {/* LinkedIn */}
                  <DockIcon>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="flex items-center justify-center w-full h-full rounded-xl text-[#7A6D65] hover:text-[#B4532A]"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>LinkedIn</p>
                      </TooltipContent>
                    </Tooltip>
                  </DockIcon>

                  {/* Email */}
                  <DockIcon>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={emailLink}
                          aria-label="Send Email"
                          className="flex items-center justify-center w-full h-full rounded-xl text-[#7A6D65] hover:text-[#B4532A]"
                        >
                          <Mail className="w-5 h-5 text-current" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send Email</p>
                      </TooltipContent>
                    </Tooltip>
                  </DockIcon>
                </Dock>
              </TooltipProvider>
            </div>
          </div>

          {/* Right Column: Clean DevOps Portrait Image */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end order-2">
            <ProfileImage />
          </div>
        </div>
      </Container>
    </section>
  );
};
