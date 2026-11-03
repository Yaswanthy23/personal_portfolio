'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { profileData } from '@/data/profile';

export interface ProfileImageProps {
  src?: string;
  alt?: string;
  priority?: boolean;
  variant?: 'dark' | 'light';
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
        className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#B4532A]/20 via-[#E8B89C]/30 to-transparent blur-xl transition-opacity duration-500 pointer-events-none opacity-80 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Frame */}
      <div
        className="relative rounded-[18px] p-2 sm:p-2.5 shadow-2xl transition-colors duration-300 bg-[#F5EBE1] border border-[#E8D8CC] hover:border-[#B4532A]/60 shadow-[0_20px_50px_rgba(180,83,42,0.1)]"
      >
        {/* Terracotta Corner Accent Lines */}
        <span
          className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 rounded-tr-[18px] border-[#B4532A] group-hover:border-[#9C431D] pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 rounded-bl-[18px] border-[#B4532A] group-hover:border-[#9C431D] pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Inner Portrait Image Container */}
        <div
          className="relative aspect-[3/4] w-full rounded-[14px] overflow-hidden bg-[#FBF7F4]"
        >
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
