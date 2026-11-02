'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { troubleshootingCases } from '@/data/troubleshooting';
import { AlertCircle, CheckCircle, Search, Terminal, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const EngineeringTroubleshooting: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState(troubleshootingCases[0].id);
  const activeCase = troubleshootingCases.find((c) => c.id === activeCaseId) || troubleshootingCases[0];

  return (
    <section id="troubleshooting" className="py-20 sm:py-24 bg-[#050806] border-t border-[#17261D] relative">
      <Container size="lg">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1410] border border-[#17261D] text-[#00DC82] text-xs font-mono font-bold uppercase tracking-wider">
            <span>ENGINEERING &amp; TROUBLESHOOTING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFFFFF] tracking-tight">
            Real production incident resolution &amp; system hardening
          </h2>
          <p className="text-sm text-[#9CA3AF] max-w-2xl">
            Real-world diagnostics, root-cause investigations, and engineering remediations across AWS, Terraform, and Kubernetes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Case Study Selector Tabs */}
          <div className="lg:col-span-4 space-y-2.5">
            {troubleshootingCases.map((item) => {
              const isActive = item.id === activeCaseId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCaseId(item.id)}
                  type="button"
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group',
                    isActive
                      ? 'bg-[#0D1410] border-[#00DC82] shadow-[0_0_20px_rgba(0,220,130,0.2)]'
                      : 'bg-[#080D0A] border-[#17261D] hover:border-[#234230] hover:bg-[#0D1410]'
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn('text-[10px] font-mono font-bold', isActive ? 'text-[#00DC82]' : 'text-[#64748B]')}>
                        CASE #{item.number}
                      </span>
                      <span className="text-[10px] font-mono text-[#34D399] uppercase">
                        {item.category}
                      </span>
                    </div>
                    <div className={cn('text-xs sm:text-sm font-bold transition-colors line-clamp-1', isActive ? 'text-[#FFFFFF]' : 'text-[#9CA3AF] group-hover:text-[#FFFFFF]')}>
                      {item.title}
                    </div>
                  </div>
                  <ArrowRight className={cn('h-4 w-4 shrink-0 transition-transform', isActive ? 'text-[#00DC82] translate-x-0.5' : 'text-[#64748B] opacity-0 group-hover:opacity-100')} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Diagnostic Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0D1410] border border-[#17261D] space-y-6 shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#17261D]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#00DC82]">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>CASE STUDY #{activeCase.number} • {activeCase.category}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mt-1">
                  {activeCase.title}
                </h3>
              </div>

              <span className="px-3 py-1 rounded bg-[#080D0A] border border-[#17261D] text-xs font-mono font-bold text-[#00DC82] self-start sm:self-auto">
                RESOLVED
              </span>
            </div>

            {/* Problem Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EF4444] uppercase">
                <AlertCircle className="h-4 w-4" />
                <span>The Problem &amp; Symptom</span>
              </div>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed bg-[#080D0A] p-4 rounded-xl border border-[#17261D]">
                {activeCase.problem}
              </p>
            </div>

            {/* Root Cause Analysis */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F59E0B] uppercase">
                <Search className="h-4 w-4" />
                <span>Root Cause Analysis</span>
              </div>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed bg-[#080D0A] p-4 rounded-xl border border-[#17261D]">
                {activeCase.rootCause}
              </p>
            </div>

            {/* Engineering Remediation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00DC82] uppercase">
                <CheckCircle className="h-4 w-4" />
                <span>DevOps Solution &amp; Hardening</span>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed bg-[#131E17] p-4 rounded-xl border border-[#234230]">
                {activeCase.solution}
              </p>
            </div>

            {/* Impact Metric & Tech Tags */}
            <div className="pt-4 border-t border-[#17261D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#00DC82]">
                <span className="font-bold">Outcome:</span>
                <span className="text-[#9CA3AF]">{activeCase.impact}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {activeCase.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono text-[#FFFFFF] bg-[#080D0A] border border-[#17261D] rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};
