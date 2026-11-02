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
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#0D1410] border border-[#17261D] hover:border-[#00DC82] hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5),0_0_25px_-3px_rgba(0,220,130,0.25)] overflow-hidden">
      {/* Top Diagram / Preview Media */}
      <div className="relative w-full h-48 sm:h-52 bg-[#080D0A] border-b border-[#17261D] overflow-hidden">
        <Image
          src={assetUrl}
          alt={project.asset?.alt || project.title}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#0D1410]/90 text-[#00DC82] border border-[#00DC82]/30 backdrop-blur-sm">
            <Layers className="h-3 w-3" />
            Architecture
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#00DC82] transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowRight className="h-4 w-4 text-[#9CA3AF] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#00DC82]" />
          </h3>

          {/* Tagline / Description */}
          <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#080D0A] border border-[#17261D] text-[#9CA3AF] group-hover:border-[#234230] group-hover:text-[#FFFFFF] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#17261D] flex items-center justify-between gap-3">
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
