import { Project } from '@/types';

export const featuredProjects: Project[] = [
  {
    id: 'enterprise-aws-devops-platform',
    slug: 'enterprise-aws-devops-platform',
    title: 'Enterprise AWS DevOps Platform',
    category: 'AWS / TERRAFORM',
    year: '2026',
    tagline: 'Modular, production-ready AWS cloud infrastructure orchestrated entirely through code.',
    description:
      'A modular Terraform infrastructure blueprint designed for enterprise AWS environments. It provisions isolated multi-AZ VPC networks, strict IAM least-privilege policies, KMS-encrypted storage backends, and managed Amazon EKS clusters equipped with ALB Ingress and AWS WAF protection.',
    problem:
      'Manual console provisioning leads to configuration drift, lack of environment parity, security holes in network access, and slow disaster recovery.',
    architectureOverview:
      'Internet → AWS WAF / CloudFront → Application Load Balancer → EKS Managed Node Groups (Gateway, Auth, User Services) → Private Subnets & KMS Encrypted S3 / RDS',
    tags: ['AWS', 'Terraform', 'EKS', 'VPC', 'IAM', 'KMS', 'Secrets Manager', 'ECR', 'ALB', 'CloudFront', 'WAF'],
    workflow: ['Terraform Plan', 'IAM Validation', 'VPC Provisioning', 'EKS Bootstrap', 'ALB Ingress Setup'],
    highlights: [
      'Modular Terraform architecture with S3 remote backend and DynamoDB state locking',
      'Multi-AZ VPC layout with public, private, and database subnets isolated via route tables',
      'KMS encryption at rest for EBS volumes, S3 buckets, and RDS instances',
      'Secrets Manager integration for dynamic credential management without plaintext secrets',
    ],
    links: {
      github: '#',
      demo: '#',
      documentation: '#',
    },
    featured: true,
    order: 1,
  },
  {
    id: 'kubernetes-microservices-platform',
    slug: 'kubernetes-microservices-platform',
    title: 'Kubernetes Microservices Platform',
    category: 'KUBERNETES / DOCKER',
    year: '2025',
    tagline: 'Containerized microservices orchestration on Amazon EKS with automated scaling and ingress.',
    description:
      'A production Kubernetes deployment architecture hosting multi-tier containerized microservices. Utilizes multi-stage Docker builds to reduce image footprints, Helm charts for parameterized releases across environments, and AWS Load Balancer Controller for path-based HTTP routing.',
    problem:
      'Deploying monolithic applications caused downtime during releases, resource contention, and difficulties scaling individual high-traffic services.',
    architectureOverview:
      'Developer Push → GitHub → Jenkins Pipeline → Multi-stage Docker Build → Amazon ECR → Helm Release → Amazon EKS Cluster → ALB Ingress → Auth / User / Core Pods',
    tags: ['Java', 'Maven', 'Docker', 'Amazon ECR', 'AWS EKS', 'Kubernetes', 'Helm', 'ALB Controller', 'HPA'],
    workflow: ['Multi-stage Docker Build', 'ECR Image Push', 'Helm Package', 'K8s Deployment', 'HPA Scaling'],
    highlights: [
      'Optimized multi-stage Docker builds reducing production image sizes by over 60%',
      'Configurable Helm charts managing dev, staging, and production Kubernetes manifests',
      'Horizontal Pod Autoscaling (HPA) responding to CPU and memory utilization thresholds',
      'Kubernetes ConfigMaps and Secret mounts for secure runtime environment injection',
    ],
    links: {
      github: '#',
      demo: '#',
      documentation: '#',
    },
    featured: true,
    order: 2,
  },
  {
    id: 'cicd-automation-platform',
    slug: 'cicd-automation-platform',
    title: 'CI/CD Automation Platform',
    category: 'CI/CD / SECURITY',
    year: '2025',
    tagline: 'Automated delivery pipeline with code quality gates, container security scans, and zero-downtime rollouts.',
    description:
      'An end-to-end continuous integration and deployment pipeline engineered with Jenkins and GitHub Actions. Automates Java build verification with Maven, static code quality analysis with SonarQube, container image CVE scanning with Trivy, and rolling updates to AWS EKS.',
    problem:
      'Manual testing and unverified deployments introduced bugs, security vulnerabilities in dependencies, and deployment downtime.',
    architectureOverview:
      'Git Commit → Jenkins Trigger → Maven Build & Unit Tests → SonarQube Quality Gate → Trivy Security Scan → Docker Image Build → ECR Registry → EKS Rolling Deployment',
    tags: ['Jenkins', 'GitHub Actions', 'Maven', 'SonarQube', 'Trivy', 'Docker', 'AWS ECR', 'AWS EKS'],
    workflow: ['Git Webhook', 'Maven Test', 'SonarQube Gate', 'Trivy Scan', 'ECR Push', 'EKS Rolling Update'],
    highlights: [
      'Automated pipeline triggers on Pull Request creation and main branch merges',
      'SonarQube quality gates enforcing code coverage and blocking high-severity bugs',
      'Trivy container scanning failing builds on Critical / High CVE vulnerabilities',
      'Zero-downtime rolling updates with automatic rollback on readiness probe failures',
    ],
    links: {
      github: '#',
      demo: '#',
      documentation: '#',
    },
    featured: true,
    order: 3,
  },
];
