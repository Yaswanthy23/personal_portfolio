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
    <section id="skills" className="py-20 sm:py-24 bg-[#050806] border-t border-[#17261D] relative">
      <Container size="lg">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1410] border border-[#17261D] text-[#00DC82] text-xs font-mono font-bold uppercase tracking-wider">
            <span>SKILLS &amp; SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFFFFF] tracking-tight">
            Core competencies &amp; engineering capabilities
          </h2>
          <p className="text-sm text-[#9CA3AF] max-w-2xl">
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
                className="p-6 rounded-2xl bg-[#0D1410] border border-[#17261D] hover:border-[#00DC82]/50 hover:shadow-[0_0_30px_rgba(0,220,130,0.15)] transition-all duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-4">
                  {/* Icon with emerald green accent */}
                  <div className="w-12 h-12 rounded-xl bg-[#080D0A] border border-[#17261D] flex items-center justify-center text-[#00DC82] group-hover:bg-[#00DC82] group-hover:text-[#050806] group-hover:shadow-[0_0_15px_#00DC82] transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] group-hover:text-[#00DC82] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-3 border-t border-[#17261D] flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono text-[#9CA3AF] bg-[#080D0A] border border-[#17261D] rounded"
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
