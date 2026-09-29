import { Project } from '@/types';

export const featuredProjects: Project[] = [
  {
    id: 'enterprise-aws-devops-platform',
    slug: 'enterprise-aws-devops-platform',
    title: 'Enterprise AWS DevOps Platform',
    tagline: 'End-to-end cloud foundation with IaC, managed Kubernetes, and multi-tier VPC architecture.',
    description:
      'A production-ready enterprise AWS infrastructure automated via Terraform, featuring modular VPC networks, secure IAM boundaries, managed Amazon EKS clusters, and automated continuous delivery.',
    tags: ['AWS', 'Terraform', 'EKS', 'VPC', 'IAM', 'CloudWatch'],
    highlights: [
      'Modular Terraform infrastructure with remote state locking in S3/DynamoDB',
      'Production AWS EKS cluster with managed node groups and autoscaling',
      'Multi-AZ VPC architecture with private subnets and NAT Gateways',
    ],
    links: {
      github: '#', // Placeholder link
      demo: '#',
      documentation: '#',
    },
    asset: {
      type: 'diagram',
      url: '/assets/projects/aws-platform.svg',
      alt: 'Enterprise AWS DevOps Platform Architecture Diagram',
      caption: 'AWS Multi-tier Architecture with Terraform and EKS',
    },
    featured: true,
    order: 1,
  },
  {
    id: 'kubernetes-microservices-platform',
    slug: 'kubernetes-microservices-platform',
    title: 'Kubernetes Microservices Platform',
    tagline: 'Highly available containerized microservices platform with Helm, Ingress, and auto-scaling.',
    description:
      'Scalable microservices deployment architecture orchestrated on Kubernetes, utilizing Helm charts for release management, NGINX Ingress for traffic control, and HPA for load-responsive scaling.',
    tags: ['EKS', 'Docker', 'Kubernetes', 'Helm', 'NGINX Ingress', 'HPA'],
    highlights: [
      'Docker multi-stage optimized builds for minimal container footprint',
      'Configurable Helm charts for streamlined staging and production releases',
      'Horizontal Pod Autoscaler (HPA) integrated with cluster metrics',
    ],
    links: {
      github: '#', // Placeholder link
      demo: '#',
      documentation: '#',
    },
    asset: {
      type: 'diagram',
      url: '/assets/projects/k8s-platform.svg',
      alt: 'Kubernetes Microservices Architecture Diagram',
      caption: 'Kubernetes Cluster Architecture with Ingress and Auto-scaling',
    },
    featured: true,
    order: 2,
  },
  {
    id: 'cicd-automation-platform',
    slug: 'cicd-automation-platform',
    title: 'CI/CD Automation Platform',
    tagline: 'Zero-downtime deployment pipeline with automated linting, security scans, and container delivery.',
    description:
      'Comprehensive continuous integration and continuous deployment pipeline utilizing Jenkins and GitHub Actions to automate code validation, container image builds, ECR publishing, and rolling deployments to AWS.',
    tags: ['Jenkins', 'GitHub Actions', 'Docker', 'AWS ECR', 'AWS EKS', 'Security Scanning'],
    highlights: [
      'Automated pull request validation, linting, and unit test execution',
      'Container vulnerability scanning before Amazon ECR image push',
      'Zero-downtime rolling deployment triggers with rollback mechanisms',
    ],
    links: {
      github: '#', // Placeholder link
      demo: '#',
      documentation: '#',
    },
    asset: {
      type: 'diagram',
      url: '/assets/projects/cicd-pipeline.svg',
      alt: 'CI/CD Pipeline Workflow Diagram',
      caption: 'Automated CI/CD Pipeline from Git Commit to Production EKS',
    },
    featured: true,
    order: 3,
  },
];
