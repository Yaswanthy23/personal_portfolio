'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { TechSkillCard } from '@/components/ui/TechSkillCard';
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

        {/* Categorized Tech Grid with Magic UI Custom Pointers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologiesData.map((group) => (
            <TechSkillCard key={group.id} group={group} />
          ))}
        </div>

      </Container>
    </section>
  );
};
