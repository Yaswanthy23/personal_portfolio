import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TagCloud3D } from '@/components/ui/TagCloud3D';
import { profileData } from '@/data/profile';
import { ShieldCheck, Terminal, Layers, Server } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 md:py-20 bg-[#0A0F0C] border-t border-[#19241C] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-1/2 left-10 -translate-y-1/2 w-[350px] h-[350px] ambient-glow-lime rounded-full blur-3xl opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Interactive 3D Skills Sphere Tag Cloud */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <TagCloud3D />
          </div>

          {/* Right Column: About Section Narrative & Technical Story */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              label="01 / ABOUT"
              title="A little about me"
              description="Transforming manual operations into scalable, self-healing cloud infrastructure."
            />

            <div className="space-y-4 text-sm sm:text-base text-[#94A899] leading-relaxed">
              <p>
                {profileData.aboutStory.intro}
              </p>

              <p>
                {profileData.aboutStory.focus}
              </p>

              <p>
                {profileData.aboutStory.journey}
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="pt-4 border-t border-[#19241C] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#F4F9F5]">
                <ShieldCheck className="h-4 w-4 text-[#CCFF00] shrink-0" />
                <span>Security &amp; IAM Least-Privilege</span>
              </div>
              <div className="flex items-center gap-2 text-[#F4F9F5]">
                <Layers className="h-4 w-4 text-[#38BDF8] shrink-0" />
                <span>Zero-Drift Terraform IaC</span>
              </div>
              <div className="flex items-center gap-2 text-[#F4F9F5]">
                <Server className="h-4 w-4 text-[#22C55E] shrink-0" />
                <span>High-Availability Kubernetes</span>
              </div>
              <div className="flex items-center gap-2 text-[#F4F9F5]">
                <Terminal className="h-4 w-4 text-[#CCFF00] shrink-0" />
                <span>Automated CI/CD Workflows</span>
              </div>
            </div>

            {/* Clean Status Footer */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-t border-[#19241C]">
              <div className="flex items-center gap-1.5 text-[#94A899]">
                <span>Focus:</span>
                <span className="text-[#F4F9F5]">AWS Cloud • Terraform • Kubernetes • CI/CD</span>
              </div>
              <div className="flex items-center gap-2 text-[#CCFF00]">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span>{profileData.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
