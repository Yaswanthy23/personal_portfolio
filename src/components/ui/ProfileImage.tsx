'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { profileData } from '@/data/profile';

export interface ProfileImageProps {
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src = profileData.profileImage?.src || '/images/profile-placeholder.png',
  alt = profileData.profileImage?.alt || 'DevOps engineer working with cloud infrastructure',
  priority = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] select-none mx-auto lg:mx-0',
        className
      )}
    >
      {/* Subtle Glow Aura behind the card */}
      <div
        className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#CCFF00]/15 via-transparent to-[#38BDF8]/10 blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Technical Frame */}
      <div className="relative rounded-[16px] bg-[#0E1410] border border-[#19241C] p-2 sm:p-2.5 shadow-2xl transition-colors duration-300 hover:border-[#243529]">
        
        {/* Subtle Lime Corner Accent Lines (#CCFF00) */}
        <span
          className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#CCFF00]/80 rounded-tr-[16px] pointer-events-none transition-opacity duration-300 group-hover:border-[#CCFF00]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#CCFF00]/80 rounded-bl-[16px] pointer-events-none transition-opacity duration-300 group-hover:border-[#CCFF00]"
          aria-hidden="true"
        />

        {/* Inner Portrait Image Container */}
        <div className="relative aspect-[3/4] w-full rounded-[12px] overflow-hidden bg-[#060907]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 360px"
            priority={priority}
            className="object-cover object-top transition-transform duration-300 sm:duration-400 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transform-none"
          />
        </div>
      </div>
    </div>
  );
};

