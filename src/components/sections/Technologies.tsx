'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { technologiesData } from '@/data/skills';

export const Technologies: React.FC = () => {
  return (
    <section id="technologies" className="py-20 sm:py-24 bg-[#060907] border-t border-[#19241C] relative">
      <Container size="lg">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1410] border border-[#19241C] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-wider">
            <span>TECHNOLOGIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F4F9F5] tracking-tight">
            DevOps &amp; cloud engineering tech stack
          </h2>
          <p className="text-sm text-[#94A899] max-w-2xl">
            Tools, cloud services, and protocols I use daily to orchestrate production environments.
          </p>
        </div>

        {/* Categorized Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologiesData.map((group) => (
            <div
              key={group.id}
              className="p-5 rounded-2xl bg-[#0E1410] border border-[#19241C] hover:border-[#CCFF00]/40 transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold font-mono text-[#CCFF00] uppercase tracking-wider">
                  {group.category}
                </h3>
                <p className="text-[11px] text-[#667A6B] leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#19241C]">
                {group.skills.map((skill) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  return (
                    <span
                      key={skillName}
                      className="px-2.5 py-1 text-xs font-mono text-[#F4F9F5] bg-[#090D0A] border border-[#19241C] hover:border-[#CCFF00]/50 hover:text-[#CCFF00] rounded-md transition-colors"
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
