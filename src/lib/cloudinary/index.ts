import { cloudinaryConfig, assetFolders } from '@/config/cloudinary';
import { AssetOptions } from '@/types';

/**
 * Generates a Cloudinary URL with transformations or falls back gracefully to local/placeholder asset.
 * 
 * @param publicIdOrPath - Cloudinary public ID (e.g. 'profile/avatar') or local fallback path (e.g. '/images/placeholder.webp')
 * @param options - Transformation options (width, height, quality, format, crop)
 * @param folder - Optional preconfigured folder category
 * @returns Fully qualified asset URL
 */
export function getAssetUrl(
  publicIdOrPath: string,
  options?: AssetOptions,
  folder?: keyof typeof assetFolders
): string {
  if (!publicIdOrPath) {
    return '/assets/placeholders/default-diagram.svg';
  }

  // If already an absolute external URL or data URI, return as-is
  if (publicIdOrPath.startsWith('http://') || publicIdOrPath.startsWith('https://') || publicIdOrPath.startsWith('data:')) {
    return publicIdOrPath;
  }

  // If Cloudinary is configured with cloudName and is given a public ID
  if (cloudinaryConfig.isConfigured && !publicIdOrPath.startsWith('/')) {
    return buildCloudinaryUrl(publicIdOrPath, options, folder);
  }

  // Otherwise return local public path
  return publicIdOrPath.startsWith('/') ? publicIdOrPath : `/${publicIdOrPath}`;
}

/**
 * Builds optimized Cloudinary delivery URL with transformation parameters
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: AssetOptions = {},
  folderKey?: keyof typeof assetFolders
): string {
  const { cloudName } = cloudinaryConfig;
  if (!cloudName) {
    return publicId.startsWith('/') ? publicId : `/${publicId}`;
  }

  const transformations: string[] = [];

  // Transformations
  const format = options.format || 'auto';
  const quality = options.quality || 'auto';
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  if (options.width) {
    transformations.push(`w_${options.width}`);
  }
  if (options.height) {
    transformations.push(`h_${options.height}`);
  }
  if (options.crop) {
    transformations.push(`c_${options.crop}`);
  }

  const transformString = transformations.join(',');
  const prefixFolder = folderKey ? assetFolders[folderKey] : '';
  const fullPublicId = prefixFolder ? `${prefixFolder}/${publicId.replace(/^\//, '')}` : publicId.replace(/^\//, '');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${fullPublicId}`;
}

/**
 * Generates responsive srcSet URLs for Cloudinary or fallback images
 */
export function getResponsiveImageProps(
  publicIdOrPath: string,
  widths: number[] = [320, 640, 768, 1024, 1280],
  folderKey?: keyof typeof assetFolders
) {
  const src = getAssetUrl(publicIdOrPath, { width: widths[widths.length - 1] }, folderKey);

  if (!cloudinaryConfig.isConfigured || publicIdOrPath.startsWith('/')) {
    return { src };
  }

  const srcSet = widths
    .map((w) => `${getAssetUrl(publicIdOrPath, { width: w, quality: 'auto', format: 'auto' }, folderKey)} ${w}w`)
    .join(', ');

  return {
    src,
    srcSet,
  };
}

export { assetFolders };
