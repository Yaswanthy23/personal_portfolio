import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profileData } from '@/data/profile';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#0A0F1A] border-t border-[#1E293B]/50 relative">
      <Container size="lg">
        <SectionHeading
          label="01 / ABOUT"
          title="A little about me"
        />

        {/* Editorial Story Layout with Comfortable Reading Width */}
        <div className="max-w-3xl space-y-6 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-normal">
          <p>
            {profileData.aboutStory.intro}
          </p>

          <p>
            {profileData.aboutStory.focus}
          </p>

          <p>
            {profileData.aboutStory.journey}
          </p>

          {/* Clean metadata quote or status */}
          <div className="pt-6 border-t border-[#1E293B]/70 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
            <div>
              <span>Focus: </span>
              <span className="text-[#F8FAFC]">AWS Cloud • Terraform • Kubernetes • CI/CD</span>
            </div>
            <div>
              <span>Status: </span>
              <span className="text-[#22C55E]">Open for Engineering Roles</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
