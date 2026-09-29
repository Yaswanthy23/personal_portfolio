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

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    description?: string;
    isPrimary?: boolean;
  }[];
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
  tagline: string;
  description: string;
  keyFeatures?: string[];
  tags: string[];
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

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  shortTitle: string;
  status: string;
  location: string;
  availability: string;
  summary: string;
  aboutHighlights: {
    title: string;
    description: string;
    icon: string;
  }[];
  heroKeywords: string[];
  terminalWhoami: {
    command: string;
    role: string;
    tagline: string;
    stack: string[];
  };
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
