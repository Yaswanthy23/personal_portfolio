import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { experienceData } from '@/data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-[#080D17] border-t border-[#1E293B]/50 relative">
      <Container size="lg">
        <SectionHeading
          label="02 / EXPERIENCE"
          title="Where I've worked"
          description="Real production experience designing, automating, and maintaining cloud infrastructure."
        />

        <div className="max-w-4xl space-y-8">
          {experienceData.map((item) => (
            <Card
              key={item.id}
              className="p-6 sm:p-8 bg-[#101827] border border-[#1E293B] relative group"
            >
              {/* Header: Role, Company, Period */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-4 border-b border-[#1E293B]/60">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                    {item.role}
                  </h3>
                  <div className="text-sm font-medium text-[#FF9900] mt-0.5">
                    {item.company} <span className="text-[#64748B] font-normal">• {item.location}</span>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#94A3B8] sm:text-right">
                  {item.period}
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="pt-5 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                  Key Responsibilities & Engineering Work
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  {item.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#FF9900] mt-1.5 shrink-0 text-xs">▪</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-6 mt-6 border-t border-[#1E293B]/60 flex flex-wrap items-center gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center text-xs font-mono px-3 py-1 rounded bg-[#070B14] border border-[#1E293B] text-[#94A3B8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
