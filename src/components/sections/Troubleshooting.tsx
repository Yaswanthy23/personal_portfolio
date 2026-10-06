'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, Wrench, Shield, Terminal, Server, Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { troubleshootingCases } from '@/data/troubleshooting';
import { cn } from '@/lib/utils';

export const Troubleshooting: React.FC = () => {
  const [openCaseId, setOpenCaseId] = useState<string>('terraform-state-locking');

  const toggleCase = (id: string) => {
    setOpenCaseId(openCaseId === id ? '' : id);
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('INFRASTRUCTURE')) {
      return <Layers className="h-4 w-4 text-[#CCFF00]" />;
    }
    if (category.includes('SECURITY')) {
      return <Shield className="h-4 w-4 text-[#22C55E]" />;
    }
    if (category.includes('KUBERNETES')) {
      return <Server className="h-4 w-4 text-[#38BDF8]" />;
    }
    if (category.includes('LINUX')) {
      return <Terminal className="h-4 w-4 text-[#CCFF00]" />;
    }
    return <Wrench className="h-4 w-4 text-[#38BDF8]" />;
  };

  return (
    <section id="troubleshooting" className="py-14 sm:py-16 md:py-20 bg-[#0A0F0C] border-t border-[#19241C] relative">
      <Container size="lg">
        <SectionHeading
          label="05 / TROUBLESHOOTING"
          title="Things I've worked through"
          description="Real-world production incidents, debugging root causes, and engineering resolutions."
        />

        <div className="max-w-4xl space-y-3.5">
          {troubleshootingCases.map((item) => {
            const isOpen = openCaseId === item.id;

            return (
              <Card
                key={item.id}
                className={cn(
                  'p-0 bg-[#0E1410] border transition-all duration-200 overflow-hidden',
                  isOpen ? 'border-[#CCFF00]/50 shadow-[0_0_20px_rgba(204,255,0,0.1)]' : 'border-[#19241C] hover:border-[#243529]'
                )}
                hoverEffect={false}
              >
                {/* Header / Clickable Toggle */}
                <button
                  type="button"
                  onClick={() => toggleCase(item.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-5.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-[#CCFF00] font-semibold">{item.number}</span>
                      <span className="text-[#667A6B]">•</span>
                      <span className="text-[#94A899] flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F4F9F5]">
                      {item.title}
                    </h3>
                  </div>

                  <div className={cn(
                    'p-2 rounded-lg bg-[#060907] border border-[#19241C] text-[#94A899] transition-transform duration-200 shrink-0',
                    isOpen && 'rotate-180 text-[#CCFF00] border-[#CCFF00]/30'
                  )}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[#19241C] space-y-4 animate-in fade-in duration-150">
                    
                    {/* The Problem */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#EF4444] uppercase tracking-wider">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>The Incident / Error</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#94A899] leading-relaxed bg-[#060907] p-3 rounded-lg border border-[#19241C]">
                        {item.problem}
                      </p>
                    </div>

                    {/* Root Cause */}
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-[#667A6B] uppercase tracking-wider">
                        Root Cause Diagnosis
                      </div>
                      <p className="text-xs sm:text-sm text-[#94A899] leading-relaxed">
                        {item.rootCause}
                      </p>
                    </div>

                    {/* Engineering Solution */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#22C55E] uppercase tracking-wider">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Technical Resolution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#F4F9F5] leading-relaxed bg-[#141E17] p-3 rounded-lg border border-[#223327]">
                        {item.solution}
                      </p>
                    </div>

                    {/* Impact & Technologies */}
                    <div className="pt-3 border-t border-[#19241C] flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-[#667A6B]">
                        <span>Impact:</span>
                        <span className="text-[#38BDF8]">{item.impact}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-[#060907] border border-[#19241C] text-[#94A899]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
