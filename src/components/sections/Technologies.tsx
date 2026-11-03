'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { technologiesData } from '@/data/skills';

export const Technologies: React.FC = () => {
  return (
    <section id="technologies" className="py-20 sm:py-24 bg-[#FBF7F4] border-t border-[#E8D8CC] relative">
      <Container size="lg">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBE1] border border-[#E8D8CC] text-[#B4532A] text-xs font-mono font-bold uppercase tracking-wider">
            <span>04 / TECHNOLOGIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A211B] tracking-tight">
            <span className="text-[#B4532A]">DevOps &amp; cloud engineering</span> tech stack
          </h2>
          <p className="text-sm text-[#7A6D65] max-w-2xl leading-relaxed">
            Tools, cloud services, and protocols I use daily to orchestrate production environments.
          </p>
        </div>

        {/* Categorized Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologiesData.map((group) => (
            <div
              key={group.id}
              className="p-5 rounded-2xl bg-[#F5EBE1] border border-[#E8D8CC] hover:border-[#B4532A]/50 transition-all duration-200 flex flex-col justify-between space-y-4 group shadow-md"
            >
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold font-mono text-[#B4532A] uppercase tracking-wider">
                  {group.category}
                </h3>
                <p className="text-[11px] text-[#7A6D65] leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8D8CC]">
                {group.skills.map((skill) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  return (
                    <span
                      key={skillName}
                      className="px-2.5 py-1 text-xs font-mono text-[#2A211B] bg-[#FFFFFF] border border-[#E8D8CC] hover:border-[#B4532A] hover:text-[#B4532A] rounded-md transition-colors font-medium shadow-xs"
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
