'use client';

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
    <section id="projects" className="py-14 sm:py-16 md:py-20 bg-[#B4532A] border-t border-[#9C431D] relative">
      <Container size="lg">
        <SectionHeading
          label="03 / PROJECTS"
          title={
            <>
              <span className="text-[#E8B89C]">Featured architectures</span> &amp; cloud platforms
            </>
          }
          description="Real-world production architectures, infrastructure automation code, and container deployments."
          variant="dark"
        />

        <div className="space-y-8 max-w-5xl">
          {/* Main Hero Project: Enterprise AWS DevOps Platform */}
          {mainProject && (
            <Card className="p-6 sm:p-8 lg:p-10 bg-[#943E19] border border-[#C4653D] relative overflow-hidden group hover:border-[#E8B89C]/50 transition-colors shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                
                {/* Left Side: Deep Project Context */}
                <div className="lg:w-7/12 space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#E8B89C]">
                    <span className="text-[#E8B89C] font-bold">{mainProject.category}</span>
                    <span className="text-[#F5EBE1]/50">•</span>
                    <span className="text-[#F5EBE1]">{mainProject.year}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8B89C] text-[#2A211B] font-bold shadow-sm">
                      FEATURED ARCHITECTURE
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
                    {mainProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#F5EBE1] leading-relaxed">
                    {mainProject.description}
                  </p>

                  {/* Problem & Solution block */}
                  <div className="p-4 rounded-xl bg-[#7D3414] border border-[#C4653D] space-y-2">
                    <div className="text-xs font-mono text-[#E8B89C] uppercase tracking-wider font-bold">
                      The Engineering Problem
                    </div>
                    <p className="text-xs sm:text-sm text-[#F5EBE1]">
                      {mainProject.problem}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#F5EBE1]/90 font-bold">
                      Key Architecture Decisions
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#F5EBE1]">
                      {mainProject.highlights?.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#E8B89C] mt-1 shrink-0 font-bold">▪</span>
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
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Architecture Flow Diagram Preview */}
                <div className="lg:w-5/12 w-full flex flex-col justify-between self-stretch">
                  <div className="p-6 rounded-xl bg-[#7D3414] border border-[#C4653D] h-full flex flex-col justify-between space-y-6 shadow-inner">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C4653D] text-xs font-mono text-[#F5EBE1]">
                        <span className="flex items-center gap-1.5 text-[#E8B89C] font-bold">
                          <Layers className="h-3.5 w-3.5 text-[#E8B89C]" />
                          Architecture Flow
                        </span>
                        <span className="text-[#F5EBE1]/80">AWS // Multi-AZ</span>
                      </div>

                      {/* Visual Flow Stages */}
                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-3 rounded-lg bg-[#943E19] border border-[#C4653D] flex items-center justify-between">
                          <span className="text-[#F5EBE1]">1. Ingress</span>
                          <span className="text-[#FFFFFF]">CloudFront • AWS WAF</span>
                        </div>
                        <div className="text-center text-[#E8B89C] text-xs font-bold">↓</div>
                        <div className="p-3 rounded-lg bg-[#943E19] border border-[#C4653D] flex items-center justify-between">
                          <span className="text-[#F5EBE1]">2. Load Balancing</span>
                          <span className="text-[#E8B89C] font-bold">Application Load Balancer</span>
                        </div>
                        <div className="text-center text-[#E8B89C] text-xs font-bold">↓</div>
                        <div className="p-3 rounded-lg bg-[#943E19] border border-[#C4653D] flex items-center justify-between">
                          <span className="text-[#F5EBE1]">3. Compute / K8s</span>
                          <span className="text-[#E8B89C] font-bold">Amazon EKS Nodes</span>
                        </div>
                        <div className="text-center text-[#E8B89C] text-xs font-bold">↓</div>
                        <div className="p-3 rounded-lg bg-[#943E19] border border-[#C4653D] flex items-center justify-between">
                          <span className="text-[#F5EBE1]">4. Storage / DB</span>
                          <span className="text-[#FFFFFF]">KMS Encrypted RDS • S3</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#C4653D] flex items-center justify-between text-xs font-mono text-[#F5EBE1]">
                      <span>IaC: Terraform</span>
                      <span className="text-[#E8B89C] font-bold">Automated</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Secondary Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {secondaryProjects.map((project) => (
              <Card
                key={project.id}
                className="p-6 sm:p-8 bg-[#943E19] border border-[#C4653D] flex flex-col justify-between group hover:border-[#E8B89C]/50 transition-colors shadow-xl"
              >
                <div className="space-y-4">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#E8B89C] font-bold">{project.category}</span>
                    <span className="text-[#F5EBE1]/70">{project.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#FFFFFF] group-hover:text-[#E8B89C] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#F5EBE1] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Flow preview */}
                  {project.workflow && (
                    <div className="p-3.5 rounded-xl bg-[#7D3414] border border-[#C4653D] space-y-2 font-mono text-xs">
                      <div className="text-[11px] text-[#E8B89C] uppercase tracking-wider font-bold">
                        Workflow Sequence
                      </div>
                      <div className="text-xs text-[#FFFFFF] leading-relaxed">
                        {project.workflow.map((item, idx, arr) => (
                          <React.Fragment key={idx}>
                            <span>{item}</span>
                            {idx < arr.length - 1 && (
                              <span className="text-[#E8B89C] font-bold mx-1">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key points */}
                  <div className="space-y-1.5 pt-1">
                    {project.highlights?.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#F5EBE1]">
                        <span className="text-[#E8B89C] mt-0.5 font-bold">▪</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="pt-6 mt-6 border-t border-[#C4653D] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1]"
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
