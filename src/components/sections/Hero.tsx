'use client';

import React from 'react';
import { ArrowDown, ExternalLink, CheckCircle } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/Icons';
import { profileData } from '@/data/profile';
import { socialLinks } from '@/data/social';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TerminalPrompt } from '@/components/ui/TerminalPrompt';
import { HeroArchitectureVisual } from '@/components/visual/HeroArchitectureVisual';

export const Hero: React.FC = () => {
  const githubLink = socialLinks.find((s) => s.id === 'github')?.href || '#';

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden tech-grid-bg"
    >
      {/* Subtle radial lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF9900]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Terminal status bar */}
            <div className="flex items-center gap-3">
              <Badge variant="orange" size="sm" dot>
                {profileData.role.toUpperCase()}
              </Badge>
              <span className="hidden sm:inline-block text-xs font-mono text-[#94A3B8]">
                us-east-1 // ACTIVE
              </span>
            </div>

            {/* Subtle Terminal Whoami Prompt */}
            <TerminalPrompt
              command={profileData.terminalWhoami.command}
              user="yaswanth"
              host="devops"
            />

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC]">
                Engineering Scalable, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] via-[#F8FAFC] to-[#22D3EE]">
                  Automated Cloud Systems.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl leading-relaxed">
                {profileData.terminalWhoami.tagline} Focused on Infrastructure as Code, Kubernetes clusters, and zero-downtime CI/CD pipelines.
              </p>
            </div>

            {/* Technology Keywords Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {profileData.heroKeywords.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center text-xs font-mono px-3 py-1 rounded bg-[#172033] border border-[#263449] text-[#F8FAFC] hover:border-[#FF9900]/40 transition-colors"
                >
                  <span className="text-[#FF9900] mr-1.5">•</span>
                  {tech}
                </span>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] rounded-md cursor-pointer text-sm px-5 py-3 gap-2 bg-[#FF9900] text-[#0B1120] font-semibold hover:bg-[#E08700] active:scale-[0.98] shadow-sm hover:shadow-[0_0_20px_rgba(255,153,0,0.3)]"
              >
                <span>Explore My Work</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <Button
                variant="secondary"
                size="md"
                href={githubLink}
                isExternal
                leftIcon={<GitHubIcon className="h-4 w-4" />}
                rightIcon={<ExternalLink className="h-3.5 w-3.5 text-[#64748B]" />}
              >
                GitHub Profile
              </Button>
            </div>

            {/* Reliability Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#263449]/70 max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0" />
                <span className="text-xs font-mono text-[#94A3B8]">IaC Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0" />
                <span className="text-xs font-mono text-[#94A3B8]">EKS Production</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0" />
                <span className="text-xs font-mono text-[#94A3B8]">Security First</span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Architecture Visual */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <HeroArchitectureVisual />
          </div>
        </div>
      </Container>
    </section>
  );
};
