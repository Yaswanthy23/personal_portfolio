import React from 'react';
import { ArrowRight, Layers, Cpu, GitBranch, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { profileData } from '@/data/profile';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const AboutPreview: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="h-5 w-5 text-[#FF9900]" />;
      case 'Cpu':
        return <Cpu className="h-5 w-5 text-[#22D3EE]" />;
      case 'GitBranch':
        return <GitBranch className="h-5 w-5 text-[#22C55E]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5 text-[#FF9900]" />;
      default:
        return <Layers className="h-5 w-5 text-[#FF9900]" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-[#111827]/60 border-t border-[#263449]/50 relative">
      <Container size="lg">
        <SectionHeading
          eyebrow="ENGINEERING PHILOSOPHY"
          badgeVariant="orange"
          title="About My Engineering Approach"
          description="A production-first mindset centered on declarative automation, high availability, and secure cloud delivery."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main narrative block */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#172033] border border-[#263449]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF9900]">
                <span>{'// PROFILE OVERVIEW'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                Architecting Cloud Foundations for Modern Applications
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                As an <strong>AWS DevOps Engineer</strong>, I bridge the gap between software development and scalable cloud operations. My focus is on writing robust Infrastructure as Code with <strong>Terraform</strong>, orchestrating resilient microservices on <strong>Amazon EKS</strong>, and building deterministic <strong>CI/CD pipelines</strong>.
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                I believe that modern cloud engineering is not just about provisioning servers, but about creating repeatable, automated, and observable systems that allow teams to ship code rapidly without sacrificing security or uptime.
              </p>
            </div>

            {/* CTA to future full About page/modal */}
            <div className="pt-6 mt-6 border-t border-[#263449] flex items-center justify-between">
              <span className="text-xs font-mono text-[#64748B]">
                Status: {profileData.availability}
              </span>
              <Button
                variant="outline"
                size="md"
                href="#contact"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                More About Me
              </Button>
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profileData.aboutHighlights.map((highlight) => (
              <Card
                key={highlight.title}
                variant="default"
                className="p-5 bg-[#172033] border border-[#263449] hover:border-[#374863] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="inline-flex p-2 rounded-lg bg-[#0B1120] border border-[#263449]">
                    {getIcon(highlight.icon)}
                  </div>
                  <h4 className="text-sm font-bold text-[#F8FAFC]">
                    {highlight.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#263449]/50 flex items-center gap-1.5 text-[11px] font-mono text-[#22C55E]">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Standard Pattern</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
