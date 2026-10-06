'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TechIconDef {
  id: string;
  name: string;
  color: string;
  size: number;
  opacity: number;
  initialX: number; // percentage 0-100
  initialY: number; // percentage 0-100
  vx: number;       // speed & direction X (px/frame)
  vy: number;       // speed & direction Y (px/frame)
  rotSpeed: number; // rotation sway speed
  svg: React.ReactNode;
}

const TECH_ICONS: TechIconDef[] = [
  // 1. Docker
  {
    id: 'docker',
    name: 'Docker',
    color: '#2496ED',
    size: 40,
    opacity: 0.46,
    initialX: 82,
    initialY: 14,
    vx: -0.42,
    vy: 0.32,
    rotSpeed: 0.0018,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(36,150,237,0.35)]">
        <path d="M13.98 10.02h2.04V8.04H13.98v1.98zm-2.58 0h2.04V8.04H11.4v1.98zm-2.58 0h2.04V8.04H8.82v1.98zm-2.58 0h2.04V8.04H6.24v1.98zm7.74-2.52h2.04V5.52h-2.04v1.98zm-2.58 0h2.04V5.52H11.4v1.98zm-2.58 0h2.04V5.52H8.82v1.98zm5.16-2.52h2.04V3H13.98v1.98zm9.3 6.96c-.36-.24-.96-.36-1.5-.36-.42 0-.96.06-1.38.24-.36-.96-1.02-1.56-1.92-1.86-.48-.18-1.02-.18-1.5-.12-.12-.06-.3-.12-.48-.18H3.36c-.48 0-.9.36-.96.84C2.1 14.88 3.9 18.72 7.5 20.34c3.42 1.56 8.52 1.38 12.06-.9 2.58-1.68 3.96-4.56 3.72-7.02z" />
      </svg>
    ),
  },

  // 2. Kubernetes
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    color: '#326CE5',
    size: 40,
    opacity: 0.46,
    initialX: 12,
    initialY: 10,
    vx: 0.38,
    vy: 0.28,
    rotSpeed: 0.0015,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(50,108,229,0.35)]">
        <path d="M12 2L4 6.6v9.2L12 22l8-4.6V6.6L12 2zm0 2.3l5.8 3.3-2.3 4-4.6-.8-.8-4.6 1.9-1.9zm-1.9 1.9l.8 4.6-4.6.8-2.3-4 6.1-1.4zm-6.1 7.2l2.3-4 4.6.8v4.7l-4.6.8-2.3-2.3zm8 6.3l-5.8-3.3 2.3-4 4.6.8.8 4.6-1.9 1.9zm1.9-1.9l-.8-4.6 4.6-.8 2.3 4-6.1 1.4zm6.1-7.2l-2.3 4-4.6-.8v-4.7l4.6-.8 2.3 2.3z" />
      </svg>
    ),
  },

  // 3. Linux (Tux)
  {
    id: 'linux',
    name: 'Linux',
    color: '#FCC624',
    size: 38,
    opacity: 0.45,
    initialX: 8,
    initialY: 82,
    vx: 0.44,
    vy: -0.34,
    rotSpeed: 0.002,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(252,198,36,0.35)]">
        <path d="M12.003 2c-2.4 0-4.3 1.9-4.3 4.3 0 .8.2 1.6.6 2.2-1.3 1.1-2.2 2.7-2.3 4.5-.4.4-.7.9-.7 1.5 0 1.1.9 2 2 2 .4 0 .8-.1 1.1-.3 1 1.8 2.9 3 5.1 3 2.2 0 4.1-1.2 5.1-3 .3.2.7.3 1.1.3 1.1 0 2-.9 2-2 0-.6-.3-1.1-.7-1.5-.1-1.8-1-3.4-2.3-4.5.4-.6.6-1.4.6-2.2 0-2.4-1.9-4.3-4.3-4.3zm-1.5 4.5a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm3 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm-1.5 2.5c.8 0 1.5.3 1.5.8 0 .4-.7.7-1.5.7s-1.5-.3-1.5-.7c0-.5.7-.8 1.5-.8z" />
      </svg>
    ),
  },

  // 4. AWS
  {
    id: 'aws',
    name: 'AWS',
    color: '#FF9900',
    size: 42,
    opacity: 0.48,
    initialX: 50,
    initialY: 6,
    vx: -0.35,
    vy: 0.45,
    rotSpeed: 0.0016,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(255,153,0,0.35)]">
        <path d="M12.92 11.23a10.9 10.9 0 0 1-5.18 1.15c-2.3 0-3.92-.88-3.92-2.54 0-1.28.98-2.27 2.65-2.61a15.7 15.7 0 0 1 3.52-.3v-.37c0-1.12-.6-1.74-2.05-1.74-1.23 0-2.3.43-2.9 1l-.9-1.26c.9-.84 2.37-1.4 4.14-1.4 2.68 0 3.78 1.34 3.78 3.5v4.54c0 .8.06 1.48.16 2.03h-1.92c-.1-.32-.18-.76-.2-1.24v-.26zm-1.88-2.7c-.82.07-2.1.18-2.9.46-.86.3-1.3.8-1.3 1.46 0 .93.9 1.44 2.22 1.44.92 0 1.62-.2 2.1-.56v-2.8z" />
        <path d="M18.8 17.55c-2.64 1.95-6.52 2.97-9.84 2.97-4.66 0-8.85-1.72-12.02-4.59-.25-.23-.03-.54.27-.37 3.42 1.98 7.6 3.17 11.89 3.17 2.93 0 6.4-.66 9.38-2.03.45-.2.83.32.32.85z" />
        <path d="M19.98 16.27c-.34-.44-2.23-.21-3.08-.11-.26.03-.3-.19-.07-.35 1.5-1.07 3.96-.76 4.26-.39.3.38-.08 2.87-1.48 4.05-.22.18-.43.09-.33-.16.33-.8 1.04-2.6.7-3.04z" />
      </svg>
    ),
  },

  // 5. Helm
  {
    id: 'helm',
    name: 'Helm',
    color: '#0EA5E9',
    size: 38,
    opacity: 0.45,
    initialX: 42,
    initialY: 86,
    vx: -0.38,
    vy: -0.36,
    rotSpeed: 0.0022,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(14,165,233,0.35)]">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3.5a6.5 6.5 0 0 1 6.5 6.5c0 1.6-.6 3.1-1.6 4.2l-2.4-2.4c.4-.5.6-1.1.6-1.8a3.2 3.2 0 0 0-3.1-3.2V5.5zm-1.5 0v3.3a3.2 3.2 0 0 0-3.1 3.2c0 .7.2 1.3.6 1.8L5.6 16.2A6.5 6.5 0 0 1 5.5 12a6.5 6.5 0 0 1 5-6.5zm1.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3.2 4.7l2.4-2.4c.3.1.5.2.8.2s.5-.1.8-.2l2.4 2.4A6.4 6.4 0 0 1 12 18.5a6.4 6.4 0 0 1-3.2-2.8z" />
      </svg>
    ),
  },

  // 6. Load Balancer (AWS ELB / ALB)
  {
    id: 'loadbalancer',
    name: 'Load Balancer',
    color: '#FF9900',
    size: 40,
    opacity: 0.46,
    initialX: 92,
    initialY: 42,
    vx: -0.45,
    vy: -0.30,
    rotSpeed: 0.0017,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(255,153,0,0.35)]">
        <circle cx="12" cy="4" r="2.2" />
        <rect x="3.5" y="15" width="4" height="5" rx="1" />
        <rect x="10" y="15" width="4" height="5" rx="1" />
        <rect x="16.5" y="15" width="4" height="5" rx="1" />
        <path d="M11 6.5v3.2L5.8 13v2h1.5v-1.2l4.7-2.9 4.7 2.9V15h1.5v-2L13 9.7V6.5h-2z" />
        <path d="M11.25 9.7h1.5v5.3h-1.5z" />
      </svg>
    ),
  },

  // 7. Terraform
  {
    id: 'terraform',
    name: 'Terraform',
    color: '#844FBA',
    size: 38,
    opacity: 0.46,
    initialX: 68,
    initialY: 8,
    vx: 0.36,
    vy: 0.42,
    rotSpeed: 0.002,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(132,79,186,0.35)]">
        <path d="M1.44 0v7.575l6.554 3.79V3.79zM8.718 4.232v7.576L15.274 8V.424zM8.718 12.632v7.575l6.556-3.788V8.844zM16.002 4.232v7.576l6.558-3.79V.424zM1.44 8.465v7.575l6.554 3.79v-7.576z" />
      </svg>
    ),
  },

  // 8. Jenkins
  {
    id: 'jenkins',
    name: 'Jenkins',
    color: '#D24939',
    size: 38,
    opacity: 0.44,
    initialX: 94,
    initialY: 66,
    vx: -0.38,
    vy: 0.35,
    rotSpeed: 0.0019,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(210,73,57,0.35)]">
        <path d="M12 2a5 5 0 0 0-5 5c0 1.8.9 3.3 2.3 4.2-.4.8-.9 1.7-1.5 2.5C6.4 15.3 5 17.4 5 20h14c0-2.6-1.4-4.7-2.8-6.3-.6-.8-1.1-1.7-1.5-2.5 1.4-.9 2.3-2.4 2.3-4.2a5 5 0 0 0-5-5zm-2.5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-2.5 8c1.3 0 2.5.5 3.4 1.3-.9.7-2.1 1.1-3.4 1.1s-2.5-.4-3.4-1.1c.9-.8 2.1-1.3 3.4-1.3z" />
      </svg>
    ),
  },

  // 9. GitHub
  {
    id: 'github',
    name: 'GitHub',
    color: '#F8FAFC',
    size: 36,
    opacity: 0.40,
    initialX: 3,
    initialY: 46,
    vx: 0.42,
    vy: 0.32,
    rotSpeed: 0.0016,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(248,250,252,0.3)]">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },

  // 10. Prometheus
  {
    id: 'prometheus',
    name: 'Prometheus',
    color: '#E6522C',
    size: 38,
    opacity: 0.45,
    initialX: 74,
    initialY: 84,
    vx: -0.40,
    vy: -0.38,
    rotSpeed: 0.002,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(230,82,44,0.35)]">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v.93zm5.9-3.24c-.28-.56-.86-.69-1.9-.69h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 1.44-.41 2.78-1.1 3.93z" />
      </svg>
    ),
  },

  // 11. Grafana
  {
    id: 'grafana',
    name: 'Grafana',
    color: '#F46800',
    size: 36,
    opacity: 0.44,
    initialX: 88,
    initialY: 88,
    vx: 0.35,
    vy: -0.44,
    rotSpeed: 0.0024,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(244,104,0,0.35)]">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18a1 1 0 0 1-2 0v-1.07A6 6 0 0 1 6.07 12H5a1 1 0 0 1 0-2h1.07A6 6 0 0 1 11 4.93V4a1 1 0 0 1 2 0v.93A6 6 0 0 1 17.93 10H19a1 1 0 0 1 0 2h-1.07A6 6 0 0 1 13 16.93zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" />
      </svg>
    ),
  },

  // 12. EKS (AWS EKS)
  {
    id: 'eks',
    name: 'EKS',
    color: '#FF9900',
    size: 40,
    opacity: 0.46,
    initialX: 62,
    initialY: 72,
    vx: 0.38,
    vy: -0.34,
    rotSpeed: 0.0018,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_2px_12px_rgba(255,153,0,0.35)]">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.8 3.8v7.6L12 19.4 5.2 15.6V8L12 4.2zm-1 3.8v3H8v2h3v3h2v-3h3v-2h-3V8h-2z" />
      </svg>
    ),
  },
];

export interface FloatingTechIconsProps {
  className?: string;
}

export const FloatingTechIcons: React.FC<FloatingTechIconsProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize particle states in pixel coordinates
    const particles = TECH_ICONS.map((item) => ({
      x: (item.initialX / 100) * width,
      y: (item.initialY / 100) * height,
      vx: item.vx,
      vy: item.vy,
      size: item.size,
      rotSpeed: item.rotSpeed,
      rot: 0,
    }));

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      if (newWidth <= 0 || newHeight <= 0) return;

      // Rescale positions proportionally
      particles.forEach((p) => {
        p.x = (p.x / (width || 1)) * newWidth;
        p.y = (p.y / (height || 1)) * newHeight;
      });

      width = newWidth;
      height = newHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 16.666, 2.5); // normalized frame delta
      lastTime = currentTime;

      if (!prefersReducedMotion && width > 0 && height > 0) {
        particles.forEach((p, idx) => {
          // Update positions
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.rotSpeed * dt * 50;

          // Bounce gently when hitting boundaries
          const minX = 8;
          const maxX = Math.max(width - p.size - 8, minX);
          const minY = 8;
          const maxY = Math.max(height - p.size - 8, minY);

          if (p.x <= minX) {
            p.x = minX;
            p.vx = Math.abs(p.vx);
          } else if (p.x >= maxX) {
            p.x = maxX;
            p.vx = -Math.abs(p.vx);
          }

          if (p.y <= minY) {
            p.y = minY;
            p.vy = Math.abs(p.vy);
          } else if (p.y >= maxY) {
            p.y = maxY;
            p.vy = -Math.abs(p.vy);
          }

          // Apply hardware-accelerated transformation directly
          const el = iconElementsRef.current[idx];
          if (el) {
            const rotAngle = Math.sin(p.rot) * 8; // subtle ±8deg gentle sway
            el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${rotAngle.toFixed(2)}deg)`;
          }
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-[1]',
        className
      )}
      aria-hidden="true"
    >
      {TECH_ICONS.map((tech, idx) => (
        <div
          key={tech.id}
          ref={(el) => {
            iconElementsRef.current[idx] = el;
          }}
          style={{
            width: `${tech.size}px`,
            height: `${tech.size}px`,
            color: tech.color,
            opacity: tech.opacity,
            transform: `translate3d(${(tech.initialX / 100) * 1000}px, ${(tech.initialY / 100) * 600}px, 0)`,
          }}
          className="absolute top-0 left-0 transition-opacity duration-300 will-change-transform"
        >
          {tech.svg}
        </div>
      ))}
    </div>
  );
};
