'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Pause, Play, Compass } from 'lucide-react';

interface TechIconItem {
  id: string;
  name: string;
  color: string;
  svg: string;
}

// 25 Dedicated AWS Services & DevOps Tools (strictly excluding Kubernetes & EKS)
const CLOUD_ICONS: TechIconItem[] = [
  // --- AWS Services ---
  {
    id: 'aws',
    name: 'AWS',
    color: '#FF9900',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#232F3E" d="M12.92 11.23a10.9 10.9 0 0 1-5.18 1.15c-2.3 0-3.92-.88-3.92-2.54 0-1.28.98-2.27 2.65-2.61a15.7 15.7 0 0 1 3.52-.3v-.37c0-1.12-.6-1.74-2.05-1.74-1.23 0-2.3.43-2.9 1l-.9-1.26c.9-.84 2.37-1.4 4.14-1.4 2.68 0 3.78 1.34 3.78 3.5v4.54c0 .8.06 1.48.16 2.03h-1.92c-.1-.32-.18-.76-.2-1.24v-.26zm-1.88-2.7c-.82.07-2.1.18-2.9.46-.86.3-1.3.8-1.3 1.46 0 .93.9 1.44 2.22 1.44.92 0 1.62-.2 2.1-.56v-2.8z"/><path fill="#FF9900" d="M18.8 17.55c-2.64 1.95-6.52 2.97-9.84 2.97-4.66 0-8.85-1.72-12.02-4.59-.25-.23-.03-.54.27-.37 3.42 1.98 7.6 3.17 11.89 3.17 2.93 0 6.4-.66 9.38-2.03.45-.2.83.32.32.85z"/><path fill="#FF9900" d="M19.98 16.27c-.34-.44-2.23-.21-3.08-.11-.26.03-.3-.19-.07-.35 1.5-1.07 3.96-.76 4.26-.39.3.38-.08 2.87-1.48 4.05-.22.18-.43.09-.33-.16.33-.8 1.04-2.6.7-3.04z"/></svg>`,
  },
  {
    id: 'ec2',
    name: 'Amazon EC2',
    color: '#FF9900',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="#FF9900" stroke-width="2"/><rect x="8" y="8" width="8" height="8" rx="1" fill="#FF9900"/><path d="M9 2v3m6-3v3m-6 14v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" stroke="#FF9900" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'ecs',
    name: 'Amazon ECS',
    color: '#FF9900',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" fill="none" stroke="#FF9900" stroke-width="2"/><path d="M12 12l8-4.5M12 12v8M12 12L4 7.5" stroke="#FF9900" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="#FF9900"/></svg>`,
  },
  {
    id: 'ecr',
    name: 'Amazon ECR',
    color: '#FF9900',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="#FF9900" stroke-width="2"/><path d="M7 9h10M7 12h10M7 15h10" stroke="#FF9900" stroke-width="2" stroke-linecap="round"/><circle cx="5" cy="9" r="1.2" fill="#FF9900"/><circle cx="5" cy="12" r="1.2" fill="#FF9900"/><circle cx="5" cy="15" r="1.2" fill="#FF9900"/></svg>`,
  },
  {
    id: 's3',
    name: 'Amazon S3',
    color: '#569A31',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M19 4H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm0 6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" fill="none" stroke="#569A31" stroke-width="2"/><circle cx="7" cy="6" r="1.3" fill="#569A31"/><circle cx="7" cy="12" r="1.3" fill="#569A31"/><circle cx="7" cy="18" r="1.3" fill="#569A31"/></svg>`,
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    color: '#3B48CC',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" fill="none" stroke="#3B48CC" stroke-width="2"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" fill="none" stroke="#3B48CC" stroke-width="2"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" fill="none" stroke="#3B48CC" stroke-width="2"/></svg>`,
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    color: '#8C4FFF',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="#8C4FFF" stroke-width="2"/><circle cx="8" cy="8" r="2.2" fill="#8C4FFF"/><circle cx="16" cy="8" r="2.2" fill="#8C4FFF"/><circle cx="12" cy="16" r="2.2" fill="#8C4FFF"/><path d="M8 8l4 8 4-8" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    color: '#DD344C',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#DD344C"><path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3zm0 9a1.5 1.5 0 0 0-1.5 1.5c0 .53.28 1 .7 1.27L11 18h2l-.2-2.23c.42-.27.7-.74.7-1.27A1.5 1.5 0 0 0 12 13z"/></svg>`,
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    color: '#FF9900',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#FF9900"><path d="M7.74 3h3.58l5.58 15h2.1v3h-5.22L8.2 6H5V3h2.74zM3 21l3.7-7.8L9.2 18H5.6L3 21z"/></svg>`,
  },
  {
    id: 'cloudfront',
    name: 'AWS CloudFront',
    color: '#8C4FFF',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#8C4FFF" stroke-width="2"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="#8C4FFF" stroke-width="1.8"/></svg>`,
  },
  {
    id: 'cloudwatch',
    name: 'AWS CloudWatch',
    color: '#FF4F8B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-9 9c0 3.8 2.4 7 5.7 8.3L12 12l7 3.3A9 9 0 0 0 12 3z" fill="none" stroke="#FF4F8B" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="#FF4F8B"/><path d="M12 12l3.5-3.5" stroke="#FF4F8B" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'kms',
    name: 'AWS KMS',
    color: '#DD344C',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><circle cx="7" cy="12" r="4" fill="none" stroke="#DD344C" stroke-width="2"/><path d="M11 12h10m-3 0v3m3-3v3" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/></svg>`,
  },

  // --- DevOps Tools ---
  {
    id: 'terraform',
    name: 'Terraform',
    color: '#844FBA',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#844FBA"><path d="M1.44 0v7.575l6.554 3.79V3.79zM8.718 4.232v7.576L15.274 8V.424zM8.718 12.632v7.575l6.556-3.788V8.844zM16.002 4.232v7.576l6.558-3.79V.424zM1.44 8.465v7.575l6.554 3.79v-7.576z"/></svg>`,
  },
  {
    id: 'docker',
    name: 'Docker',
    color: '#2496ED',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#2496ED"><path d="M13.98 10.02h2.04V8.04H13.98v1.98zm-2.58 0h2.04V8.04H11.4v1.98zm-2.58 0h2.04V8.04H8.82v1.98zm-2.58 0h2.04V8.04H6.24v1.98zm7.74-2.52h2.04V5.52h-2.04v1.98zm-2.58 0h2.04V5.52H11.4v1.98zm-2.58 0h2.04V5.52H8.82v1.98zm5.16-2.52h2.04V3H13.98v1.98zm9.3 6.96c-.36-.24-.96-.36-1.5-.36-.42 0-.96.06-1.38.24-.36-.96-1.02-1.56-1.92-1.86-.48-.18-1.02-.18-1.5-.12-.12-.06-.3-.12-.48-.18H3.36c-.48 0-.9.36-.96.84C2.1 14.88 3.9 18.72 7.5 20.34c3.42 1.56 8.52 1.38 12.06-.9 2.58-1.68 3.96-4.56 3.72-7.02z"/></svg>`,
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    color: '#D24939',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#D24939"><path d="M12 2a5 5 0 0 0-5 5c0 1.8.9 3.3 2.3 4.2-.4.8-.9 1.7-1.5 2.5C6.4 15.3 5 17.4 5 20h14c0-2.6-1.4-4.7-2.8-6.3-.6-.8-1.1-1.7-1.5-2.5 1.4-.9 2.3-2.4 2.3-4.2a5 5 0 0 0-5-5zm-2.5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-2.5 8c1.3 0 2.5.5 3.4 1.3-.9.7-2.1 1.1-3.4 1.1s-2.5-.4-3.4-1.1c.9-.8 2.1-1.3 3.4-1.3z"/></svg>`,
  },
  {
    id: 'githubactions',
    name: 'GitHub Actions',
    color: '#2088FF',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#2088FF"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 4h-2v6h6v-2h-4V6zm-6 8h2v2H7v-2zm10 0h2v2h-2v-2z"/></svg>`,
  },
  {
    id: 'git',
    name: 'Git',
    color: '#F05032',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#F05032"><path d="M2.525 12.836l9.64 9.64a1.868 1.868 0 0 0 2.64 0l9.638-9.64a1.868 1.868 0 0 0 0-2.64l-9.64-9.64a1.868 1.868 0 0 0-2.64 0l-9.64 9.64a1.868 1.868 0 0 0 0 2.64zm10.748-6.57a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zm-2.8 5.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zm0 5.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"/></svg>`,
  },
  {
    id: 'linux',
    name: 'Linux',
    color: '#FCC624',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#FCC624"><path d="M12.003 2c-2.4 0-4.3 1.9-4.3 4.3 0 .8.2 1.6.6 2.2-1.3 1.1-2.2 2.7-2.3 4.5-.4.4-.7.9-.7 1.5 0 1.1.9 2 2 2 .4 0 .8-.1 1.1-.3 1 1.8 2.9 3 5.1 3 2.2 0 4.1-1.2 5.1-3 .3.2.7.3 1.1.3 1.1 0 2-.9 2-2 0-.6-.3-1.1-.7-1.5-.1-1.8-1-3.4-2.3-4.5.4-.6.6-1.4.6-2.2 0-2.4-1.9-4.3-4.3-4.3zm-1.5 4.5a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm3 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm-1.5 2.5c.8 0 1.5.3 1.5.8 0 .4-.7.7-1.5.7s-1.5-.3-1.5-.7c0-.5.7-.8 1.5-.8z"/></svg>`,
  },
  {
    id: 'bash',
    name: 'Bash',
    color: '#4EAA25',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#4EAA25"><path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm4 4l5 4-5 4v-2.5L8.5 12 6 10.5V8zm7 7h5v2h-5v-2z"/></svg>`,
  },
  {
    id: 'nginx',
    name: 'Nginx',
    color: '#009639',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#009639"><path d="M12 2L2 7.74v8.52L12 22l10-5.74V7.74L12 2zm-4 6.8h2.32l3.68 5.68V8.8H16v6.4h-2.32L10 9.52V15.2H8V8.8z"/></svg>`,
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    color: '#E6522C',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#E6522C"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v.93zm5.9-3.24c-.28-.56-.86-.69-1.9-.69h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 1.44-.41 2.78-1.1 3.93z"/></svg>`,
  },
  {
    id: 'grafana',
    name: 'Grafana',
    color: '#F46800',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#F46800"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18a1 1 0 0 1-2 0v-1.07A6 6 0 0 1 6.07 12H5a1 1 0 0 1 0-2h1.07A6 6 0 0 1 11 4.93V4a1 1 0 0 1 2 0v.93A6 6 0 0 1 17.93 10H19a1 1 0 0 1 0 2h-1.07A6 6 0 0 1 13 16.93zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z"/></svg>`,
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    color: '#4B9FD5',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#4B9FD5"><path d="M3.7 18.2a10.5 10.5 0 0 1 0-12.4l1.6 1.3a8.5 8.5 0 0 0 0 9.8l-1.6 1.3zm3.8-3l1.6-1.3a4.5 4.5 0 0 1 0-3.8L7.5 8.8a6.5 6.5 0 0 0 0 6.4zm8 5.8a14 14 0 0 1-7.2-2l1.2-1.7a12 12 0 0 0 6 1.7c5.5 0 10-4.5 10-10s-4.5-10-10-10a12 12 0 0 0-6 1.7L8.3 3a14 14 0 0 1 7.2-2C22 1 27 6 27 12s-5 11-11.5 11z"/></svg>`,
  },
  {
    id: 'trivy',
    name: 'Trivy',
    color: '#1B88F0',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#1B88F0"><path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4 11H8v-1.5c0-1.67 3.33-2.5 4-2.5s4 .83 4 2.5V17z"/></svg>`,
  },
  {
    id: 'helm',
    name: 'Helm',
    color: '#0EA5E9',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#0EA5E9"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3.5a6.5 6.5 0 0 1 6.5 6.5c0 1.6-.6 3.1-1.6 4.2l-2.4-2.4c.4-.5.6-1.1.6-1.8a3.2 3.2 0 0 0-3.1-3.2V5.5zm-1.5 0v3.3a3.2 3.2 0 0 0-3.1 3.2c0 .7.2 1.3.6 1.8L5.6 16.2A6.5 6.5 0 0 1 5.5 12a6.5 6.5 0 0 1 5-6.5zm1.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3.2 4.7l2.4-2.4c.3.1.5.2.8.2s.5-.1.8-.2l2.4 2.4A6.4 6.4 0 0 1 12 18.5a6.4 6.4 0 0 1-3.2-2.8z"/></svg>`,
  },
];

export interface IconCloudProps {
  className?: string;
}

export const IconCloud: React.FC<IconCloudProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Track loaded images
  const [, setLoadedCount] = useState<number>(0);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Preload all SVGs as Image objects using Blob URLs (with data URI fallback)
  useEffect(() => {
    let active = true;
    const blobUrls: string[] = [];

    CLOUD_ICONS.forEach((icon) => {
      // Create clean Blob URL for high-speed local SVG decoding
      const blob = new Blob([icon.svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      blobUrls.push(url);

      const img = new Image();
      img.onload = () => {
        if (!active) return;
        imagesRef.current.set(icon.id, img);
        setLoadedCount((c) => c + 1);
      };
      img.onerror = () => {
        if (!active) return;
        // Fallback: encode as data URI if Blob URL fails
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          imagesRef.current.set(icon.id, fallbackImg);
          setLoadedCount((c) => c + 1);
        };
        fallbackImg.src = `data:image/svg+xml;utf8,${encodeURIComponent(icon.svg)}`;
      };
      img.src = url;
    });

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionChange = (e: MediaQueryListEvent) => {
        setIsPaused(e.matches);
      };
      mediaQuery.addEventListener('change', handleMotionChange);

      return () => {
        active = false;
        blobUrls.forEach((u) => URL.revokeObjectURL(u));
        mediaQuery.removeEventListener('change', handleMotionChange);
      };
    }

    return () => {
      active = false;
      blobUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  // Fibonacci sphere 3D distribution
  const points = useMemo(() => {
    const total = CLOUD_ICONS.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad

    return CLOUD_ICONS.map((icon, i) => {
      const y = 1 - (i / (total - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      return {
        icon,
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
      };
    });
  }, []);

  // Physics & rotation state
  const rotation = useRef<{ x: number; y: number }>({ x: 0.2, y: 0.1 });
  const velocity = useRef<{ x: number; y: number }>({ x: 0.0016, y: 0.003 });
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredPointIndex = useRef<number | null>(null);

  const handleResetOrientation = useCallback(() => {
    rotation.current = { x: 0.2, y: 0.1 };
    velocity.current = { x: 0.0016, y: 0.003 };
    setActiveIcon(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 380;
    let height = 380;

    const updateDimensions = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const side = Math.max(280, Math.min(rect.width, 420));
      width = side;
      height = side;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = side * dpr;
      canvas.height = side * dpr;
      canvas.style.width = `${side}px`;
      canvas.style.height = `${side}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // 3D Canvas Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Rotation updates
      if (!isDragging.current) {
        if (!isPaused) {
          rotation.current.x += velocity.current.x;
          rotation.current.y += velocity.current.y;
        }

        const targetVx = isPaused ? 0 : 0.0016;
        const targetVy = isPaused ? 0 : 0.003;
        velocity.current.x += (targetVx - velocity.current.x) * 0.04;
        velocity.current.y += (targetVy - velocity.current.y) * 0.04;
      }

      const sinX = Math.sin(rotation.current.x);
      const cosX = Math.cos(rotation.current.x);
      const sinY = Math.sin(rotation.current.y);
      const cosY = Math.cos(rotation.current.y);

      // Rotate and project points
      const projected = points.map((p, index) => {
        // Y-axis rotation
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // X-axis rotation
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Depth perspective (z2 in [-1, 1])
        const depth = (z2 + 1) / 2; // 0 (far) to 1 (near)
        const scale = 0.6 + 0.6 * depth;
        const alpha = Math.max(0.2, Math.min(1.0, 0.25 + 0.75 * depth));

        const px = centerX + x1 * radius;
        const py = centerY + y2 * radius;

        return {
          index,
          icon: p.icon,
          x: px,
          y: py,
          z: z2,
          depth,
          scale,
          alpha,
        };
      });

      // Painter's algorithm: sort by depth ascending (back to front)
      projected.sort((a, b) => a.z - b.z);

      // Render each technology icon
      projected.forEach((item) => {
        const isHovered = hoveredPointIndex.current === item.index;
        const img = imagesRef.current.get(item.icon.id);

        const badgeRadius = 23 * item.scale * (isHovered ? 1.25 : 1);
        const iconSize = 26 * item.scale * (isHovered ? 1.25 : 1);

        ctx.save();
        ctx.globalAlpha = isHovered ? 1.0 : item.alpha;

        // 1. Sleek circular glass badge backing
        ctx.beginPath();
        ctx.arc(item.x, item.y, badgeRadius, 0, Math.PI * 2);

        if (isHovered) {
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = item.icon.color;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = item.icon.color;
          ctx.shadowBlur = 16;
        } else if (item.z > 0) {
          // Foreground: crisp high-contrast pill
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.strokeStyle = 'rgba(232, 184, 156, 0.55)';
          ctx.lineWidth = 1.4;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
          ctx.shadowBlur = 6 * item.depth;
        } else {
          // Background: semi-transparent, smaller
          ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
          ctx.strokeStyle = 'rgba(232, 184, 156, 0.2)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.stroke();

        // 2. Draw official vector logo
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(
            img,
            item.x - iconSize / 2,
            item.y - iconSize / 2,
            iconSize,
            iconSize
          );
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Mouse & Touch interaction handlers
    const handlePointerDown = (clientX: number, clientY: number) => {
      isDragging.current = true;
      lastMousePos.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      if (isDragging.current) {
        const deltaX = clientX - lastMousePos.current.x;
        const deltaY = clientY - lastMousePos.current.y;

        velocity.current = {
          x: -deltaY * 0.003,
          y: deltaX * 0.003,
        };

        rotation.current.x += velocity.current.x;
        rotation.current.y += velocity.current.y;

        lastMousePos.current = { x: clientX, y: clientY };
      } else {
        // Detect hover near foreground icons
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.38;

        const sinX = Math.sin(rotation.current.x);
        const cosX = Math.cos(rotation.current.x);
        const sinY = Math.sin(rotation.current.y);
        const cosY = Math.cos(rotation.current.y);

        let closestIdx: number | null = null;
        let minDistance = 24;

        points.forEach((p, idx) => {
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.z * cosY + p.x * sinY;
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + p.y * sinX;

          if (z2 > 0) {
            const px = centerX + x1 * radius;
            const py = centerY + y2 * radius;
            const dist = Math.hypot(mouseX - px, mouseY - py);

            if (dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          }
        });

        hoveredPointIndex.current = closestIdx;
        if (closestIdx !== null) {
          setActiveIcon(points[closestIdx].icon.name);
          canvas.style.cursor = 'pointer';
        } else {
          setActiveIcon(null);
          canvas.style.cursor = isDragging.current ? 'grabbing' : 'grab';
        }
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      if (canvas) {
        canvas.style.cursor = 'grab';
      }
    };

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (isDragging.current) {
          e.preventDefault();
        }
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => handlePointerUp();

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);

      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [points, isPaused]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex items-center justify-center select-none w-full max-w-[420px] aspect-square mx-auto bg-transparent',
        className
      )}
    >
      {/* Subtle central depth radial glow on the section background */}
      <div
        className="absolute inset-4 rounded-full bg-[#E8B89C]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* 3D Sphere Canvas floating directly on background */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-grab bg-transparent"
        aria-label="Interactive 3D AWS & DevOps Icon Cloud"
      />

      {/* Floating minimal controls in bottom corner */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-10">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          title={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          className="p-2 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-md border border-white/10 text-[#E8B89C] hover:text-[#FFFFFF] transition-all shadow-sm cursor-pointer"
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={handleResetOrientation}
          title="Reset sphere orientation"
          aria-label="Reset sphere orientation"
          className="p-2 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-md border border-white/10 text-[#E8B89C] hover:text-[#FFFFFF] transition-all shadow-sm cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating active icon pill indicator on hover */}
      {activeIcon && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#FFFFFF] pointer-events-none shadow-sm transition-opacity duration-200">
          <span className="text-[#E8B89C] font-semibold">{activeIcon}</span>
        </div>
      )}
    </div>
  );
};
