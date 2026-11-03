'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectFlipCard } from '@/components/ui/ProjectFlipCard';
import { featuredProjects } from '@/data/projects';

export const Projects: React.FC = () => {
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
          description="Interactive 3D showcases of real-world production architectures, infrastructure automation codebases, and container deployments."
          variant="dark"
        />

        {/* 3-Column Responsive Grid on Desktop, 2-Column on Tablet, 1-Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {featuredProjects.map((project) => (
            <ProjectFlipCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
};
