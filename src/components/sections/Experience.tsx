import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { HangingIdCard } from '@/components/ui/HangingIdCard';
import { experienceData } from '@/data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-14 sm:py-16 md:py-20 bg-[#0B1117] border-t border-[#17261D] relative overflow-hidden">
      {/* Ambient glow for depth */}
      <div
        className="absolute top-1/3 right-10 w-[350px] h-[350px] ambient-glow-green rounded-full blur-3xl opacity-20 pointer-events-none"
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
                className="p-6 sm:p-7 bg-[#0D1410] border border-[#17261D] relative group hover:border-[#00DC82]/50 transition-colors shadow-lg"
              >
                {/* Header: Role, Company, Period */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3.5 border-b border-[#17261D]">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF]">
                      {item.role}
                    </h3>
                    <div className="text-sm font-medium text-[#00DC82] mt-0.5">
                      {item.company} <span className="text-[#64748B] font-normal">• {item.location}</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#9CA3AF] sm:text-right">
                    {item.period}
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="pt-4 space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                    Key Responsibilities &amp; Engineering Work
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#00DC82] mt-1 shrink-0 text-xs">▪</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 mt-4 border-t border-[#17261D] flex flex-wrap items-center gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center text-xs font-mono px-2.5 py-1 rounded bg-[#080D0A] border border-[#17261D] text-[#9CA3AF]"
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
