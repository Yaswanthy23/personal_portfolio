import React from 'react';
import { featuredProjects } from '@/data/projects';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-[#0B1120] border-t border-[#263449]/50 relative">
      <Container size="lg">
        <SectionHeading
          eyebrow="PORTFOLIO PREVIEW"
          badgeVariant="orange"
          title="Featured Work"
          description="Selected cloud infrastructure and DevOps platform architectures built with modern automation and container orchestration standards."
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Scalability / Extensibility note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-[#64748B]">
            {'// Additional deep-dive architectural case studies and live demos can be slotted incrementally.'}
          </p>
        </div>
      </Container>
    </section>
  );
};
