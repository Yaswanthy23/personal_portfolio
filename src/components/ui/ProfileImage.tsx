'use client';

import React, { useState } from 'react';
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
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={cn(
        'group relative w-full max-w-[280px] sm:max-w-[330px] md:max-w-[360px] lg:max-w-[400px] select-none mx-auto lg:mx-0',
        className
      )}
    >
      {/* Subtle Technical Frame */}
      <div className="relative rounded-[16px] bg-[#0A0F1D] border border-[#1E293B] p-2 sm:p-2.5 shadow-2xl transition-colors duration-300 hover:border-[#334155]">
        
        {/* Subtle AWS Orange Corner Accent Lines (#FF9900) */}
        <span
          className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#FF9900]/80 rounded-tr-[16px] pointer-events-none transition-opacity duration-300 group-hover:border-[#FF9900]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#FF9900]/80 rounded-bl-[16px] pointer-events-none transition-opacity duration-300 group-hover:border-[#FF9900]"
          aria-hidden="true"
        />

        {/* Inner Portrait Image Container */}
        <div className="relative aspect-[3/4] w-full rounded-[12px] overflow-hidden bg-[#070B14]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
            priority={priority}
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'object-cover object-top transition-transform duration-300 sm:duration-400 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none',
              'transition-opacity duration-500',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>
      </div>
    </div>
  );
};
