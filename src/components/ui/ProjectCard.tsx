'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/Icons';
import { Project } from '@/types';
import { getAssetUrl } from '@/lib/cloudinary';
import { Button } from '@/components/ui/Button';

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const assetUrl = getAssetUrl(project.asset?.url || '/assets/placeholders/default-diagram.svg');

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#943E19] border border-[#C4653D] hover:border-[#E8B89C] hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.3),0_0_25px_-3px_rgba(232,184,156,0.2)] overflow-hidden">
      {/* Top Diagram / Preview Media */}
      <div className="relative w-full h-48 sm:h-52 bg-[#7D3414] border-b border-[#C4653D] overflow-hidden">
        <Image
          src={assetUrl}
          alt={project.asset?.alt || project.title}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#943E19]/90 text-[#E8B89C] border border-[#E8B89C]/30 backdrop-blur-sm">
            <Layers className="h-3 w-3" />
            Architecture
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#E8B89C] transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowRight className="h-4 w-4 text-[#F5EBE1] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#E8B89C]" />
          </h3>

          {/* Tagline / Description */}
          <p className="text-xs sm:text-sm text-[#F5EBE1] leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1] group-hover:border-[#E8B89C]/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#C4653D] flex items-center justify-between gap-3">
          <Button
            variant="primary"
            size="sm"
            href={`#contact`}
            rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
          >
            View Project
          </Button>

          <Button
            variant="secondary"
            size="sm"
            href={project.links.github || '#'}
            isExternal
            leftIcon={<GitHubIcon className="h-3.5 w-3.5" />}
          >
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};
