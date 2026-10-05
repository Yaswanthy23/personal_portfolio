export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
  isPlaceholder?: boolean;
}

export interface SkillItem {
  name: string;
  description?: string;
  isPrimary?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  description?: string;
  skills: string[] | SkillItem[];
}

export interface ProjectAsset {
  type: 'image' | 'diagram' | 'thumbnail';
  url: string;
  alt: string;
  caption?: string;
  publicId?: string; // Cloudinary public ID for future integration
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  problem: string;
  architectureOverview?: string;
  tags: string[];
  workflow?: string[];
  highlights?: string[];
  links: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  asset?: ProjectAsset;
  featured: boolean;
  order: number;
}

export interface ProfileImageConfig {
  src: string;
  alt: string;
  badge?: string;
  tags?: string[];
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  eyebrow: string;
  shortTitle: string;
  location: string;
  availability: string;
  summary: string;
  heroIntroduction: string;
  aboutStory: {
    intro: string;
    focus: string;
    journey: string;
  };
  profileImage: ProfileImageConfig;
  resumeUrl: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EngineeringPrinciple {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  category: string;
  description: string;
  details: string;
  technologies: string[];
  x?: number;
  y?: number;
}

export interface WorkflowStage {
  id: string;
  step: number;
  name: string;
  tool: string;
  category: string;
  description: string;
  actions: string[];
}

export interface TroubleshootingCase {
  id: string;
  number: string;
  title: string;
  category: string;
  problem: string;
  rootCause: string;
  solution: string;
  technologies: string[];
  impact: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  apiKey?: string;
  apiSecret?: string;
  secure: boolean;
}

export interface AssetOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'png' | 'jpg';
  crop?: 'fill' | 'scale' | 'fit' | 'thumb';
}

