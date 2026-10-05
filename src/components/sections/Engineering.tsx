import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { engineeringPrinciples } from '@/data/engineering';
import { InteractiveArchitecture } from '@/components/visual/InteractiveArchitecture';
import { DevOpsWorkflow } from '@/components/visual/DevOpsWorkflow';

export const Engineering: React.FC = () => {
  return (
    <section id="engineering" className="py-24 md:py-32 bg-[#070B14] border-t border-[#1E293B]/50 relative">
      <Container size="lg">
        <SectionHeading
          label="04 / ENGINEERING"
          title="How I build"
          description="Core engineering principles, modular cloud architectures, and automated deployment pipelines."
        />

        {/* 5 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {engineeringPrinciples.map((principle) => (
            <Card
              key={principle.id}
              className="p-6 bg-[#101827] border border-[#1E293B] flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#FF9900]">
                    {principle.number}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E293B] group-hover:bg-[#FF9900] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {principle.details}
                </p>
              </div>
              <div className="pt-3 border-t border-[#1E293B]/60 text-xs font-mono text-[#64748B]">
                {principle.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Signature Interactive Visuals: Architecture & DevOps Workflow */}
        <div className="space-y-12">
          {/* Interactive Cloud Architecture Visualizer */}
          <InteractiveArchitecture />

          {/* End-to-End DevOps Pipeline Stepper */}
          <DevOpsWorkflow />
        </div>
      </Container>
    </section>
  );
};
