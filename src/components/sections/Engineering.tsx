import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { engineeringPrinciples } from '@/data/engineering';
import { InteractiveArchitecture } from '@/components/visual/InteractiveArchitecture';
import { DevOpsWorkflow } from '@/components/visual/DevOpsWorkflow';

export const Engineering: React.FC = () => {
  return (
    <section id="engineering" className="py-14 sm:py-16 md:py-20 bg-[#060907] border-t border-[#19241C] relative">
      <Container size="lg">
        <SectionHeading
          label="04 / ENGINEERING"
          title="How I build"
          description="Core engineering principles, modular cloud architectures, and automated deployment pipelines."
        />

        {/* 5 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {engineeringPrinciples.map((principle) => (
            <Card
              key={principle.id}
              className="p-5 sm:p-6 bg-[#0E1410] border border-[#19241C] flex flex-col justify-between space-y-3.5 group hover:border-[#CCFF00]/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#CCFF00]">
                    {principle.number}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19241C] group-hover:bg-[#CCFF00] transition-colors" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#F4F9F5]">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A899] leading-relaxed">
                  {principle.details}
                </p>
              </div>
              <div className="pt-3 border-t border-[#19241C] text-xs font-mono text-[#667A6B]">
                {principle.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Signature Interactive Visuals: Architecture & DevOps Workflow */}
        <div className="space-y-8">
          {/* Interactive Cloud Architecture Visualizer */}
          <InteractiveArchitecture />

          {/* End-to-End DevOps Pipeline Stepper */}
          <DevOpsWorkflow />
        </div>
      </Container>
    </section>
  );
};
