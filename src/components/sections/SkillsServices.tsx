'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Code, Cloud, Box, Zap, BarChart3, Terminal } from 'lucide-react';

const SERVICES = [
  {
    icon: Code,
    title: 'Infrastructure as Code',
    description:
      'Designing reusable, modular Terraform blueprints with S3 remote state backends, DynamoDB locking, and automated multi-environment provisioning.',
    tags: ['Terraform', 'HCL', 'State Locking', 'Modules'],
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture (AWS)',
    description:
      'Architecting resilient AWS topologies across multi-AZ VPCs, IAM least-privilege roles, KMS key policies, Secrets Manager, and ALB ingress routing.',
    tags: ['EC2', 'VPC', 'IAM', 'S3', 'RDS', 'ALB', 'KMS'],
  },
  {
    icon: Box,
    title: 'Container Orchestration',
    description:
      'Building lean multi-stage Docker images, configuring Amazon ECR repositories, and managing Kubernetes workloads on Amazon EKS using Helm charts.',
    tags: ['Docker', 'Kubernetes', 'EKS', 'Helm', 'HPA'],
  },
  {
    icon: Zap,
    title: 'CI/CD Pipeline Automation',
    description:
      'Engineering continuous integration pipelines in Jenkins and GitHub Actions with automated Maven builds, SonarQube gates, and Trivy vulnerability scans.',
    tags: ['Jenkins', 'GitHub Actions', 'SonarQube', 'Trivy'],
  },
  {
    icon: BarChart3,
    title: 'Observability & Monitoring',
    description:
      'Instrumenting cluster telemetry with Prometheus exporters, custom Grafana operational dashboards, CloudWatch alarms, and log analysis.',
    tags: ['Prometheus', 'Grafana', 'CloudWatch', 'Alerting'],
  },
  {
    icon: Terminal,
    title: 'Linux Systems & Security',
    description:
      'Hardening Linux environments (Ubuntu / Amazon Linux), crafting Bash automation scripts, managing systemd services, and tuning network traffic.',
    tags: ['Linux', 'Bash', 'systemd', 'SSH', 'Nginx'],
  },
];

export const SkillsServices: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-24 bg-[#060907] border-t border-[#19241C] relative">
      <Container size="lg">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1410] border border-[#19241C] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-wider">
            <span>SKILLS &amp; SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F4F9F5] tracking-tight">
            Core competencies &amp; engineering capabilities
          </h2>
          <p className="text-sm text-[#94A899] max-w-2xl">
            Practical infrastructure engineering skills applied across production AWS cloud and containerized environments.
          </p>
        </div>

        {/* 6-Card Grid (Matching Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="p-6 rounded-2xl bg-[#0E1410] border border-[#19241C] hover:border-[#CCFF00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)] transition-all duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-4">
                  {/* Icon with lime accent */}
                  <div className="w-12 h-12 rounded-xl bg-[#141E17] border border-[#1E2D22] flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#060907] group-hover:shadow-[0_0_15px_#CCFF00] transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#F4F9F5] group-hover:text-[#CCFF00] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A899] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-3 border-t border-[#19241C] flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono text-[#667A6B] bg-[#090D0A] border border-[#162018] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};
