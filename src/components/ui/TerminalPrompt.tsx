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
        'inline-flex flex-col rounded-lg bg-[#0B1120] border border-[#263449] shadow-md overflow-hidden text-left font-mono text-xs sm:text-sm w-full max-w-xl',
        className
      )}
    >
      {/* Terminal window header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#111827] border-b border-[#263449]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]/80 inline-block" />
          <span className="ml-2 text-[11px] text-[#94A3B8] flex items-center gap-1">
            <Terminal className="h-3 w-3 text-[#FF9900]" />
            bash — 80x24
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
          <Shield className="h-3 w-3" />
          <span>production: secured</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-3.5 space-y-2 bg-[#0B1120]/90">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#22D3EE] font-semibold">
            {user}@{host}
          </span>
          <span className="text-[#94A3B8]">:</span>
          <span className="text-[#FF9900]">~</span>
          <span className="text-[#94A3B8]">$</span>
          <span className="text-[#F8FAFC]">{command}</span>
          <span className="inline-block w-2 h-4 bg-[#FF9900] animate-pulse align-middle" />
        </div>
      </div>
    </div>
  );
};
