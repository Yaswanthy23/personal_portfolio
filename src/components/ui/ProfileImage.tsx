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
  variant = 'dark',
  className,
}) => {
  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        'group relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] select-none mx-auto lg:mx-0',
        className
      )}
    >
      {/* Subtle Glow Aura behind the card */}
      <div
        className={cn(
          'absolute -inset-2 rounded-2xl bg-gradient-to-tr to-transparent blur-xl transition-opacity duration-500 pointer-events-none',
          isLight
            ? 'from-[#059669]/20 via-[#34D399]/10 opacity-60 group-hover:opacity-90'
            : 'from-[#00DC82]/25 via-[#34D399]/10 opacity-70 group-hover:opacity-100'
        )}
        aria-hidden="true"
      />

      {/* Frame */}
      <div
        className={cn(
          'relative rounded-[18px] p-2 sm:p-2.5 shadow-2xl transition-colors duration-300',
          isLight
            ? 'bg-white/85 border border-[#E5DFD3] shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm hover:border-[#059669]/40'
            : 'bg-[#0D1410] border border-[#17261D] hover:border-[#234230]'
        )}
      >
        {/* Emerald Corner Accent Lines */}
        <span
          className={cn(
            'absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 rounded-tr-[18px] pointer-events-none transition-opacity duration-300',
            isLight
              ? 'border-[#059669] group-hover:border-[#047857]'
              : 'border-[#00DC82] group-hover:border-[#34D399]'
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 rounded-bl-[18px] pointer-events-none transition-opacity duration-300',
            isLight
              ? 'border-[#059669] group-hover:border-[#047857]'
              : 'border-[#00DC82] group-hover:border-[#34D399]'
          )}
          aria-hidden="true"
        />

        {/* Inner Portrait Image Container */}
        <div
          className={cn(
            'relative aspect-[3/4] w-full rounded-[14px] overflow-hidden',
            isLight ? 'bg-[#FAF7F2]' : 'bg-[#050806]'
          )}
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
