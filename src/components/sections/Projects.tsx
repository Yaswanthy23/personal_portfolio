import React from 'react';
import { Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { featuredProjects } from '@/data/projects';

export const Projects: React.FC = () => {
  const mainProject = featuredProjects[0];
  const secondaryProjects = featuredProjects.slice(1);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#0B1120] border-t border-[#1E293B]/50 relative">
      <Container size="lg">
        <SectionHeading
          label="03 / PROJECTS"
          title="Things I've built"
          description="Real-world infrastructure code, Kubernetes platforms, and automated delivery pipelines."
        />

        <div className="space-y-12">
          {/* Main Featured Case Study: Enterprise AWS DevOps Platform */}
          {mainProject && (
            <Card className="p-8 sm:p-10 bg-[#101827] border border-[#1E293B] relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                
                {/* Left Side: Overview & Decisions */}
                <div className="lg:w-7/12 space-y-5">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#FF9900]">
                    <span>{mainProject.category}</span>
                    <span>•</span>
                    <span className="text-[#64748B]">{mainProject.year}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#FF9900]/10 border border-[#FF9900]/20 font-semibold">
                      FEATURED ARCHITECTURE
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                    {mainProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    {mainProject.description}
                  </p>

                  {/* Problem & Solution block */}
                  <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
                    <div className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
                      The Engineering Problem
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">
                      {mainProject.problem}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                      Key Architecture Decisions
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#94A3B8]">
                      {mainProject.highlights?.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#FF9900] mt-1 shrink-0">▪</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-3">
                    {mainProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[#070B14] border border-[#1E293B] text-[#94A3B8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Architecture Flow Diagram Preview */}
                <div className="lg:w-5/12 w-full flex flex-col justify-between self-stretch">
                  <div className="p-6 rounded-xl bg-[#070B14] border border-[#1E293B] h-full flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E293B] text-xs font-mono text-[#94A3B8]">
                        <span className="flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-[#FF9900]" />
                          Architecture Flow
                        </span>
                        <span className="text-[#22C55E]">AWS // Multi-AZ</span>
                      </div>

                      {/* Visual Flow Stages */}
                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-3 rounded-lg bg-[#101827] border border-[#1E293B] flex items-center justify-between">
                          <span className="text-[#94A3B8]">1. Ingress</span>
                          <span className="text-[#F8FAFC]">CloudFront • AWS WAF</span>
                        </div>
                        <div className="text-center text-[#64748B] text-xs">↓</div>
                        <div className="p-3 rounded-lg bg-[#101827] border border-[#1E293B] flex items-center justify-between">
                          <span className="text-[#94A3B8]">2. Load Balancing</span>
                          <span className="text-[#FF9900]">Application Load Balancer</span>
                        </div>
                        <div className="text-center text-[#64748B] text-xs">↓</div>
                        <div className="p-3 rounded-lg bg-[#101827] border border-[#1E293B] flex items-center justify-between">
                          <span className="text-[#94A3B8]">3. Compute / K8s</span>
                          <span className="text-[#22D3EE]">Amazon EKS Nodes</span>
                        </div>
                        <div className="text-center text-[#64748B] text-xs">↓</div>
                        <div className="p-3 rounded-lg bg-[#101827] border border-[#1E293B] flex items-center justify-between">
                          <span className="text-[#94A3B8]">4. Storage / DB</span>
                          <span className="text-[#F8FAFC]">KMS Encrypted RDS • S3</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs font-mono text-[#64748B]">
                      <span>IaC: Terraform</span>
                      <span className="text-[#FF9900]">Automated</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Secondary Projects Grid (Kubernetes Platform & CI/CD Platform) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {secondaryProjects.map((project) => (
              <Card
                key={project.id}
                className="p-6 sm:p-8 bg-[#101827] border border-[#1E293B] flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FF9900]">{project.category}</span>
                    <span className="text-[#64748B]">{project.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#FF9900] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Flow preview */}
                  {project.workflow && (
                    <div className="p-3.5 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2 font-mono text-xs">
                      <div className="text-[11px] text-[#64748B] uppercase tracking-wider">
                        Workflow Sequence
                      </div>
                      <div className="text-xs text-[#22D3EE] leading-relaxed">
                        {project.workflow.join(' → ')}
                      </div>
                    </div>
                  )}

                  {/* Key points */}
                  <div className="space-y-1.5 pt-1">
                    {project.highlights?.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                        <span className="text-[#FF9900] mt-0.5">▪</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills & Link */}
                <div className="pt-6 mt-6 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#070B14] border border-[#1E293B] text-[#94A3B8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
