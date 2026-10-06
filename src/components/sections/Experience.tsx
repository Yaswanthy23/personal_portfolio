import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { HangingIdCard } from '@/components/ui/HangingIdCard';
import { experienceData } from '@/data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-14 sm:py-16 md:py-20 bg-[#060907] border-t border-[#19241C] relative overflow-hidden">
      {/* Ambient glow for depth */}
      <div
        className="absolute top-1/3 right-10 w-[350px] h-[350px] ambient-glow-lime rounded-full blur-3xl opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <SectionHeading
          label="02 / EXPERIENCE"
          title="Where I've worked"
          description="Real production experience designing, automating, and maintaining cloud infrastructure."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-6 sm:mt-8">
          {/* Left Column: Work Experience Cards */}
          <div className="lg:col-span-8 space-y-6">
            {experienceData.map((item) => (
              <Card
                key={item.id}
                className="p-6 sm:p-7 bg-[#0E1410] border border-[#19241C] relative group hover:border-[#CCFF00]/40 transition-colors"
              >
                {/* Header: Role, Company, Period */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3.5 border-b border-[#19241C]">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F4F9F5]">
                      {item.role}
                    </h3>
                    <div className="text-sm font-medium text-[#CCFF00] mt-0.5">
                      {item.company} <span className="text-[#667A6B] font-normal">• {item.location}</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#94A899] sm:text-right">
                    {item.period}
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="pt-4 space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#667A6B]">
                    Key Responsibilities &amp; Engineering Work
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#94A899] leading-relaxed">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#CCFF00] mt-1 shrink-0 text-xs">▪</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 mt-4 border-t border-[#19241C] flex flex-wrap items-center gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center text-xs font-mono px-2.5 py-1 rounded bg-[#060907] border border-[#19241C] text-[#94A899]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Right Column: Realistic Hanging ID Card */}
          <div className="lg:col-span-4 flex justify-center lg:sticky lg:top-20 -mt-2 sm:-mt-4 lg:-mt-6">
            <HangingIdCard
              name="YASWANTH GEDELA"
              designation="AWS DEVOPS ENGINEER"
              idNumber="987654321"
              validThrough="12/31/2026"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
