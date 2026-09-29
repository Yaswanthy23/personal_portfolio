import React from 'react';
import { 
  Cloud, 
  Boxes, 
  Box, 
  Cpu, 
  GitMerge, 
  Terminal, 
  Check, 
  Layers 
} from 'lucide-react';
import { techStackData } from '@/data/skills';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export const TechStack: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'cloud':
        return <Cloud className="h-5 w-5 text-[#FF9900]" />;
      case 'boxes':
        return <Boxes className="h-5 w-5 text-[#FF9900]" />;
      case 'box':
        return <Box className="h-5 w-5 text-[#22D3EE]" />;
      case 'cpu':
        return <Cpu className="h-5 w-5 text-[#22D3EE]" />;
      case 'gitmerge':
        return <GitMerge className="h-5 w-5 text-[#22C55E]" />;
      case 'terminal':
        return <Terminal className="h-5 w-5 text-[#94A3B8]" />;
      default:
        return <Layers className="h-5 w-5 text-[#FF9900]" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#0B1120] border-t border-[#263449]/50 relative">
      <Container size="lg">
        <SectionHeading
          eyebrow="CORE COMPETENCIES"
          badgeVariant="cyan"
          title="Technologies I Work With"
          description="A production-tested toolchain focused on cloud automation, declarative infrastructure, container lifecycle management, and resilient delivery pipelines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStackData.map((category) => (
            <Card
              key={category.id}
              variant="default"
              className="p-6 border border-[#263449] hover:border-[#374863] transition-all duration-200 bg-[#172033]/90 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0B1120] border border-[#263449] group-hover:border-[#FF9900]/40 transition-colors">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#F8FAFC]">
                        {category.category}
                      </h3>
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {category.skills.length} core tools
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Pills / Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                        skill.isPrimary
                          ? 'bg-[#0B1120] text-[#F8FAFC] border border-[#FF9900]/40 font-semibold'
                          : 'bg-[#111827] text-[#94A3B8] border border-[#263449] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {skill.isPrimary && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF9900]" />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag note */}
              <div className="mt-6 pt-4 border-t border-[#263449]/60 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>Category verified</span>
                <span className="text-[#22C55E] flex items-center gap-1">
                  <Check className="h-3 w-3" /> Production Grade
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
