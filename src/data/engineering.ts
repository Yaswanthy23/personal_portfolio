import { EngineeringPrinciple, ArchitectureNode, WorkflowStage } from '@/types';

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: 'iac',
    number: '01',
    title: 'Infrastructure as Code',
    description: 'Reusable Terraform modules instead of manually managed cloud infrastructure.',
    details:
      'I treat cloud infrastructure as software. By writing declarative, modular Terraform templates with version control, state locking, and automated validation, every environment from dev to prod is reproducible, audited, and immune to manual drift.',
  },
  {
    id: 'automation',
    number: '02',
    title: 'Automate Repetitive Work',
    description: 'Automate build, test, security analysis, and deployment tasks.',
    details:
      'If a task is executed more than twice, it belongs in code. Automated CI/CD pipelines in Jenkins and GitHub Actions remove human error from deployments and allow developers to release updates quickly and with confidence.',
  },
  {
    id: 'security',
    number: '03',
    title: 'Security by Design',
    description: 'IAM least privilege, secrets management, encryption, and isolated networking.',
    details:
      'Security is not an afterthought added before release. From least-privilege IAM roles and isolated VPC subnets to KMS customer-managed keys and automated Trivy CVE vulnerability scans in CI, security is baked into the foundation.',
  },
  {
    id: 'containers',
    number: '04',
    title: 'Consistent Environments',
    description: 'Use Docker and Kubernetes for consistent application delivery.',
    details:
      'Containerizing applications with multi-stage Docker builds guarantees that what runs on a local machine executes identically in production Kubernetes clusters, eliminating "it works on my machine" issues.',
  },
  {
    id: 'observability',
    number: '05',
    title: 'Observable & Maintainable',
    description: 'Build systems that can be easily monitored, investigated, and maintained.',
    details:
      'Production systems must provide clear visibility. Centralized logging, meaningful metrics, health probes, and structured alerts turn cryptic downtime into quick, diagnostic root-cause resolution.',
  },
];

export const architectureNodes: ArchitectureNode[] = [
  {
    id: 'aws-cloud',
    label: 'AWS Cloud',
    category: 'Root Provider',
    description: 'Global cloud infrastructure hosting all compute, storage, and networking resources.',
    details:
      'Provisioned across multiple Availability Zones with strict organizational governance, CloudTrail audit logs, and AWS Budgets alerting.',
    technologies: ['AWS', 'us-east-1', 'Multi-AZ'],
  },
  {
    id: 'vpc',
    label: 'Virtual Private Cloud (VPC)',
    category: 'Networking',
    description: 'Isolated software-defined network boundary with custom CIDR blocks and routing.',
    details:
      'Partitioned into public, private application, and private database subnets across 2 Availability Zones with NAT Gateways for outbound security.',
    technologies: ['VPC', 'Subnets', 'Route Tables', 'NAT Gateway', 'Internet Gateway'],
  },
  {
    id: 'iam',
    label: 'IAM & Security Governance',
    category: 'Access & Identity',
    description: 'Granular identity and access control enforcing least-privilege principles.',
    details:
      'Service-specific IAM roles, OIDC identity federation for Kubernetes ServiceAccounts (IRSA), and KMS key policies protecting sensitive data.',
    technologies: ['IAM Roles', 'IRSA', 'KMS', 'Secrets Manager', 'Security Groups'],
  },
  {
    id: 'public-subnet',
    label: 'Public Subnet / Ingress',
    category: 'Network Tier',
    description: 'Front-facing network zone accessible from the internet through Internet Gateway.',
    details:
      'Houses Application Load Balancers and NAT Gateways. Direct compute access is disallowed; all incoming requests are filtered by AWS WAF.',
    technologies: ['AWS WAF', 'ALB', 'ACM SSL/TLS', 'NAT Gateway'],
  },
  {
    id: 'private-subnet',
    label: 'Private Subnet / Compute',
    category: 'Compute Tier',
    description: 'Secure internal network zone with no direct inbound internet routes.',
    details:
      'Hosts Amazon EKS managed worker nodes. Outbound traffic to pull container images or external APIs routes via NAT Gateways in public subnets.',
    technologies: ['Private Subnet', 'EKS Worker Nodes', 'Auto Scaling Group'],
  },
  {
    id: 'alb',
    label: 'Application Load Balancer',
    category: 'Traffic Routing',
    description: 'Layer 7 load balancer distributing incoming web traffic across target groups.',
    details:
      'Managed dynamically by AWS Load Balancer Controller in Kubernetes based on Ingress resource rules, handling SSL termination with ACM certificates.',
    technologies: ['ALB', 'AWS Load Balancer Controller', 'ACM', 'Target Groups'],
  },
  {
    id: 'eks-cluster',
    label: 'Amazon EKS Cluster',
    category: 'Orchestration',
    description: 'Managed Kubernetes control plane and autoscaling worker node groups.',
    details:
      'Runs containerized microservices across multiple AZs. Configured with Cluster Autoscaler, CoreDNS, and AWS VPC CNI for native pod IP addressing.',
    technologies: ['Amazon EKS', 'Kubernetes', 'Helm', 'VPC CNI', 'HPA'],
  },
  {
    id: 'microservices',
    label: 'Containerized Services',
    category: 'Application Workloads',
    description: 'Modular microservice pods (Gateway, Auth, User, Data) deployed via Helm.',
    details:
      'Packaged with multi-stage Docker builds, consuming secrets from AWS Secrets Manager via CSI driver, scaled by Horizontal Pod Autoscalers.',
    technologies: ['Docker', 'Helm Charts', 'ConfigMaps', 'Secrets CSI', 'Readiness Probes'],
  },
  {
    id: 'storage-db',
    label: 'Persistent Storage & DB',
    category: 'Data Tier',
    description: 'Isolated database subnet tier hosting managed Amazon RDS and encrypted S3 buckets.',
    details:
      'Encrypted at rest with AWS KMS Customer Master Keys, backed up automatically, and accessible strictly from EKS security groups.',
    technologies: ['Amazon RDS', 'Amazon S3', 'KMS Encryption', 'Automated Backups'],
  },
];

export const workflowStages: WorkflowStage[] = [
  {
    id: 'plan',
    step: 1,
    name: 'Plan & Architecture',
    tool: 'Git / Jira',
    category: 'Design',
    description: 'Define requirements, review cloud architecture blueprints, and plan modular components.',
    actions: ['Architecture review', 'Security boundary design', 'Cost & resource estimation'],
  },
  {
    id: 'terraform',
    step: 2,
    name: 'IaC Provisioning',
    tool: 'Terraform',
    category: 'Infrastructure',
    description: 'Provision modular AWS resources with remote state locking in S3 and DynamoDB.',
    actions: ['terraform fmt & validate', 'terraform plan dry run', 'Automated PR spec verification'],
  },
  {
    id: 'build',
    step: 3,
    name: 'Build & Unit Test',
    tool: 'Maven / Node',
    category: 'CI Pipeline',
    description: 'Compile application source code and execute automated unit test suites in Jenkins.',
    actions: ['Dependency resolution', 'Compilation', 'Unit test execution'],
  },
  {
    id: 'quality',
    step: 4,
    name: 'Code Quality Gate',
    tool: 'SonarQube',
    category: 'Code Analysis',
    description: 'Static analysis for code smells, bugs, security hotspots, and test coverage thresholds.',
    actions: ['Static code analysis', 'Quality Gate evaluation', 'Block PR on blocker bugs'],
  },
  {
    id: 'security-scan',
    step: 5,
    name: 'Security Vulnerability Scan',
    tool: 'Trivy / OWASP',
    category: 'Security',
    description: 'Scan container base images and third-party dependencies for known CVE vulnerabilities.',
    actions: ['Container image CVE scan', 'Dependency license check', 'Fail build on CRITICAL severity'],
  },
  {
    id: 'docker-build',
    step: 6,
    name: 'Container Packaging',
    tool: 'Docker',
    category: 'Containers',
    description: 'Build optimized multi-stage Docker images with minimal production runtimes.',
    actions: ['Multi-stage Docker build', 'Tag with Git commit SHA', 'Image footprint optimization'],
  },
  {
    id: 'ecr-push',
    step: 7,
    name: 'Registry Publication',
    tool: 'Amazon ECR',
    category: 'Registry',
    description: 'Push verified immutable container images to Amazon Elastic Container Registry.',
    actions: ['ECR authentication', 'Image tag versioning', 'Image scan on push trigger'],
  },
  {
    id: 'eks-deploy',
    step: 8,
    name: 'Kubernetes Rollout',
    tool: 'Helm / EKS',
    category: 'CD Pipeline',
    description: 'Deploy release packages to Amazon EKS with rolling updates and zero downtime.',
    actions: ['Helm chart deployment', 'Rolling update verification', 'Health probe checks'],
  },
  {
    id: 'monitor',
    step: 9,
    name: 'Observability & Metrics',
    tool: 'CloudWatch / Grafana',
    category: 'Operations',
    description: 'Monitor service latency, error rates, CPU/Memory utilization, and container logs.',
    actions: ['Prometheus metric scrapers', 'CloudWatch log aggregation', 'Automated anomaly alerts'],
  },
];
