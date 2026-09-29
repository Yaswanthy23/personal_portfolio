import { SkillCategory } from '@/types';

export const techStackData: SkillCategory[] = [
  {
    id: 'cloud',
    category: 'Cloud',
    description: 'Cloud architecture, identity, computing, and managed services',
    iconName: 'Cloud',
    skills: [
      { name: 'AWS', isPrimary: true, description: 'Amazon Web Services Ecosystem' },
      { name: 'EC2 & VPC', description: 'Compute & Network Architecture' },
      { name: 'S3 & IAM', description: 'Storage & Security Governance' },
      { name: 'CloudWatch', description: 'Metrics & Logging' },
      { name: 'Lambda', description: 'Serverless Functions' },
    ],
  },
  {
    id: 'infrastructure',
    category: 'Infrastructure',
    description: 'Infrastructure as Code and state management',
    iconName: 'Boxes',
    skills: [
      { name: 'Terraform', isPrimary: true, description: 'Modular IaC Provisioning' },
      { name: 'AWS CloudFormation', description: 'Native AWS Templates' },
      { name: 'State Management', description: 'Remote Backends & Locking' },
      { name: 'HCL Modules', description: 'Reusable Infrastructure Components' },
    ],
  },
  {
    id: 'containers',
    category: 'Containers',
    description: 'Container packaging, optimization, and registries',
    iconName: 'Box',
    skills: [
      { name: 'Docker', isPrimary: true, description: 'Multi-stage Builds & Security' },
      { name: 'Docker Compose', description: 'Local Dev Environments' },
      { name: 'Amazon ECR', description: 'Elastic Container Registry' },
      { name: 'Image Optimization', description: 'Lean & Secure Base Images' },
    ],
  },
  {
    id: 'orchestration',
    category: 'Orchestration',
    description: 'Managed Kubernetes clusters and service routing',
    iconName: 'Cpu',
    skills: [
      { name: 'Kubernetes', isPrimary: true, description: 'Cluster Architecture & Manifests' },
      { name: 'AWS EKS', isPrimary: true, description: 'Elastic Kubernetes Service' },
      { name: 'Helm', description: 'Package Management for K8s' },
      { name: 'Ingress & Services', description: 'Traffic Routing & Load Balancing' },
    ],
  },
  {
    id: 'cicd',
    category: 'CI/CD',
    description: 'Automated continuous integration and deployment pipelines',
    iconName: 'GitMerge',
    skills: [
      { name: 'Jenkins', isPrimary: true, description: 'Declarative Pipelines' },
      { name: 'GitHub Actions', isPrimary: true, description: 'Workflow Automation' },
      { name: 'Automated Testing', description: 'Quality & Security Gates' },
      { name: 'Deployment Strategies', description: 'Blue/Green & Rolling Updates' },
    ],
  },
  {
    id: 'operating-systems',
    category: 'Operating Systems',
    description: 'System administration, shells, and automation scripting',
    iconName: 'Terminal',
    skills: [
      { name: 'Linux', isPrimary: true, description: 'Ubuntu / Amazon Linux' },
      { name: 'Bash Scripting', description: 'System Automation & CLI Tools' },
      { name: 'SSH & Networking', description: 'Security & Access Protocols' },
      { name: 'Systemd & Cron', description: 'Process & Task Management' },
    ],
  },
];
