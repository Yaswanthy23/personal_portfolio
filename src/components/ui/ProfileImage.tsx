'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { profileData } from '@/data/profile';

export interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src = profileData.profileImage?.src || '/images/profile-placeholder.jpg',
  alt = profileData.profileImage?.alt || `${profileData.name} - ${profileData.role}`,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        'relative w-full max-w-[340px] sm:max-w-[380px] transition-all duration-700 ease-out select-none',
        // Subtle entrance animation: Fade in, upward movement, subtle scale from 0.98 -> 1
        mounted
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-[0.98]',
        className
      )}
    >
      {/* Very subtle ambient depth lighting */}
      <div
        className="absolute -inset-2 bg-gradient-to-tr from-[#FF9900]/10 to-[#22D3EE]/5 rounded-3xl blur-2xl opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Portrait Frame with subtle engineering accents */}
      <div className="relative rounded-[16px] bg-[#101827] border border-[#1E293B] p-2.5 sm:p-3 shadow-xl transition-colors duration-300 hover:border-[#2A3B52]">
        
        {/* Subtle Orange Accent Corners */}
        <span
          className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#FF9900]/70 rounded-tr-[16px] pointer-events-none"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 border-b-2 border-l-2 border-[#FF9900]/70 rounded-bl-[16px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Inner Image Container */}
        <div className="relative aspect-[3/4] w-full rounded-[12px] overflow-hidden bg-[#070B14]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
            priority
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'object-cover object-top transition-opacity duration-500',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>
      </div>
    </div>
  );
};
