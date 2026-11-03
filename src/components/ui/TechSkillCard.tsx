'use client';

import React from 'react';
import { SkillCategory } from '@/types';
import { Pointer } from '@/components/ui/Pointer';
import { cn } from '@/lib/utils';

interface TechSkillCardProps {
  group: SkillCategory;
  className?: string;
}

export const TechSkillCard: React.FC<TechSkillCardProps> = ({ group, className }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden p-5 rounded-2xl bg-[#F5EBE1] border border-[#E8D8CC] hover:border-[#B4532A]/50 transition-all duration-200 flex flex-col justify-between space-y-4 group shadow-md',
        '[@media(hover:hover)]:hover:cursor-none [@media(hover:hover)]:hover:[&_*]:cursor-none',
        className
      )}
    >
      {/* Magic UI Custom Animated Pointer */}
      <Pointer badgeText={group.category} />

      {/* Header Info */}
      <div className="space-y-1.5 relative z-10">
        <h3 className="text-sm font-bold font-mono text-[#B4532A] uppercase tracking-wider">
          {group.category}
        </h3>
        <p className="text-[11px] text-[#7A6D65] leading-relaxed">
          {group.description}
        </p>
      </div>

      {/* Skills Badges */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8D8CC] relative z-10">
        {group.skills.map((skill) => {
          const skillName = typeof skill === 'string' ? skill : skill.name;
          return (
            <span
              key={skillName}
              className="px-2.5 py-1 text-xs font-mono text-[#2A211B] bg-[#FFFFFF] border border-[#E8D8CC] hover:border-[#B4532A] hover:text-[#B4532A] rounded-md transition-colors font-medium shadow-xs"
            >
              {skillName}
            </span>
          );
        })}
      </div>
    </div>
  );
};

