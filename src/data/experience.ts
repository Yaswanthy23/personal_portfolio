import { ExperienceItem } from '@/types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'speshway-devops-engineer',
    company: 'Speshway Solutions',
    role: 'DevOps Engineer',
    period: '2023 — Present',
    location: 'Hyderabad, India / Remote',
    type: 'Full-time',
    description:
      'Responsible for designing, provisioning, and maintaining cloud infrastructure on AWS, building automated CI/CD pipelines, and managing containerized microservices on Kubernetes.',
    responsibilities: [
      'Provisioned and maintained multi-tier AWS infrastructure (VPC, subnets, route tables, NAT gateways, security groups) using modular Terraform with remote state management.',
      'Containerized Java and Node.js microservices using multi-stage Docker builds, optimizing image sizes and vulnerability surface.',
      'Managed container workloads on Amazon EKS, configuring deployments, services, Ingress controllers (ALB), and Horizontal Pod Autoscalers (HPA).',
      'Built automated CI/CD pipelines in Jenkins and GitHub Actions with integrated code quality checks (SonarQube) and container vulnerability scanning (Trivy).',
      'Configured IAM least-privilege roles, KMS encryption keys for storage backends, and AWS Secrets Manager for runtime credential injection.',
      'Investigated and resolved production incidents involving pod scheduling, CrashLoopBackOff, IAM permissions, and Linux server resource bottlenecks.',
    ],
    technologies: [
      'AWS',
      'Terraform',
      'Docker',
      'Kubernetes (EKS)',
      'Jenkins',
      'GitHub Actions',
      'Helm',
      'Linux',
      'SonarQube',
      'Trivy',
    ],
  },
];
