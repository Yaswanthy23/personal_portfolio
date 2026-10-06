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
    <section id="troubleshooting" className="py-20 sm:py-24 bg-[#0A0F0C] border-t border-[#19241C] relative">
      <Container size="lg">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1410] border border-[#19241C] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-wider">
            <span>ENGINEERING &amp; TROUBLESHOOTING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F4F9F5] tracking-tight">
            Real production incident resolution &amp; system hardening
          </h2>
          <p className="text-sm text-[#94A899] max-w-2xl">
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
                      ? 'bg-[#0E1410] border-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.15)]'
                      : 'bg-[#080C09] border-[#19241C] hover:border-[#243529] hover:bg-[#0E1410]'
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn('text-[10px] font-mono font-bold', isActive ? 'text-[#CCFF00]' : 'text-[#667A6B]')}>
                        CASE #{item.number}
                      </span>
                      <span className="text-[10px] font-mono text-[#A3E635] uppercase">
                        {item.category}
                      </span>
                    </div>
                    <div className={cn('text-xs sm:text-sm font-bold transition-colors line-clamp-1', isActive ? 'text-[#F4F9F5]' : 'text-[#94A899] group-hover:text-[#F4F9F5]')}>
                      {item.title}
                    </div>
                  </div>
                  <ArrowRight className={cn('h-4 w-4 shrink-0 transition-transform', isActive ? 'text-[#CCFF00] translate-x-0.5' : 'text-[#667A6B] opacity-0 group-hover:opacity-100')} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Diagnostic Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0E1410] border border-[#19241C] space-y-6 shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#19241C]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#CCFF00]">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>CASE STUDY #{activeCase.number} • {activeCase.category}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F4F9F5] mt-1">
                  {activeCase.title}
                </h3>
              </div>

              <span className="px-3 py-1 rounded bg-[#141E17] border border-[#223327] text-xs font-mono font-bold text-[#A3E635] self-start sm:self-auto">
                RESOLVED
              </span>
            </div>

            {/* Problem Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EF4444] uppercase">
                <AlertCircle className="h-4 w-4" />
                <span>The Problem &amp; Symptom</span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A899] leading-relaxed bg-[#080C09] p-4 rounded-xl border border-[#19241C]">
                {activeCase.problem}
              </p>
            </div>

            {/* Root Cause Analysis */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F59E0B] uppercase">
                <Search className="h-4 w-4" />
                <span>Root Cause Analysis</span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A899] leading-relaxed bg-[#080C09] p-4 rounded-xl border border-[#19241C]">
                {activeCase.rootCause}
              </p>
            </div>

            {/* Engineering Remediation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CCFF00] uppercase">
                <CheckCircle className="h-4 w-4" />
                <span>DevOps Solution &amp; Hardening</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F4F9F5] leading-relaxed bg-[#141E17] p-4 rounded-xl border border-[#223327]">
                {activeCase.solution}
              </p>
            </div>

            {/* Impact Metric & Tech Tags */}
            <div className="pt-4 border-t border-[#19241C] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#A3E635]">
                <span className="font-bold">Outcome:</span>
                <span className="text-[#94A899]">{activeCase.impact}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {activeCase.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono text-[#F4F9F5] bg-[#080C09] border border-[#19241C] rounded"
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
