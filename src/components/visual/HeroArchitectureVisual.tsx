'use client';

import React from 'react';
import { 
  Cloud, 
  Layers, 
  Cpu, 
  Box, 
  GitBranch, 
  ShieldCheck, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const HeroArchitectureVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto select-none">
      {/* Subtle outer glow backdrop */}
      <div 
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00DC82]/15 via-[#34D399]/15 to-[#00DC82]/10 blur-xl opacity-60 pointer-events-none" 
        aria-hidden="true"
      />

      {/* Main visual container */}
      <div className="relative rounded-2xl border border-[#17261D] bg-[#0D1410]/95 p-5 sm:p-6 backdrop-blur-sm shadow-2xl">
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between border-b border-[#17261D] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DC82] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00DC82]" />
            </span>
            <span className="text-xs font-mono text-[#9CA3AF]">INFRASTRUCTURE TOPOLOGY</span>
          </div>
          <Badge variant="blue" size="sm" dot>
            UPTIME 99.99%
          </Badge>
        </div>

        {/* Visual Architecture Flow */}
        <div className="relative flex flex-col items-center gap-4">
          {/* LEVEL 1: Top Cloud Layer */}
          <div className="relative z-10 w-full max-w-xs group transition-all duration-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#080D0A] border border-[#00DC82]/40 group-hover:border-[#00DC82] shadow-sm transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#00DC82]/10 text-[#00DC82]">
                  <Cloud className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00DC82] font-semibold">CLOUD LAYER</div>
                  <div className="text-xs text-[#FFFFFF] font-medium">AWS Global Infrastructure</div>
                </div>
              </div>
              <CheckCircle2 className="h-4 w-4 text-[#34D399]" />
            </div>
          </div>

          {/* Flow Connector 1 -> 2 */}
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#00DC82]/60 to-[#34D399]/60 relative">
            <div className="absolute top-0 -left-1 w-2.5 h-1 bg-[#00DC82] rounded-full animate-bounce" />
          </div>

          {/* LEVEL 2: Infrastructure as Code & AWS Core Services */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Left: Terraform IaC */}
            <div className="p-3 rounded-xl bg-[#080D0A] border border-[#17261D] hover:border-[#00DC82]/50 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-lg bg-[#00DC82]/10 text-[#00DC82]">
                  <Layers className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-[#FFFFFF]">TERRAFORM</span>
              </div>
              <div className="text-[11px] text-[#9CA3AF] font-mono">
                Modular IaC • S3 State
              </div>
            </div>

            {/* Right: AWS Services */}
            <div className="p-3 rounded-xl bg-[#080D0A] border border-[#17261D] hover:border-[#34D399]/50 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-lg bg-[#34D399]/10 text-[#34D399]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-[#FFFFFF]">AWS VPC & IAM</span>
              </div>
              <div className="text-[11px] text-[#9CA3AF] font-mono">
                Multi-AZ • Zero Trust
              </div>
            </div>
          </div>

          {/* Flow Connector 2 -> 3 */}
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#34D399]/60 to-[#00DC82] relative">
            <div className="absolute top-0 -left-1 w-2.5 h-1 bg-[#34D399] rounded-full animate-pulse" />
          </div>

          {/* LEVEL 3: Amazon EKS Orchestration Engine */}
          <div className="w-full relative group">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080D0A] border border-[#00DC82]/50 shadow-[0_0_15px_-3px_rgba(0,220,130,0.25)] group-hover:border-[#00DC82] transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00DC82]/10 text-[#00DC82]">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#34D399] font-bold">ORCHESTRATION</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#00DC82]/20 text-[#34D399] font-mono">v1.30</span>
                  </div>
                  <div className="text-sm font-semibold text-[#FFFFFF]">Amazon EKS Cluster</div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-mono text-[#34D399] flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Auto-scaling
                </div>
                <div className="text-[10px] text-[#9CA3AF] font-mono">Managed Node Groups</div>
              </div>
            </div>
          </div>

          {/* Flow Connector 3 -> 4 */}
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#00DC82] to-[#17261D]" />

          {/* LEVEL 4: Workload & Automation Tier */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
            {/* Item 1: Docker */}
            <div className="p-2.5 rounded-xl bg-[#080D0A] border border-[#17261D] text-center hover:border-[#00DC82]/40 transition-colors">
              <div className="inline-flex p-1 rounded-lg bg-[#00DC82]/10 text-[#00DC82] mb-1">
                <Box className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-semibold text-[#FFFFFF]">Docker</div>
              <div className="text-[10px] text-[#9CA3AF] font-mono">Containers</div>
            </div>

            {/* Item 2: CI/CD */}
            <div className="p-2.5 rounded-xl bg-[#080D0A] border border-[#17261D] text-center hover:border-[#00DC82]/40 transition-colors">
              <div className="inline-flex p-1 rounded-lg bg-[#00DC82]/10 text-[#00DC82] mb-1">
                <GitBranch className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-semibold text-[#FFFFFF]">CI / CD</div>
              <div className="text-[10px] text-[#9CA3AF] font-mono">Automated</div>
            </div>

            {/* Item 3: K8s Services */}
            <div className="p-2.5 rounded-xl bg-[#080D0A] border border-[#17261D] text-center hover:border-[#34D399]/40 transition-colors">
              <div className="inline-flex p-1 rounded-lg bg-[#34D399]/10 text-[#34D399] mb-1">
                <Cpu className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-semibold text-[#FFFFFF]">K8s Pods</div>
              <div className="text-[10px] text-[#9CA3AF] font-mono">Ingress / Helm</div>
            </div>
          </div>
        </div>

        {/* Bottom micro terminal status */}
        <div className="mt-4 pt-3 border-t border-[#17261D] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
          <span className="text-[#64748B]">iac-sync: synchronized</span>
          <span className="text-[#34D399]">target: us-east-1</span>
        </div>
      </div>
    </div>
  );
};
