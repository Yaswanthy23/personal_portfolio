'use client';

import React from 'react';
import { Terminal, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TerminalPromptProps {
  command?: string;
  user?: string;
  host?: string;
  className?: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  command = 'whoami',
  user = 'yaswanth',
  host = 'aws-devops',
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex flex-col rounded-xl bg-[#943E19] border border-[#C4653D] shadow-md overflow-hidden text-left font-mono text-xs sm:text-sm w-full max-w-xl',
        className
      )}
    >
      {/* Terminal window header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#7D3414] border-b border-[#C4653D]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8B89C]/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#B4532A]/80 inline-block" />
          <span className="ml-2 text-[11px] text-[#F5EBE1] flex items-center gap-1">
            <Terminal className="h-3 w-3 text-[#E8B89C]" />
            bash — 80x24
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#E8B89C] bg-[#E8B89C]/10 px-2 py-0.5 rounded-full border border-[#E8B89C]/30">
          <Shield className="h-3 w-3" />
          <span>production: secured</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-3.5 space-y-2 bg-[#943E19]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#E8B89C] font-semibold">
            {user}@{host}
          </span>
          <span className="text-[#F5EBE1]">:</span>
          <span className="text-[#F5EBE1]">~</span>
          <span className="text-[#F5EBE1]">$</span>
          <span className="text-[#FFFFFF]">{command}</span>
          <span className="inline-block w-2 h-4 bg-[#E8B89C] animate-pulse align-middle" />
        </div>
      </div>
    </div>
  );
};
