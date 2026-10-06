'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, RotateCw } from 'lucide-react';

interface TagItem {
  text: string;
  category: 'core' | 'aws' | 'devops' | 'service' | 'tool';
  weight: number; // 1 (normal) to 3 (heavy)
}

const SKILL_TAGS: TagItem[] = [
  // Core Cloud & Container Platforms
  { text: 'AWS', category: 'core', weight: 3 },
  { text: 'Kubernetes', category: 'core', weight: 3 },
  { text: 'Terraform', category: 'core', weight: 3 },
  { text: 'Docker', category: 'core', weight: 3 },
  { text: 'CI/CD', category: 'core', weight: 3 },
  { text: 'Linux', category: 'core', weight: 2 },
  { text: 'EKS', category: 'core', weight: 2 },

  // AWS Specific Infrastructure
  { text: 'EC2', category: 'aws', weight: 2 },
  { text: 'VPC', category: 'aws', weight: 2 },
  { text: 'ECR', category: 'aws', weight: 1 },
  { text: 'IAM', category: 'aws', weight: 2 },
  { text: 'S3', category: 'aws', weight: 2 },
  { text: 'RDS', category: 'aws', weight: 1 },
  { text: 'CloudFront', category: 'aws', weight: 1 },
  { text: 'WAF', category: 'aws', weight: 1 },
  { text: 'KMS', category: 'aws', weight: 1 },
  { text: 'Secrets Manager', category: 'aws', weight: 1 },
  { text: 'CloudWatch', category: 'aws', weight: 2 },
  { text: 'ALB', category: 'aws', weight: 2 },
  { text: 'IRSA', category: 'aws', weight: 1 },

  // DevOps & Observability Tools
  { text: 'Helm', category: 'devops', weight: 2 },
  { text: 'Jenkins', category: 'devops', weight: 2 },
  { text: 'Git', category: 'devops', weight: 1 },
  { text: 'GitHub', category: 'devops', weight: 2 },
  { text: 'Docker Compose', category: 'devops', weight: 1 },
  { text: 'Prometheus', category: 'devops', weight: 2 },
  { text: 'Grafana', category: 'devops', weight: 2 },
  { text: 'SonarQube', category: 'devops', weight: 1 },
  { text: 'Trivy', category: 'devops', weight: 1 },
  { text: 'Maven', category: 'devops', weight: 1 },
  { text: 'Ubuntu', category: 'devops', weight: 1 },
  { text: 'Bash', category: 'devops', weight: 2 },
  { text: 'SSH', category: 'devops', weight: 1 },
  { text: 'Nginx', category: 'devops', weight: 1 },

  // Key Engineering Services & Capabilities
  { text: 'Infrastructure as Code', category: 'service', weight: 2 },
  { text: 'CI/CD Automation', category: 'service', weight: 2 },
  { text: 'Kubernetes Deployments', category: 'service', weight: 2 },
  { text: 'Containerization', category: 'service', weight: 1 },
  { text: 'Cloud Infrastructure Deployment', category: 'service', weight: 1 },
  { text: 'Monitoring & Troubleshooting', category: 'service', weight: 1 },
  { text: 'AWS Infrastructure Management', category: 'service', weight: 2 },
];

export interface TagCloud3DProps {
  className?: string;
}

export const TagCloud3D: React.FC<TagCloud3DProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Position points on a 3D Sphere using Golden Spiral (Fibonacci sphere)
  const spherePoints = useMemo(() => {
    const total = SKILL_TAGS.length;
    return SKILL_TAGS.map((tag, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      return {
        tag,
        baseX: Math.sin(phi) * Math.cos(theta),
        baseY: Math.sin(phi) * Math.sin(theta),
        baseZ: Math.cos(phi),
      };
    });
  }, []);

  // Persistent 3D angle and velocity state
  const rotationRef = useRef({
    angleX: 0.2,
    angleY: 0.3,
    vx: 0.0035, // base continuous rotation speed X
    vy: 0.0045, // base continuous rotation speed Y
    targetVx: 0.0035,
    targetVy: 0.0045,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    radius: 170,
  });

  const tagElementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const rot = rotationRef.current;

    const updateRadius = () => {
      if (!container) return;
      const w = container.offsetWidth;
      // Adjust sphere radius responsively: ~135px on mobile up to 185px on desktop
      rot.radius = Math.min(Math.max(w * 0.40, 130), 185);
    };

    updateRadius();
    window.addEventListener('resize', updateRadius, { passive: true });

    // Mouse movement handler for interactive drag & parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      if (rot.isDragging) {
        const deltaX = e.clientX - rot.lastMouseX;
        const deltaY = e.clientY - rot.lastMouseY;
        rot.angleY += deltaX * 0.008;
        rot.angleX -= deltaY * 0.008;
        rot.lastMouseX = e.clientX;
        rot.lastMouseY = e.clientY;
      } else {
        // Subtle mouse influence on speed
        rot.targetVy = (mouseX / (rect.width / 2)) * 0.012;
        rot.targetVx = (-mouseY / (rect.height / 2)) * 0.012;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      rot.isDragging = true;
      rot.lastMouseX = e.clientX;
      rot.lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      rot.isDragging = false;
    };

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && rot.isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - rot.lastMouseX;
        const deltaY = touch.clientY - rot.lastMouseY;
        rot.angleY += deltaX * 0.01;
        rot.angleX -= deltaY * 0.01;
        rot.lastMouseX = touch.clientX;
        rot.lastMouseY = touch.clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        rot.isDragging = true;
        rot.lastMouseX = e.touches[0].clientX;
        rot.lastMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      rot.isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Smooth 60fps render loop
    const focalLength = 320;

    const render = () => {
      if (!rot.isDragging) {
        // Ease towards target velocity
        rot.vx += (rot.targetVx - rot.vx) * 0.05;
        rot.vy += (rot.targetVy - rot.vy) * 0.05;

        // Apply minimum auto-spin if mouse is stationary
        const minSpeedX = 0.0025;
        const minSpeedY = 0.0035;
        const currentVx = Math.abs(rot.vx) < minSpeedX ? (rot.vx >= 0 ? minSpeedX : -minSpeedX) : rot.vx;
        const currentVy = Math.abs(rot.vy) < minSpeedY ? (rot.vy >= 0 ? minSpeedY : -minSpeedY) : rot.vy;

        rot.angleX += currentVx;
        rot.angleY += currentVy;
      }

      const sinX = Math.sin(rot.angleX);
      const cosX = Math.cos(rot.angleX);
      const sinY = Math.sin(rot.angleY);
      const cosY = Math.cos(rot.angleY);

      const R = rot.radius;

      spherePoints.forEach((point, idx) => {
        const el = tagElementsRef.current[idx];
        if (!el) return;

        // 3D coordinates on the sphere
        const px = point.baseX * R;
        const py = point.baseY * R;
        const pz = point.baseZ * R;

        // Rotate around X-axis
        const y1 = py * cosX - pz * sinX;
        const z1 = py * sinX + pz * cosX;

        // Rotate around Y-axis
        const x2 = px * cosY + z1 * sinY;
        const z2 = -px * sinY + z1 * cosY;

        // 3D to 2D perspective projection
        const scale = focalLength / (focalLength + z2);
        const screenX = x2 * scale;
        const screenY = y1 * scale;

        // Calculate depth opacity & zIndex
        // Normalizes z (-R to +R) to 0.22 -> 0.95
        const depthRatio = (z2 + R) / (2 * R);
        const isHovered = hoveredTag === point.tag.text;
        const baseOpacity = 0.25 + depthRatio * 0.70;
        const opacity = isHovered ? 1.0 : baseOpacity;
        const zIndex = Math.round((z2 + R) * 10);
        const finalScale = isHovered ? scale * 1.25 : scale;

        el.style.transform = `translate3d(${screenX.toFixed(1)}px, ${screenY.toFixed(1)}px, 0) scale(${finalScale.toFixed(3)})`;
        el.style.opacity = `${opacity.toFixed(2)}`;
        el.style.zIndex = `${zIndex}`;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateRadius);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [spherePoints, hoveredTag]);

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0E1410]/90 via-[#060907]/95 to-[#0A0F0C]/90 border border-[#19241C] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-sm overflow-hidden select-none w-full max-w-[460px] mx-auto',
        className
      )}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[#CCFF00]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-[#38BDF8]/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header Tag Cloud Badge */}
      <div className="relative z-20 flex items-center justify-between w-full px-2 pb-2 border-b border-[#19241C] text-xs font-mono">
        <div className="flex items-center gap-1.5 text-[#CCFF00]">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-[11px]">INTERACTIVE SKILLS SPHERE</span>
        </div>
        <div className="flex items-center gap-1 text-[#667A6B] text-[10px]">
          <RotateCw className="h-3 w-3 animate-spin text-[#A3E635]" style={{ animationDuration: '8s' }} />
          <span>DRAG TO ROTATE</span>
        </div>
      </div>

      {/* 3D Sphere Interactive Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {/* Faint Orbital Center Reference Rings */}
        <div className="absolute w-[220px] h-[220px] rounded-full border border-[#19241C] pointer-events-none animate-pulse" />
        <div className="absolute w-[140px] h-[140px] rounded-full border border-dashed border-[#CCFF00]/15 pointer-events-none" />

        {/* 3D Rendered Skill Tags */}
        {spherePoints.map((item, idx) => {
          const isCore = item.tag.category === 'core';
          const isAws = item.tag.category === 'aws';
          const isService = item.tag.category === 'service';
          const isDevOps = item.tag.category === 'devops';

          // Tailored font size & style by weight
          const fontSizeClass =
            item.tag.weight === 3
              ? 'text-sm sm:text-base font-extrabold tracking-tight'
              : item.tag.weight === 2
              ? 'text-xs sm:text-sm font-semibold'
              : 'text-[11px] sm:text-xs font-medium';

          const colorClass = isCore
            ? 'text-[#CCFF00]'
            : isAws
            ? 'text-[#A3E635]'
            : isDevOps
            ? 'text-[#38BDF8]'
            : isService
            ? 'text-[#F4F9F5]'
            : 'text-[#94A899]';

          return (
            <span
              key={`${item.tag.text}-${idx}`}
              ref={(el) => {
                tagElementsRef.current[idx] = el;
              }}
              onMouseEnter={() => setHoveredTag(item.tag.text)}
              onMouseLeave={() => setHoveredTag(null)}
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap cursor-pointer transition-colors duration-150 will-change-transform font-mono py-0.5 px-1.5 rounded',
                fontSizeClass,
                colorClass,
                hoveredTag === item.tag.text &&
                  'text-[#CCFF00] bg-[#CCFF00]/15 ring-1 ring-[#CCFF00]/40 drop-shadow-[0_0_12px_rgba(204,255,0,0.8)] font-bold'
              )}
            >
              {item.tag.text}
            </span>
          );
        })}
      </div>

      {/* Footer Info / Selected Tag Indicator */}
      <div className="relative z-20 w-full pt-2 border-t border-[#19241C] flex items-center justify-between text-[11px] font-mono text-[#94A899]">
        <div className="flex items-center gap-1.5 truncate">
          <span className="text-[#667A6B]">Active Node:</span>
          <span className="text-[#F4F9F5] font-semibold truncate">
            {hoveredTag ? hoveredTag : 'AWS DevOps Tech Stack'}
          </span>
        </div>
        <span className="text-[10px] text-[#CCFF00] shrink-0 font-medium">35+ Skills</span>
      </div>
    </div>
  );
};
