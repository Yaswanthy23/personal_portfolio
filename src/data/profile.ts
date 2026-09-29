import { Profile } from '@/types';

export const profileData: Profile = {
  name: 'Yaswanth',
  firstName: 'Yaswanth',
  lastName: '',
  role: 'AWS DevOps Engineer',
  shortTitle: 'AWS DevOps Engineer',
  status: 'Available for Cloud & DevOps Engineering Opportunities',
  location: 'Remote / Hybrid',
  availability: 'Open to Work',
  summary:
    'AWS DevOps Engineer focused on engineering automated, resilient, and production-grade cloud infrastructure. Experienced in Infrastructure as Code (IaC), containerized microservices orchestration, and declarative CI/CD pipelines to accelerate software delivery with maximum reliability and security.',
  heroKeywords: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD'],
  terminalWhoami: {
    command: 'whoami',
    role: 'AWS DevOps Engineer',
    tagline: 'Building automated, scalable and production-ready cloud infrastructure.',
    stack: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD', 'Linux'],
  },
  aboutHighlights: [
    {
      title: 'Infrastructure as Code',
      description: 'Declarative, modular, and version-controlled cloud infrastructure provisioning using Terraform and AWS CloudFormation.',
      icon: 'Layers',
    },
    {
      title: 'Container Orchestration',
      description: 'Production Kubernetes (EKS) architectures with container lifecycle management, auto-scaling, and GitOps workflows.',
      icon: 'Cpu',
    },
    {
      title: 'CI/CD Automation',
      description: 'Automated build, test, security analysis, and zero-downtime deployment pipelines using GitHub Actions and Jenkins.',
      icon: 'GitBranch',
    },
    {
      title: 'Production Reliability',
      description: 'Observability, automated health monitoring, proactive alerting, and resilient cloud architectures aligned with the AWS Well-Architected Framework.',
      icon: 'ShieldCheck',
    },
  ],
};
