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
      "I'm a DevOps Engineer working with AWS, infrastructure automation, and application deployments.",
    focus:
      "I enjoy working on real-world projects, setting up infrastructure, automating deployments, and troubleshooting issues when things don't go as expected. I've worked with tools like Terraform, Docker, Kubernetes, Jenkins, and Prometheus, and I'm always looking for opportunities to learn and improve through hands-on work.",
    journey:
      "For me, DevOps is more than just working with tools. It's about understanding how things work, solving problems, and finding better ways to deploy and manage applications. I like exploring new technologies, learning from challenges, and pushing myself to handle more complex infrastructure and production environments.",
  },
  profileImage: {
    src: '/images/profile-placeholder.png',
    alt: 'DevOps engineer working with cloud infrastructure',
  },
  resumeUrl: '/assets/Yaswanth_DevOps_Resume.pdf', // Easy to replace with Cloudinary URL
};
