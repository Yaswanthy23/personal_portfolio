import { Profile } from '@/types';

export const profileData: Profile = {
  name: 'Yaswanth',
  firstName: 'Yaswanth',
  lastName: '',
  role: 'AWS DevOps Engineer',
  eyebrow: 'AWS DEVOPS ENGINEER',
  shortTitle: 'AWS DevOps Engineer',
  location: 'Remote / Hybrid',
  availability: 'Available for Opportunities',
  summary:
    'AWS DevOps Engineer focused on building reproducible cloud infrastructure, automating deployment pipelines, and troubleshooting real production systems with Terraform and Kubernetes.',
  heroIntroduction:
    "Hi, I'm Yaswanth, an AWS DevOps Engineer. I work with AWS, Terraform, Docker, Kubernetes, and CI/CD to build cloud infrastructure and automate application deployments. I enjoy solving real infrastructure problems and turning manual processes into simple, automated solutions.",
  aboutStory: {
    intro:
      "I'm an AWS DevOps Engineer who enjoys the intersection of cloud infrastructure, automation, and systems reliability. My day-to-day work centers around turning manual, error-prone deployment steps into predictable, code-driven workflows.",
    focus:
      "I primarily work with AWS services (EC2, VPC, EKS, ECR, IAM, S3, RDS), provisioning modular infrastructure with Terraform, containerizing applications with Docker, and orchestrating deployments across Kubernetes clusters. I also design CI/CD pipelines using Jenkins and GitHub Actions so software can be tested, scanned, and delivered reliably.",
    journey:
      "Beyond setting up pipelines and clusters, I genuinely enjoy the troubleshooting side of DevOps—investigating container startup failures, debugging IAM access policies, resolving Terraform state locks, and tuning Linux system performance. My goal is to continually sharpen my engineering craft and grow into a strong senior cloud & DevOps engineer.",
  },
  profileImage: {
    src: '/images/profile-placeholder.png',
    alt: 'DevOps engineer working with cloud infrastructure',
  },
  resumeUrl: '/assets/Yaswanth_DevOps_Resume.pdf', // Easy to replace with Cloudinary URL
};
