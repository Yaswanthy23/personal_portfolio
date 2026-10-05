import { TroubleshootingCase } from '@/types';

export const troubleshootingCases: TroubleshootingCase[] = [
  {
    id: 'terraform-state-locking',
    number: '01',
    title: 'Terraform State Lock & Concurrent Apply Conflicts',
    category: 'INFRASTRUCTURE AS CODE',
    problem:
      'A failed CI pipeline left an active lock entry in the backend DynamoDB lock table, causing all subsequent Terraform apply commands to fail with "Error acquiring the state lock: ConditionalCheckFailedException".',
    rootCause:
      'A previous Jenkins worker node was terminated mid-apply before the Terraform process could execute its release lock hook. The lock ID entry persisted in DynamoDB.',
    solution:
      'Verified via AWS CloudTrail and team channels that no apply operation was actively running. Used `terraform force-unlock <LOCK-ID>` with proper authorization, audited DynamoDB table item attributes, and updated pipeline timeout/cleanup handlers to prevent stale lock retention.',
    technologies: ['Terraform', 'AWS DynamoDB', 'S3 Remote Backend', 'CloudTrail'],
    impact: 'Restored automated pipeline deployments and prevented concurrent state corruption.',
  },
  {
    id: 'kms-secrets-manager',
    number: '02',
    title: 'KMS Key Policy & Secrets Decryption Failures in Pods',
    category: 'SECURITY & SECRETS',
    problem:
      'EKS worker nodes and application pods failed to decrypt runtime credentials fetched from AWS Secrets Manager, logging "AccessDeniedException: The ciphertext refers to a customer master key which does not exist, does not allow grant creation, or you are not authorized to access it".',
    rootCause:
      'The Secrets Manager secret was encrypted with a custom KMS Customer Managed Key (CMK). The IAM role assumed by the Kubernetes service account (IRSA) had SecretsManager:GetSecretValue permission but lacked kms:Decrypt permissions on the specific KMS Key Resource policy.',
    solution:
      'Updated the KMS key policy statement to explicitly allow `kms:Decrypt` and `kms:DescribeKey` for the IAM role associated with the pod ServiceAccount. Verified KMS key status was Enabled and confirmed successful secret injection via Secrets Store CSI driver.',
    technologies: ['AWS KMS', 'Secrets Manager', 'IAM Roles for Service Accounts (IRSA)', 'Kubernetes'],
    impact: 'Enabled secure, dynamic credential retrieval without hardcoding secrets in environment variables.',
  },
  {
    id: 'eks-auth-rbac',
    number: '03',
    title: 'EKS IAM Authentication & RBAC Unauthorized Access',
    category: 'KUBERNETES & ACCESS',
    problem:
      'New DevOps team members and Jenkins deployment agents received "error: You must be logged in to the server (Unauthorized)" when executing `kubectl` commands against the Amazon EKS cluster, despite having valid AWS CLI credentials.',
    rootCause:
      'EKS uses the `aws-auth` ConfigMap in the `kube-system` namespace (or EKS Access Entries in newer versions) to map AWS IAM ARNs to Kubernetes RBAC groups. The newly created IAM role had not been mapped to the `system:masters` or appropriate `ClusterRoleBinding`.',
    solution:
      'Inspected the `aws-auth` ConfigMap using an administrative IAM role, added the role ARN under `mapRoles` with the correct `groups` (`system:bootstrappers`, `system:nodes`, and custom engineering groups), verified the IAM STS token payload, and established reusable IAM role mappings in Terraform.',
    technologies: ['Amazon EKS', 'Kubernetes RBAC', 'AWS IAM', 'kubectl', 'aws-auth'],
    impact: 'Standardized RBAC onboarding and eliminated deployment pipeline authorization failures.',
  },
  {
    id: 'container-crashloop',
    number: '04',
    title: 'Pod CrashLoopBackOff & OOMKilled Resource Sizing',
    category: 'CONTAINERS & ORCHESTRATION',
    problem:
      'During a deployment, application pods entered continuous `CrashLoopBackOff` and `OOMKilled` (Exit Code 137) states immediately after startup, failing Kubernetes readiness probes and triggering rollout stalls.',
    rootCause:
      'The JVM heap memory allocation (`-Xmx`) inside the container exceeded the Kubernetes pod `resources.limits.memory` defined in the Helm chart. When the container initialized, the Linux kernel OOM killer terminated the process due to exceeding cgroup memory limits.',
    solution:
      'Adjusted container memory requests and limits in the Helm values to align with actual JVM runtime requirements. Configured JVM container-aware flags (`-XX:+UseContainerSupport` and `-XX:MaxRAMPercentage=75.0`) and fine-tuned initial delay seconds on the readiness probe.',
    technologies: ['Docker', 'Kubernetes (EKS)', 'Helm', 'JVM Tuning', 'Linux cgroups'],
    impact: 'Stabilized application pod startup, eliminated deployment stalls, and established predictable memory sizing.',
  },
  {
    id: 'linux-networking-disk',
    number: '05',
    title: 'Linux Inode Exhaustion & Systemd Service Dependency Failures',
    category: 'LINUX SYSTEMS',
    problem:
      'A continuous integration build server abruptly halted with "No space left on device", even though `df -h` reported only 42% disk space used. Build agents could not create temporary workspace directories.',
    rootCause:
      '`df -i` revealed 100% inode utilization. Thousands of abandoned zero-byte temporary files and uncleaned Docker build cache layers had exhausted the filesystem inode table.',
    solution:
      'Identified and purged the stranded cache directory using `find /tmp -type f -delete`, set up an automated cron task with `docker system prune --volumes -f --filter "until=72h"`, and configured logrotate to prevent inode and disk exhaustion.',
    technologies: ['Ubuntu Linux', 'systemd', 'Bash Scripting', 'Docker Storage', 'Cron'],
    impact: 'Restored build server availability and implemented proactive automated disk/inode hygiene.',
  },
];
