'use client';

import React, { useState } from 'react';
import { workflowStages } from '@/data/engineering';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const DevOpsWorkflow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(2); // Default to Terraform step
  const currentStage = workflowStages.find((s) => s.step === selectedStep) || workflowStages[0];

  return (
    <div className="rounded-2xl bg-[#0D1410] border border-[#17261D] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#17261D]">
        <div>
          <h3 className="text-lg font-bold text-[#FFFFFF]">
            End-to-End DevOps Delivery Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Click through the automated pipeline stages from IaC planning to production monitoring.
          </p>
        </div>
        <div className="text-xs font-mono text-[#00DC82] font-bold">
          9 AUTOMATED STAGES
        </div>
      </div>

      {/* Horizontal Pipeline Steps Stepper */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex items-center gap-2 min-w-[700px]">
          {workflowStages.map((stage, idx) => {
            const isSelected = selectedStep === stage.step;

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => setSelectedStep(stage.step)}
                  className={cn(
                    'flex flex-col items-center p-2.5 rounded-xl border text-center transition-all flex-1 min-w-[72px]',
                    isSelected
                      ? 'bg-[#131E17] border-[#00DC82] shadow-sm'
                      : 'bg-[#080D0A] border-[#17261D] hover:border-[#234230]'
                  )}
                >
                  <span className={cn(
                    'text-[10px] font-mono font-bold',
                    isSelected ? 'text-[#00DC82]' : 'text-[#64748B]'
                  )}>
                    0{stage.step}
                  </span>
                  <span className={cn(
                    'text-xs font-bold font-mono mt-0.5 truncate max-w-[80px]',
                    isSelected ? 'text-[#FFFFFF]' : 'text-[#9CA3AF]'
                  )}>
                    {stage.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-mono text-[#34D399] mt-0.5 truncate max-w-[80px]">
                    {stage.tool}
                  </span>
                </button>

                {idx < workflowStages.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-[#17261D] shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Box */}
      <div className="p-6 rounded-xl bg-[#080D0A] border border-[#17261D] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#00DC82] font-bold">STAGE 0{currentStage.step}: {currentStage.name.toUpperCase()}</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#34D399]">{currentStage.category}</span>
          </div>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            {currentStage.description}
          </p>
        </div>

        <div className="md:col-span-4 p-4 rounded-lg bg-[#0D1410] border border-[#17261D] space-y-2">
          <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
            Primary Tooling & Actions
          </div>
          <div className="text-xs font-mono font-bold text-[#FFFFFF] pb-1 border-b border-[#17261D]">
            Tool: {currentStage.tool}
          </div>
          <ul className="space-y-1 text-xs text-[#9CA3AF]">
            {currentStage.actions.map((act, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-[#34D399] shrink-0" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
