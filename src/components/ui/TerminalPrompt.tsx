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
        'inline-flex flex-col rounded-xl bg-[#0D1410] border border-[#17261D] shadow-md overflow-hidden text-left font-mono text-xs sm:text-sm w-full max-w-xl',
        className
      )}
    >
      {/* Terminal window header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#080D0A] border-b border-[#17261D]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#00DC82]/80 inline-block" />
          <span className="ml-2 text-[11px] text-[#9CA3AF] flex items-center gap-1">
            <Terminal className="h-3 w-3 text-[#00DC82]" />
            bash — 80x24
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#34D399] bg-[#00DC82]/10 px-2 py-0.5 rounded-full border border-[#00DC82]/30">
          <Shield className="h-3 w-3" />
          <span>production: secured</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-3.5 space-y-2 bg-[#0D1410]/90">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#00DC82] font-semibold">
            {user}@{host}
          </span>
          <span className="text-[#9CA3AF]">:</span>
          <span className="text-[#34D399]">~</span>
          <span className="text-[#9CA3AF]">$</span>
          <span className="text-[#FFFFFF]">{command}</span>
          <span className="inline-block w-2 h-4 bg-[#00DC82] animate-pulse align-middle" />
        </div>
      </div>
    </div>
  );
};
