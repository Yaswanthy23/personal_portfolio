'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { profileData } from '@/data/profile';
import { ShieldCheck, Cpu } from 'lucide-react';

export interface HangingIdCardProps {
  className?: string;
  name?: string;
  designation?: string;
  idNumber?: string;
  validThrough?: string;
  avatarSrc?: string;
}

export const HangingIdCard: React.FC<HangingIdCardProps> = ({
  className,
  name = 'YASWANTH GEDELA',
  designation = 'AWS DEVOPS ENGINEER',
  idNumber = '987654321',
  validThrough = '12/31/2026',
  avatarSrc = profileData.profileImage?.src || '/images/profile-placeholder.png',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className={cn('relative flex flex-col items-center select-none pt-0 pb-4', className)}>
      
      {/* 1. LANYARD STRAP (Terracotta Lanyard with Warm Peach Accent Stitches) */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-9 sm:w-10 h-12 sm:h-14 bg-gradient-to-r from-[#9C431D] via-[#B4532A] to-[#9C431D] shadow-md flex items-center justify-between px-1 overflow-hidden border-x border-[#C4653D]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_2px,transparent_2px,transparent_4px)]" />
          
          <div className="h-full w-px border-r border-dashed border-[#E8B89C]/80" />
          <div className="h-full w-px border-r border-dashed border-[#E8B89C]/80" />
        </div>

        {/* 2. METAL STRAP LOOP CLAMP */}
        <div className="relative z-20 -mt-0.5 w-11 sm:w-12 h-4 rounded-[3px] bg-gradient-to-r from-gray-700 via-gray-400 to-gray-800 border border-gray-600 shadow-md flex items-center justify-around px-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-900 border border-gray-500 shadow-inner" />
          <div className="w-3.5 h-1 rounded-full bg-gray-900/60 shadow-inner" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-900 border border-gray-500 shadow-inner" />
        </div>

        {/* 3. BRUSHED METAL SWIVEL & SPRING CLASP */}
        <div className="relative z-10 flex flex-col items-center -mt-0.5">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-gradient-to-b from-gray-300 to-gray-500 shadow-sm" />
          <div className="w-3 h-5.5 -mt-1 rounded-b-full border-2 border-t-0 border-gray-300 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 shadow-sm" />
        </div>
      </div>

      {/* 4. HANGING ID CARD WITH SWAY & 3D TILT */}
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
            : undefined,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className={cn(
          'relative -mt-2.5 w-[275px] sm:w-[305px] rounded-[20px] bg-[#943E19] text-[#FFFFFF] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.35),0_0_20px_rgba(180,83,42,0.25)] border border-[#C4653D] overflow-hidden cursor-grab active:cursor-grabbing group',
          !isHovered && 'animate-hanging-card'
        )}
      >
        {/* Glossy Plastic Specular Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-30" />

        {/* Slotted Oval Punch Hole for Lanyard Clip */}
        <div className="pt-2.5 pb-1 flex justify-center">
          <div className="w-11 h-3 rounded-full bg-[#7D3414] border border-[#C4653D] shadow-inner flex items-center justify-center">
            <div className="w-2 h-full bg-gradient-to-b from-gray-400 to-gray-200 rounded-sm shadow-sm" />
          </div>
        </div>

        {/* Header: Company / Cloud Logo */}
        <div className="px-5 pt-1 pb-2.5 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 flex items-center justify-center text-[#E8B89C]">
              <svg viewBox="0 0 48 48" className="w-full h-full" fill="currentColor">
                <path d="M24 4L42 14.3923V35.1769L24 45.5692L6 35.1769V14.3923L24 4Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <path d="M16 24L22 30L32 18" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-sm leading-none text-[#FFFFFF] tracking-tight">
                AWS CLOUD
              </div>
              <div className="font-mono text-[9px] font-bold text-[#E8B89C] tracking-widest uppercase">
                INFRASTRUCTURE
              </div>
            </div>
          </div>
        </div>

        {/* Circular Profile Photo with Terracotta Peach Ring */}
        <div className="flex justify-center my-1.5">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-[3px] border-[#E8B89C] shadow-[0_0_15px_rgba(232,184,156,0.35)] bg-[#7D3414]">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#B4532A]">
              <Image
                src={avatarSrc}
                alt={name}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        {/* Name & Designation */}
        <div className="text-center px-4 pt-1.5 pb-2.5">
          <h3 className="text-lg sm:text-[20px] font-black tracking-tight text-[#FFFFFF] uppercase leading-tight">
            {name}
          </h3>
          <div className="text-[11px] sm:text-xs font-bold tracking-wider text-[#E8B89C] uppercase mt-0.5 font-mono">
            {designation}
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="px-5 py-2 border-t border-[#C4653D] bg-[#7D3414]/90 text-xs font-mono">
          <div className="grid grid-cols-2 gap-y-1 text-[10px] sm:text-[11px]">
            <div className="text-[#F5EBE1]/70 font-semibold uppercase">ID NUMBER</div>
            <div className="text-right font-bold text-[#FFFFFF] font-mono tracking-wider">{idNumber}</div>

            <div className="text-[#F5EBE1]/70 font-semibold uppercase">VALID THROUGH</div>
            <div className="text-right font-bold text-[#FFFFFF] font-mono">{validThrough}</div>
          </div>
        </div>

        {/* Bottom Accent Block (Terracotta Strip with QR Code & Hologram) */}
        <div className="bg-[#B4532A] px-4 py-2.5 flex items-center justify-between text-[#FFFFFF] relative">
          <div className="flex flex-col space-y-0.5">
            <div className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-wider uppercase text-[#FFFFFF] bg-black/20 px-1.5 py-0.5 rounded">
              <ShieldCheck className="h-3 w-3 text-[#FFFFFF]" />
              <span>AUTHENTICATED</span>
            </div>
            <div className="flex items-center gap-1 text-[8.5px] font-mono text-[#F5EBE1] font-bold">
              <Cpu className="h-3 w-3" />
              <span>PROD // MULTI-AZ</span>
            </div>
          </div>

          <div className="bg-[#7D3414] p-1 rounded-md shadow-sm shrink-0 border border-[#C4653D]">
            <svg
              viewBox="0 0 29 29"
              className="w-10 h-10 sm:w-11 sm:h-11 text-[#E8B89C]"
              fill="currentColor"
              shapeRendering="crispEdges"
              aria-label="DevOps Verification QR"
            >
              <rect x="0" y="0" width="7" height="7" />
              <rect x="1" y="1" width="5" height="5" fill="#7D3414" />
              <rect x="2" y="2" width="3" height="3" />

              <rect x="22" y="0" width="7" height="7" />
              <rect x="23" y="1" width="5" height="5" fill="#7D3414" />
              <rect x="24" y="2" width="3" height="3" />

              <rect x="0" y="22" width="7" height="7" />
              <rect x="1" y="23" width="5" height="5" fill="#7D3414" />
              <rect x="2" y="24" width="3" height="3" />

              <rect x="8" y="2" width="2" height="1" />
              <rect x="12" y="2" width="1" height="2" />
              <rect x="15" y="1" width="2" height="1" />
              <rect x="19" y="3" width="1" height="1" />

              <rect x="8" y="5" width="1" height="2" />
              <rect x="11" y="6" width="3" height="1" />
              <rect x="16" y="5" width="2" height="2" />
              <rect x="20" y="5" width="1" height="1" />

              <rect x="2" y="8" width="1" height="2" />
              <rect x="5" y="9" width="2" height="1" />
              <rect x="8" y="8" width="2" height="2" />
              <rect x="11" y="10" width="2" height="1" />
              <rect x="14" y="8" width="1" height="3" />
              <rect x="17" y="9" width="3" height="1" />
              <rect x="22" y="8" width="2" height="2" />
              <rect x="26" y="9" width="1" height="2" />

              <rect x="1" y="12" width="2" height="1" />
              <rect x="4" y="13" width="1" height="2" />
              <rect x="7" y="12" width="3" height="1" />
              <rect x="12" y="12" width="4" height="4" />
              <rect x="13" y="13" width="2" height="2" fill="#203C2D" />
              <rect x="18" y="12" width="2" height="1" />
              <rect x="22" y="13" width="1" height="2" />
              <rect x="25" y="12" width="3" height="1" />

              <rect x="2" y="16" width="3" height="1" />
              <rect x="7" y="15" width="2" height="2" />
              <rect x="10" y="17" width="1" height="3" />
              <rect x="17" y="15" width="3" height="2" />
              <rect x="22" y="17" width="2" height="1" />
              <rect x="26" y="16" width="2" height="2" />

              <rect x="8" y="22" width="2" height="1" />
              <rect x="12" y="23" width="2" height="2" />
              <rect x="16" y="22" width="1" height="3" />
              <rect x="19" y="24" width="2" height="1" />
              <rect x="23" y="22" width="3" height="1" />
              <rect x="27" y="23" width="1" height="2" />

              <rect x="8" y="25" width="3" height="2" />
              <rect x="13" y="26" width="2" height="1" />
              <rect x="17" y="26" width="3" height="2" />
              <rect x="22" y="25" width="2" height="2" />
              <rect x="26" y="27" width="2" height="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
