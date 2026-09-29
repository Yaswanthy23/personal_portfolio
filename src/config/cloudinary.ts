/**
 * Cloudinary Configuration
 * Reads public and private credentials from environment variables.
 * Safe for both client and server runtime.
 */

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.CLOUDINARY_API_KEY || '',
  // Note: CLOUDINARY_API_SECRET is server-only and should NEVER be prefixed with NEXT_PUBLIC_
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
  defaultFolder: 'portfolio-yaswanth',
  isConfigured: Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
};

export const assetFolders = {
  profile: 'portfolio-yaswanth/profile',
  projects: 'portfolio-yaswanth/projects',
  architecture: 'portfolio-yaswanth/architecture',
  certifications: 'portfolio-yaswanth/certifications',
  documents: 'portfolio-yaswanth/documents',
} as const;
