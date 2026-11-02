'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, RotateCw, Pause, Play, Compass } from 'lucide-react';

interface TagItem {
  text: string;
  category: 'core' | 'aws' | 'devops' | 'k8s' | 'tool';
  weight: number; // 1 (normal) to 3 (prominent)
}

const SKILL_TAGS: TagItem[] = [
  // Core Platform & Cloud
  { text: 'AWS', category: 'core', weight: 3 },
  { text: 'Kubernetes', category: 'core', weight: 3 },
  { text: 'Terraform', category: 'core', weight: 3 },
  { text: 'Docker', category: 'core', weight: 3 },
  { text: 'CI/CD', category: 'core', weight: 3 },
  { text: 'Amazon EKS', category: 'core', weight: 3 },
  { text: 'Linux / Bash', category: 'core', weight: 2 },

  // AWS Infrastructure Services
  { text: 'EC2', category: 'aws', weight: 2 },
  { text: 'VPC & Subnets', category: 'aws', weight: 2 },
  { text: 'IAM Policies', category: 'aws', weight: 2 },
  { text: 'S3 Buckets', category: 'aws', weight: 2 },
  { text: 'RDS', category: 'aws', weight: 1 },
  { text: 'CloudFront', category: 'aws', weight: 1 },
  { text: 'AWS WAF', category: 'aws', weight: 1 },
  { text: 'AWS KMS', category: 'aws', weight: 1 },
  { text: 'Secrets Manager', category: 'aws', weight: 1 },
  { text: 'CloudWatch', category: 'aws', weight: 2 },
  { text: 'ALB / NLB', category: 'aws', weight: 2 },
  { text: 'Amazon ECR', category: 'aws', weight: 2 },
  { text: 'IRSA', category: 'aws', weight: 1 },

  // Kubernetes & Container Orchestration
  { text: 'Helm Charts', category: 'k8s', weight: 2 },
  { text: 'Ingress Nginx', category: 'k8s', weight: 2 },
  { text: 'HPA Autoscaling', category: 'k8s', weight: 1 },
  { text: 'K8s RBAC', category: 'k8s', weight: 2 },
  { text: 'Docker Compose', category: 'k8s', weight: 1 },
  { text: 'Container Security', category: 'k8s', weight: 1 },

  // CI/CD, Observability & Security Tools
  { text: 'Jenkins', category: 'devops', weight: 2 },
  { text: 'GitHub Actions', category: 'devops', weight: 2 },
  { text: 'Prometheus', category: 'devops', weight: 2 },
  { text: 'Grafana', category: 'devops', weight: 2 },
  { text: 'SonarQube', category: 'tool', weight: 1 },
  { text: 'Trivy Scanning', category: 'tool', weight: 1 },
  { text: 'Maven', category: 'tool', weight: 1 },
  { text: 'Git & GitOps', category: 'tool', weight: 2 },
  { text: 'Terraform Modules', category: 'devops', weight: 2 },
  { text: 'State Locking', category: 'devops', weight: 1 },
];

function drawRoundedBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

export interface TagCloud3DProps {
  className?: string;
}

export const TagCloud3D: React.FC<TagCloud3DProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('AWS DevOps Tech Stack');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Position 3D points on a sphere using Fibonacci distribution
  const points = useMemo(() => {
    const total = SKILL_TAGS.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad

    return SKILL_TAGS.map((tag, i) => {
      const y = 1 - (i / (total - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        tag,
        baseX: x,
        baseY: y,
        baseZ: z,
      };
    });
  }, []);

  const stateRef = useRef({
    angleX: 0.15,
    angleY: 0.25,
    vx: 0.0028,
    vy: 0.0036,
    targetVx: 0.0028,
    targetVy: 0.0036,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    mouseX: 0,
    mouseY: 0,
    isHoveringContainer: false,
    hoveredTagName: null as string | null,
    isPaused: false,
  });

  useEffect(() => {
    stateRef.current.isPaused = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const state = stateRef.current;

    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth || container.offsetWidth || 380;
      const height = container.clientHeight || container.offsetHeight || 380;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const onMouseDown = (e: MouseEvent) => {
      state.isDragging = true;
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      state.mouseX = relX;
      state.mouseY = relY;
      state.isHoveringContainer = true;

      if (state.isDragging) {
        const deltaX = e.clientX - state.lastMouseX;
        const deltaY = e.clientY - state.lastMouseY;

        state.angleY += deltaX * 0.007;
        state.angleX -= deltaY * 0.007;

        state.vx = -deltaY * 0.0004;
        state.vy = deltaX * 0.0004;

        state.lastMouseX = e.clientX;
        state.lastMouseY = e.clientY;
      } else {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        state.targetVy = ((relX - centerX) / (centerX || 1)) * 0.008;
        state.targetVx = -((relY - centerY) / (centerY || 1)) * 0.008;
      }
    };

    const onMouseUp = () => {
      state.isDragging = false;
    };

    const onMouseLeave = () => {
      state.isDragging = false;
      state.isHoveringContainer = false;
      state.hoveredTagName = null;
      setActiveCategory('AWS DevOps Tech Stack');
      state.targetVx = 0.0028;
      state.targetVy = 0.0036;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        state.isDragging = true;
        state.lastMouseX = e.touches[0].clientX;
        state.lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && state.isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - state.lastMouseX;
        const deltaY = touch.clientY - state.lastMouseY;

        state.angleY += deltaX * 0.009;
        state.angleX -= deltaY * 0.009;

        state.vx = -deltaY * 0.0005;
        state.vy = deltaX * 0.0005;

        state.lastMouseX = touch.clientX;
        state.lastMouseY = touch.clientY;
      }
    };

    const onTouchEnd = () => {
      state.isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const render = () => {
      const width = container.clientWidth || container.offsetWidth || 380;
      const height = container.clientHeight || container.offsetHeight || 380;
      const centerX = width / 2;
      const centerY = height / 2;

      const radius = Math.min(width * 0.42, 175);
      const focalLength = 340;

      if (!state.isDragging && !state.isPaused) {
        state.vx += (state.targetVx - state.vx) * 0.04;
        state.vy += (state.targetVy - state.vy) * 0.04;

        const baseSpeed = 0.0025;
        const finalVx = Math.abs(state.vx) < baseSpeed ? (state.vx >= 0 ? baseSpeed : -baseSpeed) : state.vx;
        const finalVy = Math.abs(state.vy) < baseSpeed ? (state.vy >= 0 ? baseSpeed : -baseSpeed) : state.vy;

        state.angleX += finalVx;
        state.angleY += finalVy;
      }

      ctx.clearRect(0, 0, width, height);

      const sinX = Math.sin(state.angleX);
      const cosX = Math.cos(state.angleX);
      const sinY = Math.sin(state.angleY);
      const cosY = Math.cos(state.angleY);

      // Background ambient holographic rings & center glow in template emerald
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.95, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(23, 38, 29, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.55, 0, Math.PI * 2);
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = 'rgba(0, 220, 130, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      interface ProjectedTag {
        tag: TagItem;
        screenX: number;
        screenY: number;
        scale: number;
        alpha: number;
        z: number;
        fontSize: number;
      }

      const projected: ProjectedTag[] = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        const px = pt.baseX * radius;
        const py = pt.baseY * radius;
        const pz = pt.baseZ * radius;

        const y1 = py * cosX - pz * sinX;
        const z1 = py * sinX + pz * cosX;

        const x2 = px * cosY + z1 * sinY;
        const z2 = -px * sinY + z1 * cosY;

        const scale = focalLength / (focalLength + z2);
        const screenX = centerX + x2 * scale;
        const screenY = centerY + y1 * scale;

        const depth = (z2 + radius) / (2 * radius);
        const alpha = Math.max(0.18, Math.min(1.0, 0.22 + depth * 0.78));

        const baseSize = pt.tag.weight === 3 ? 15 : pt.tag.weight === 2 ? 13 : 11;
        const fontSize = Math.max(9, baseSize * scale);

        projected.push({
          tag: pt.tag,
          screenX,
          screenY,
          scale,
          alpha,
          z: z2,
          fontSize,
        });
      }

      projected.sort((a, b) => a.z - b.z);

      let currentlyHovered: ProjectedTag | null = null;
      if (state.isHoveringContainer) {
        for (let i = projected.length - 1; i >= 0; i--) {
          const item = projected[i];
          if (item.z < -radius * 0.6) continue;

          ctx.font = `600 ${item.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
          const textWidth = ctx.measureText(item.tag.text).width;
          const padX = 8 * item.scale;
          const padY = 5 * item.scale;
          const boxW = textWidth + padX * 2;
          const boxH = item.fontSize + padY * 2;
          const boxLeft = item.screenX - boxW / 2;
          const boxTop = item.screenY - boxH / 2;

          if (
            state.mouseX >= boxLeft &&
            state.mouseX <= boxLeft + boxW &&
            state.mouseY >= boxTop &&
            state.mouseY <= boxTop + boxH
          ) {
            currentlyHovered = item;
            break;
          }
        }
      }

      const newHoveredName = currentlyHovered ? currentlyHovered.tag.text : null;
      if (newHoveredName !== state.hoveredTagName) {
        state.hoveredTagName = newHoveredName;
        if (currentlyHovered) {
          const catLabel =
            currentlyHovered.tag.category === 'core'
              ? 'Core Cloud Architecture'
              : currentlyHovered.tag.category === 'aws'
              ? 'AWS Cloud Services'
              : currentlyHovered.tag.category === 'k8s'
              ? 'Kubernetes & Containers'
              : currentlyHovered.tag.category === 'devops'
              ? 'CI/CD & Observability'
              : 'Security & Engineering Tools';
          setActiveCategory(`${currentlyHovered.tag.text} • ${catLabel}`);
        } else {
          setActiveCategory('AWS DevOps Tech Stack');
        }
      }

      canvas.style.cursor = currentlyHovered ? 'pointer' : state.isDragging ? 'grabbing' : 'grab';

      for (let i = 0; i < projected.length; i++) {
        const item = projected[i];
        const isThisHovered = currentlyHovered?.tag.text === item.tag.text;

        ctx.save();
        ctx.font = `${item.tag.weight === 3 || isThisHovered ? 'bold' : '600'} ${
          isThisHovered ? item.fontSize * 1.15 : item.fontSize
        }px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textMetrics = ctx.measureText(item.tag.text);
        const textW = textMetrics.width;
        const textH = item.fontSize;
        const padX = isThisHovered ? 10 : 6;
        const padY = isThisHovered ? 6 : 3;

        // Hover pill backdrop in template emerald green
        if (isThisHovered) {
          const r = 5;
          const bx = item.screenX - textW / 2 - padX;
          const by = item.screenY - textH / 2 - padY;
          const bw = textW + padX * 2;
          const bh = textH + padY * 2;
          
          drawRoundedBox(ctx, bx, by, bw, bh, r);
          ctx.fillStyle = 'rgba(0, 220, 130, 0.22)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 220, 130, 0.85)';
          ctx.lineWidth = 1.2;
          ctx.shadowColor = '#00DC82';
          ctx.shadowBlur = 10;
          ctx.stroke();
        }

        // Color assignment based on category and depth in Codespot template palette
        let textColor = '#9CA3AF';
        if (isThisHovered) {
          textColor = '#00DC82';
        } else if (item.tag.category === 'core') {
          textColor = item.z > 0 ? '#00DC82' : '#059669';
        } else if (item.tag.category === 'aws') {
          textColor = item.z > 0 ? '#34D399' : '#10B981';
        } else if (item.tag.category === 'k8s') {
          textColor = item.z > 0 ? '#6EE7B7' : '#059669';
        } else if (item.tag.category === 'devops') {
          textColor = item.z > 0 ? '#00DC82' : '#047857';
        } else {
          textColor = item.z > 0 ? '#FFFFFF' : '#9CA3AF';
        }

        ctx.fillStyle = textColor;
        ctx.globalAlpha = isThisHovered ? 1.0 : item.alpha;

        if (item.tag.weight === 3 && item.z > 0) {
          ctx.shadowColor = textColor;
          ctx.shadowBlur = isThisHovered ? 12 : 4;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(item.tag.text, item.screenX, item.screenY);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [points]);

  const handleResetOrientation = useCallback(() => {
    const state = stateRef.current;
    state.angleX = 0.15;
    state.angleY = 0.25;
    state.vx = 0.0028;
    state.vy = 0.0036;
    state.targetVx = 0.0028;
    state.targetVy = 0.0036;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0D1410]/95 via-[#080D0A]/95 to-[#050806]/95 border border-[#17261D] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-sm select-none w-full max-w-[460px] min-h-[460px] mx-auto overflow-hidden',
        className
      )}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[#00DC82]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#34D399]/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header Bar */}
      <div className="relative z-20 flex items-center justify-between w-full pb-2.5 border-b border-[#17261D] text-xs font-mono">
        <div className="flex items-center gap-1.5 text-[#00DC82]">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#00DC82]" />
          <span className="font-bold tracking-wider uppercase text-[11px] text-[#00DC82]">INTERACTIVE SKILLS SPHERE</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? 'Resume auto-spin' : 'Pause auto-spin'}
            className="p-1 rounded bg-[#0D1410] border border-[#17261D] text-[#9CA3AF] hover:text-[#00DC82] hover:border-[#00DC82]/50 transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>

          <button
            type="button"
            onClick={handleResetOrientation}
            title="Reset sphere orientation"
            className="p-1 rounded bg-[#0D1410] border border-[#17261D] text-[#9CA3AF] hover:text-[#00DC82] hover:border-[#00DC82]/50 transition-colors cursor-pointer"
          >
            <Compass className="h-3 w-3" />
          </button>

          <div className="flex items-center gap-1 text-[#64748B] text-[10px] pl-1">
            <RotateCw
              className={cn('h-3 w-3 text-[#00DC82]', !isPaused && 'animate-spin')}
              style={{ animationDuration: '9s' }}
            />
            <span className="hidden sm:inline">DRAG TO ROTATE</span>
          </div>
        </div>
      </div>

      {/* 3D Sphere Canvas Interactive Surface */}
      <div className="relative w-full h-[340px] sm:h-[370px] flex items-center justify-center my-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none"
          aria-label="3D Interactive Tag Cloud representing AWS and DevOps Skills"
        />
      </div>

      {/* Footer Info / Selected Tag Indicator */}
      <div className="relative z-20 w-full pt-2.5 border-t border-[#17261D] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
        <div className="flex items-center gap-1.5 min-w-0 pr-2">
          <span className="text-[#64748B] shrink-0">Active Node:</span>
          <span className="text-[#FFFFFF] font-semibold truncate">
            {activeCategory}
          </span>
        </div>
        <span className="text-[10px] text-[#00DC82] font-semibold shrink-0 bg-[#00DC82]/15 px-2 py-0.5 rounded border border-[#00DC82]/30">
          {SKILL_TAGS.length}+ Skills
        </span>
      </div>
    </div>
  );
};
