'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { technologiesData } from '@/data/skills';

export const Technologies: React.FC = () => {
  return (
    <section id="technologies" className="py-20 sm:py-24 bg-[#0B1117] border-t border-[#17261D] relative">
      <Container size="lg">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1410] border border-[#17261D] text-[#00DC82] text-xs font-mono font-bold uppercase tracking-wider">
            <span>04 / TECHNOLOGIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
            DevOps &amp; cloud engineering tech stack
          </h2>
          <p className="text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
            Tools, cloud services, and protocols I use daily to orchestrate production environments.
          </p>
        </div>

        {/* Categorized Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologiesData.map((group) => (
            <div
              key={group.id}
              className="p-5 rounded-2xl bg-[#0D1410] border border-[#17261D] hover:border-[#00DC82]/50 transition-all duration-200 flex flex-col justify-between space-y-4 group shadow-md"
            >
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold font-mono text-[#00DC82] uppercase tracking-wider">
                  {group.category}
                </h3>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#17261D]">
                {group.skills.map((skill) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  return (
                    <span
                      key={skillName}
                      className="px-2.5 py-1 text-xs font-mono text-[#FFFFFF] bg-[#080D0A] border border-[#17261D] hover:border-[#00DC82] hover:text-[#00DC82] rounded-md transition-colors"
                    >
                      {skillName}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};
