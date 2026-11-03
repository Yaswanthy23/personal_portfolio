'use client';

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  RotateCw, 
  Layers, 
  ShieldCheck, 
  GitBranch, 
  Cpu, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { GitHubIcon } from '@/components/ui/Icons';

export interface ProjectFlipCardProps {
  project: Project;
  className?: string;
}

export const ProjectFlipCard: React.FC<ProjectFlipCardProps> = ({ project, className }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle flip on click/tap (mobile & desktop)
  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  // Keyboard accessibility: toggle on Enter or Space
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={cn('relative w-full h-[520px] select-none [perspective:1200px]', className)}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={`${project.title}. Click or press Enter to flip card for full technical documentation.`}
      onKeyDown={handleKeyDown}
      onClick={handleCardClick}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* 3D Flipper Container */}
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 ease-in-out cursor-pointer [transform-style:preserve-3d]',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        )}
      >
        {/* ================================================================ */}
        {/* FRONT SIDE: Project Overview                                      */}
        {/* ================================================================ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#943E19] border border-[#C4653D] p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#E8B89C]/80 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] overflow-hidden group"
        >
          {/* Subtle decorative glow */}
          <div 
            className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#E8B89C]/10 blur-2xl pointer-events-none" 
            aria-hidden="true"
          />

          {/* Top Block: Category, Year & Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#E8B89C] font-bold tracking-wider uppercase text-[11px] px-2.5 py-0.5 rounded-full bg-[#7D3414] border border-[#C4653D]">
                {project.category}
              </span>
              <span className="text-[#F5EBE1]/70 font-mono text-xs">
                {project.year}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight leading-snug group-hover:text-[#E8B89C] transition-colors">
              {project.title}
            </h3>

            {/* Short Project Summary (2-3 lines) */}
            <p className="text-xs sm:text-sm text-[#F5EBE1]/90 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Architecture Highlights Teaser */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-3 rounded-xl bg-[#7D3414]/90 border border-[#C4653D]/80 space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#E8B89C] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#E8B89C]" />
                  <span>Key Architecture Highlight</span>
                </div>
                <p className="text-xs text-[#F5EBE1] line-clamp-2 leading-relaxed">
                  {project.highlights[0]}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Block: Technology Tags & Flip Prompt */}
          <div className="pt-4 border-t border-[#C4653D]/80 space-y-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#F5EBE1]/60 font-semibold mb-2">
                Tech Stack:
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#7D3414]/60 text-[#E8B89C]">
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Subtle Visual Prompt */}
            <div className="flex items-center justify-between pt-1 text-xs font-mono">
              <span className="text-[#E8B89C] font-semibold flex items-center gap-1 group-hover:underline">
                <span>Hover to explore</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="text-[10px] text-[#F5EBE1]/50 uppercase tracking-widest sm:hidden">
                Tap to flip ⟳
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* BACK SIDE: Complete Project Details                               */}
        {/* ================================================================ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#7D3414] border border-[#C4653D] p-5 sm:p-6 flex flex-col justify-between shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] overflow-hidden"
        >
          {/* Top Header Row of Back Side */}
          <div className="flex items-center justify-between pb-3 border-b border-[#C4653D]/80 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#E8B89C] px-2 py-0.5 rounded bg-[#943E19] border border-[#C4653D]">
                {project.category}
              </span>
              <span className="text-[11px] font-mono text-[#F5EBE1]/70">
                {project.year}
              </span>
            </div>

            {/* Flip Back Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              title="Flip back to front"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#943E19] border border-[#C4653D] text-[#E8B89C] hover:text-[#FFFFFF] hover:border-[#E8B89C] transition-colors text-[11px] font-mono cursor-pointer"
            >
              <RotateCw className="w-3 h-3" />
              <span>Front</span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div 
            className="flex-1 my-3 overflow-y-auto pr-1.5 space-y-4 text-left select-text [scrollbar-width:thin] [scrollbar-color:#C4653D_transparent]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <div>
              <h4 className="text-lg font-extrabold text-[#FFFFFF] leading-snug">
                {project.title}
              </h4>
              <p className="text-xs text-[#E8B89C] mt-0.5 font-medium leading-relaxed">
                {project.tagline || project.description}
              </p>
            </div>

            {/* Problem & Engineering Challenges Solved */}
            {project.problem && (
              <div className="p-3 rounded-xl bg-[#943E19]/90 border border-[#C4653D] space-y-1">
                <div className="text-[10px] font-mono text-[#E8B89C] uppercase font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E8B89C]" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-xs text-[#F5EBE1] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Architecture Overview / Dataflow */}
            {project.architectureOverview && (
              <div className="p-3 rounded-xl bg-[#943E19]/90 border border-[#C4653D] space-y-1.5">
                <div className="text-[10px] font-mono text-[#E8B89C] uppercase font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E8B89C]" />
                  <span>Architecture &amp; Dataflow</span>
                </div>
                <p className="text-xs font-mono text-[#FFFFFF] leading-relaxed break-words">
                  {project.architectureOverview}
                </p>
              </div>
            )}

            {/* CI/CD & Deployment Workflow */}
            {project.workflow && project.workflow.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-[#E8B89C] uppercase font-bold flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-[#E8B89C]" />
                  <span>Pipeline Execution Workflow</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                  {project.workflow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-2 py-0.5 rounded bg-[#943E19] border border-[#C4653D] text-[#FFFFFF]">
                        {step}
                      </span>
                      {idx < project.workflow!.length - 1 && (
                        <span className="text-[#E8B89C] font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Key Technical Decisions & Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-[#E8B89C] uppercase font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E8B89C]" />
                  <span>Key Architecture Decisions</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#F5EBE1]">
                  {project.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#E8B89C] font-bold mt-0.5 shrink-0">▪</span>
                      <span className="leading-relaxed">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* All Technologies Used */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-mono text-[#E8B89C] uppercase font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#E8B89C]" />
                <span>Technologies &amp; Infrastructure Tools</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#943E19] border border-[#C4653D] text-[#F5EBE1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Links on Back Side */}
          <div 
            className="pt-3 border-t border-[#C4653D]/80 flex items-center justify-between gap-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              {project.links.github && project.links.github !== '#' && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FFFFFF] hover:text-[#E8B89C] transition-colors"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {project.links.demo && project.links.demo !== '#' && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E8B89C] hover:text-[#FFFFFF] transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="text-[11px] font-mono text-[#E8B89C] hover:text-[#FFFFFF] flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Overview</span>
              <span>⟲</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

