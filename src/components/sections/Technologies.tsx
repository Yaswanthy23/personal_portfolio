import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { technologiesData } from '@/data/skills';

export const Technologies: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-[#0A0F1A] border-t border-[#1E293B]/50 relative">
      <Container size="lg">
        <SectionHeading
          label="06 / TECHNOLOGIES"
          title="Tools I work with"
          description="A curated stack of cloud platforms, IaC tooling, container systems, and automation frameworks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologiesData.map((group) => (
            <Card
              key={group.id}
              className="p-6 bg-[#101827] border border-[#1E293B] flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]/60">
                  <h3 className="text-base font-bold text-[#F8FAFC]">
                    {group.category}
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
                </div>
                {group.description && (
                  <p className="text-xs text-[#64748B]">
                    {group.description}
                  </p>
                )}

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(group.skills as string[]).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#2A3B52] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
