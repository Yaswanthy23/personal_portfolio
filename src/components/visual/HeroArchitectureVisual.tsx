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
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF9900]/10 via-[#22D3EE]/10 to-[#22C55E]/10 blur-xl opacity-60 pointer-events-none" 
        aria-hidden="true"
      />

      {/* Main visual container */}
      <div className="relative rounded-xl border border-[#263449] bg-[#0E172A]/95 p-5 sm:p-6 backdrop-blur-sm shadow-2xl">
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between border-b border-[#263449] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">INFRASTRUCTURE TOPOLOGY</span>
          </div>
          <Badge variant="green" size="sm" dot>
            UPTIME 99.99%
          </Badge>
        </div>

        {/* Visual Architecture Flow */}
        <div className="relative flex flex-col items-center gap-4">
          {/* LEVEL 1: Top Cloud Layer */}
          <div className="relative z-10 w-full max-w-xs group transition-all duration-300">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#172033] border border-[#FF9900]/40 group-hover:border-[#FF9900] shadow-sm transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-[#FF9900]/10 text-[#FF9900]">
                  <Cloud className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#FF9900] font-semibold">CLOUD LAYER</div>
                  <div className="text-xs text-[#F8FAFC] font-medium">AWS Global Infrastructure</div>
                </div>
              </div>
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
            </div>
          </div>

          {/* Flow Connector 1 -> 2 */}
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#FF9900]/60 to-[#22D3EE]/60 relative">
            <div className="absolute top-0 -left-1 w-2.5 h-1 bg-[#FF9900] rounded-full animate-bounce" />
          </div>

          {/* LEVEL 2: Infrastructure as Code & AWS Core Services */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Left: Terraform IaC */}
            <div className="p-3 rounded-lg bg-[#172033] border border-[#263449] hover:border-[#FF9900]/50 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded bg-[#FF9900]/10 text-[#FF9900]">
                  <Layers className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-[#F8FAFC]">TERRAFORM</span>
              </div>
              <div className="text-[11px] text-[#94A3B8] font-mono">
                Modular IaC • S3 State
              </div>
            </div>

            {/* Right: AWS Services */}
            <div className="p-3 rounded-lg bg-[#172033] border border-[#263449] hover:border-[#22D3EE]/50 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded bg-[#22D3EE]/10 text-[#22D3EE]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-[#F8FAFC]">AWS VPC & IAM</span>
              </div>
              <div className="text-[11px] text-[#94A3B8] font-mono">
                Multi-AZ • Zero Trust
              </div>
            </div>
          </div>

          {/* Flow Connector 2 -> 3 */}
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#22D3EE]/60 to-[#22D3EE] relative">
            <div className="absolute top-0 -left-1 w-2.5 h-1 bg-[#22D3EE] rounded-full animate-pulse" />
          </div>

          {/* LEVEL 3: Amazon EKS Orchestration Engine */}
          <div className="w-full relative group">
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#172033] border border-[#22D3EE]/50 shadow-[0_0_15px_-3px_rgba(34,211,238,0.15)] group-hover:border-[#22D3EE] transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-[#22D3EE]/10 text-[#22D3EE]">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#22D3EE] font-bold">ORCHESTRATION</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#22D3EE]/10 text-[#22D3EE] font-mono">v1.30</span>
                  </div>
                  <div className="text-sm font-semibold text-[#F8FAFC]">Amazon EKS Cluster</div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-mono text-[#22C55E] flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Auto-scaling
                </div>
                <div className="text-[10px] text-[#94A3B8] font-mono">Managed Node Groups</div>
              </div>
            </div>
          </div>

          {/* Flow Connector 3 -> 4 */}
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#22D3EE] to-[#374863]" />

          {/* LEVEL 4: Workload & Automation Tier */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
            {/* Item 1: Docker */}
            <div className="p-2.5 rounded-lg bg-[#111827] border border-[#263449] text-center hover:border-[#374863] transition-colors">
              <div className="inline-flex p-1 rounded bg-[#22D3EE]/10 text-[#22D3EE] mb-1">
                <Box className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-semibold text-[#F8FAFC]">Docker</div>
              <div className="text-[10px] text-[#94A3B8] font-mono">Containers</div>
            </div>

            {/* Item 2: CI/CD */}
            <div className="p-2.5 rounded-lg bg-[#111827] border border-[#263449] text-center hover:border-[#FF9900]/40 transition-colors">
              <div className="inline-flex p-1 rounded bg-[#FF9900]/10 text-[#FF9900] mb-1">
                <GitBranch className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-semibold text-[#F8FAFC]">CI / CD</div>
              <div className="text-[10px] text-[#94A3B8] font-mono">Automated</div>
            </div>

            {/* Item 3: K8s Services */}
            <div className="p-2.5 rounded-lg bg-[#111827] border border-[#263449] text-center hover:border-[#22D3EE]/40 transition-colors">
              <div className="inline-flex p-1 rounded bg-[#22C55E]/10 text-[#22C55E] mb-1">
                <Cpu className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs font-semibold text-[#F8FAFC]">K8s Pods</div>
              <div className="text-[10px] text-[#94A3B8] font-mono">Ingress / Helm</div>
            </div>
          </div>
        </div>

        {/* Bottom micro terminal status */}
        <div className="mt-4 pt-3 border-t border-[#263449] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
          <span className="text-[#64748B]">iac-sync: synchronized</span>
          <span className="text-[#22D3EE]">target: us-east-1</span>
        </div>
      </div>
    </div>
  );
};
