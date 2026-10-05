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
      return <Layers className="h-4 w-4 text-[#FF9900]" />;
    }
    if (category.includes('SECURITY')) {
      return <Shield className="h-4 w-4 text-[#22C55E]" />;
    }
    if (category.includes('KUBERNETES')) {
      return <Server className="h-4 w-4 text-[#22D3EE]" />;
    }
    if (category.includes('LINUX')) {
      return <Terminal className="h-4 w-4 text-[#FF9900]" />;
    }
    return <Wrench className="h-4 w-4 text-[#22D3EE]" />;
  };

  return (
    <section id="troubleshooting" className="py-24 md:py-32 bg-[#080D17] border-t border-[#1E293B]/50 relative">
      <Container size="lg">
        <SectionHeading
          label="05 / TROUBLESHOOTING"
          title="Things I've worked through"
          description="Real-world production incidents, debugging root causes, and engineering resolutions."
        />

        <div className="max-w-4xl space-y-4">
          {troubleshootingCases.map((item) => {
            const isOpen = openCaseId === item.id;

            return (
              <Card
                key={item.id}
                className={cn(
                  'p-0 bg-[#101827] border transition-all duration-200 overflow-hidden',
                  isOpen ? 'border-[#2A3B52] shadow-lg' : 'border-[#1E293B] hover:border-[#2A3B52]'
                )}
                hoverEffect={false}
              >
                {/* Header / Clickable Toggle */}
                <button
                  type="button"
                  onClick={() => toggleCase(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-[#FF9900] font-semibold">{item.number}</span>
                      <span className="text-[#64748B]">•</span>
                      <span className="text-[#94A3B8] flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
                      {item.title}
                    </h3>
                  </div>

                  <div className={cn(
                    'p-2 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] transition-transform duration-200 shrink-0',
                    isOpen && 'rotate-180 text-[#FF9900] border-[#FF9900]/30'
                  )}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#1E293B]/60 space-y-5 animate-in fade-in duration-150">
                    
                    {/* The Problem */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#EF4444] uppercase tracking-wider">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>The Incident / Error</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed bg-[#070B14] p-3 rounded-lg border border-[#1E293B]">
                        {item.problem}
                      </p>
                    </div>

                    {/* Root Cause */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
                        Root Cause Diagnosis
                      </div>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {item.rootCause}
                      </p>
                    </div>

                    {/* Engineering Solution */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#22C55E] uppercase tracking-wider">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Technical Resolution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed bg-[#070B14] p-3 rounded-lg border border-[#1E293B]">
                        {item.solution}
                      </p>
                    </div>

                    {/* Impact & Technologies */}
                    <div className="pt-3 border-t border-[#1E293B]/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-[#64748B]">
                        <span>Impact:</span>
                        <span className="text-[#22D3EE]">{item.impact}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-[#070B14] border border-[#1E293B] text-[#94A3B8]"
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
