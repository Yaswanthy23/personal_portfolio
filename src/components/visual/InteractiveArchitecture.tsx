'use client';

import React, { useState } from 'react';
import { Cloud, Shield, Network, Server, Cpu, Database, ChevronRight, Info } from 'lucide-react';
import { architectureNodes } from '@/data/engineering';
import { cn } from '@/lib/utils';

export const InteractiveArchitecture: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('eks-cluster');
  const selectedNode = architectureNodes.find((n) => n.id === selectedNodeId) || architectureNodes[0];

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'aws-cloud':
        return <Cloud className="h-4 w-4 text-[#FF9900]" />;
      case 'vpc':
      case 'public-subnet':
      case 'private-subnet':
        return <Network className="h-4 w-4 text-[#22D3EE]" />;
      case 'iam':
        return <Shield className="h-4 w-4 text-[#22C55E]" />;
      case 'alb':
      case 'eks-cluster':
        return <Server className="h-4 w-4 text-[#FF9900]" />;
      case 'microservices':
        return <Cpu className="h-4 w-4 text-[#22D3EE]" />;
      case 'storage-db':
        return <Database className="h-4 w-4 text-[#FF9900]" />;
      default:
        return <Server className="h-4 w-4 text-[#FF9900]" />;
    }
  };

  return (
    <div className="rounded-2xl bg-[#101827] border border-[#1E293B] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1E293B]">
        <div>
          <h3 className="text-lg font-bold text-[#F8FAFC]">
            Interactive Cloud Architecture Visualizer
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Click on any tier or component to inspect its architecture decisions and AWS services.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#64748B]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span>Multi-AZ Production Blueprint</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: Architecture Node Map */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Layer 1: AWS Provider & Governance */}
          <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              Layer 1: Cloud & Security Governance
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {architectureNodes.slice(0, 2).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg text-left text-xs font-mono transition-all border',
                    selectedNodeId === node.id
                      ? 'bg-[#111C2D] border-[#FF9900] text-[#F8FAFC] shadow-sm'
                      : 'bg-[#101827] border-[#1E293B] text-[#94A3B8] hover:border-[#2A3B52] hover:text-[#F8FAFC]'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {getNodeIcon(node.id)}
                    <span>{node.label}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-[#64748B]" />
                </button>
              ))}
            </div>
          </div>

          {/* Layer 2: Network Subnet Tiers & Routing */}
          <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              Layer 2: Ingress & Network Routing
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {architectureNodes.slice(2, 4).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg text-left text-xs font-mono transition-all border',
                    selectedNodeId === node.id
                      ? 'bg-[#111C2D] border-[#FF9900] text-[#F8FAFC] shadow-sm'
                      : 'bg-[#101827] border-[#1E293B] text-[#94A3B8] hover:border-[#2A3B52] hover:text-[#F8FAFC]'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {getNodeIcon(node.id)}
                    <span>{node.label}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-[#64748B]" />
                </button>
              ))}
            </div>
          </div>

          {/* Layer 3: Kubernetes Orchestration & Workloads */}
          <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              Layer 3: Orchestration & Application Tier
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {architectureNodes.slice(4, 7).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg text-left text-xs font-mono transition-all border',
                    selectedNodeId === node.id
                      ? 'bg-[#111C2D] border-[#FF9900] text-[#F8FAFC] shadow-sm'
                      : 'bg-[#101827] border-[#1E293B] text-[#94A3B8] hover:border-[#2A3B52] hover:text-[#F8FAFC]'
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getNodeIcon(node.id)}
                    <span className="truncate">{node.label}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-[#64748B] shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Layer 4: Storage & Database Tier */}
          <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-2">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              Layer 4: Data & Persistent Storage Tier
            </div>
            <div className="grid grid-cols-1 gap-2">
              {architectureNodes.slice(7).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg text-left text-xs font-mono transition-all border',
                    selectedNodeId === node.id
                      ? 'bg-[#111C2D] border-[#FF9900] text-[#F8FAFC] shadow-sm'
                      : 'bg-[#101827] border-[#1E293B] text-[#94A3B8] hover:border-[#2A3B52] hover:text-[#F8FAFC]'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {getNodeIcon(node.id)}
                    <span>{node.label}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-[#64748B]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Selected Component Inspector */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#070B14] border border-[#1E293B] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <span className="text-xs font-mono text-[#FF9900]">
              {selectedNode.category}
            </span>
            <span className="text-xs font-mono text-[#64748B]">NODE INSPECTOR</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#F8FAFC]">
              {selectedNode.label}
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {selectedNode.description}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#101827] border border-[#1E293B] space-y-1.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] flex items-center gap-1">
              <Info className="h-3 w-3 text-[#22D3EE]" />
              Engineering Details
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {selectedNode.details}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
              Associated Technologies & AWS Services
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-[#101827] border border-[#1E293B] text-[#22D3EE]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
