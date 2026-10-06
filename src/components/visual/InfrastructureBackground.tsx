'use client';

import React, { useEffect, useRef } from 'react';

interface NodePoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isAccent?: boolean;
}

interface Connection {
  from: number;
  to: number;
  distance: number;
}

interface Packet {
  connectionIndex: number;
  fromNodeIndex: number;
  toNodeIndex: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export const InfrastructureBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse tracking
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || window.innerWidth < 768) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Generate node topology
    const nodes: NodePoint[] = [];
    const connections: Connection[] = [];
    let packets: Packet[] = [];
    let lastPacketTime = 0;
    const packetInterval = 4500; // ~4.5 to 5.5s

    const initNetwork = () => {
      nodes.length = 0;
      connections.length = 0;
      packets.length = 0;

      const isMobile = width < 768;
      const nodeCount = isMobile ? 14 : 26;

      // Seeded-style clean distributed node placements across canvas
      for (let i = 0; i < nodeCount; i++) {
        // Bias some nodes toward perimeter and right side so center-left text is clear
        const section = i % 4;
        let x = 0;
        let y = 0;

        if (section === 0) {
          // Top right quadrant
          x = width * (0.5 + Math.random() * 0.45);
          y = height * (0.1 + Math.random() * 0.4);
        } else if (section === 1) {
          // Bottom right quadrant
          x = width * (0.45 + Math.random() * 0.5);
          y = height * (0.5 + Math.random() * 0.45);
        } else if (section === 2) {
          // Top & bottom perimeter
          x = width * (0.05 + Math.random() * 0.9);
          y = Math.random() > 0.5 ? height * (0.05 + Math.random() * 0.2) : height * (0.8 + Math.random() * 0.15);
        } else {
          // General distribution
          x = width * (0.1 + Math.random() * 0.85);
          y = height * (0.15 + Math.random() * 0.7);
        }

        const isLimeAccent = i === 3 || i === 11;
        const isSlateLight = i % 3 === 0;

        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: isLimeAccent ? 3.5 : isSlateLight ? 2.5 : 2,
          color: isLimeAccent ? '#CCFF00' : isSlateLight ? '#475569' : '#19241C',
          isAccent: isLimeAccent,
        });
      }

      // Build connections between nearby nodes
      const maxDistance = isMobile ? width * 0.35 : Math.min(width * 0.28, 220);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connections.push({
              from: i,
              to: j,
              distance: dist,
            });
          }
        }
      }
    };

    initNetwork();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      initNetwork();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation timeline
    const startTime = performance.now();

    const spawnPacket = (currentTime: number) => {
      if (connections.length === 0 || prefersReducedMotion) return;
      if (currentTime - lastPacketTime > packetInterval) {
        lastPacketTime = currentTime + (Math.random() * 1500 - 750); // small variance

        const randomConnIdx = Math.floor(Math.random() * connections.length);
        const conn = connections[randomConnIdx];

        // Randomly choose travel direction (from -> to or to -> from)
        const reverse = Math.random() > 0.5;
        const fromIdx = reverse ? conn.to : conn.from;
        const toIdx = reverse ? conn.from : conn.to;

        // Occasional color variant: mostly lime, sometimes cyan, rarely green
        const colorRand = Math.random();
        const color = colorRand > 0.7 ? '#CCFF00' : colorRand > 0.3 ? '#38BDF8' : '#22C55E';

        packets.push({
          connectionIndex: randomConnIdx,
          fromNodeIndex: fromIdx,
          toNodeIndex: toIdx,
          progress: 0,
          speed: 0.007 + Math.random() * 0.005,
          color,
          size: 2.5,
        });
      }
    };

    const render = (currentTime: number) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = currentTime - startTime;

      // Staged entrance opacity calculations
      // Stage 1 (0-400ms): Grid (handled by CSS)
      // Stage 2 (400-1200ms): Nodes fade in
      const nodeAlphaProgress = prefersReducedMotion ? 1 : Math.min(1, Math.max(0, (elapsed - 200) / 900));
      // Stage 3 (800-1800ms): Connections fade in
      const lineAlphaProgress = prefersReducedMotion ? 1 : Math.min(1, Math.max(0, (elapsed - 600) / 1000));

      // Update node positions based on subtle mouse influence
      nodes.forEach((node) => {
        if (!prefersReducedMotion && mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInfluence = 140;

          if (dist < maxInfluence && dist > 0) {
            // Very subtle 2-5px push away from pointer
            const force = (1 - dist / maxInfluence) * 4.5;
            const targetX = node.baseX - (dx / dist) * force;
            const targetY = node.baseY - (dy / dist) * force;
            node.x += (targetX - node.x) * 0.08;
            node.y += (targetY - node.y) * 0.08;
          } else {
            // Ease back to base position
            node.x += (node.baseX - node.x) * 0.05;
            node.y += (node.baseY - node.y) * 0.05;
          }
        } else {
          node.x += (node.baseX - node.x) * 0.05;
          node.y += (node.baseY - node.y) * 0.05;
        }
      });

      // Draw connections
      if (lineAlphaProgress > 0) {
        connections.forEach((conn) => {
          const nodeA = nodes[conn.from];
          const nodeB = nodes[conn.to];
          if (!nodeA || !nodeB) return;

          const baseOpacity = 0.10 * lineAlphaProgress;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `rgba(51, 65, 85, ${baseOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // Draw packets traveling on connections (once settled)
      if (elapsed > 1800 && !prefersReducedMotion) {
        spawnPacket(currentTime);

        packets = packets.filter((packet) => {
          const fromNode = nodes[packet.fromNodeIndex];
          const toNode = nodes[packet.toNodeIndex];
          if (!fromNode || !toNode) return false;

          packet.progress += packet.speed;
          if (packet.progress >= 1) return false;

          const curX = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
          const curY = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

          // Packet glow and core
          const packetAlpha = Math.sin(packet.progress * Math.PI) * 0.55;

          ctx.beginPath();
          ctx.arc(curX, curY, packet.size, 0, Math.PI * 2);
          ctx.fillStyle = packet.color;
          ctx.globalAlpha = packetAlpha;
          ctx.shadowColor = packet.color;
          ctx.shadowBlur = 4;
          ctx.fill();

          // Reset shadow & globalAlpha
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;

          return true;
        });
      }

      // Draw nodes
      if (nodeAlphaProgress > 0) {
        nodes.forEach((node) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

          if (node.isAccent) {
            ctx.fillStyle = node.color;
            ctx.globalAlpha = 0.7 * nodeAlphaProgress;
            ctx.shadowColor = '#CCFF00';
            ctx.shadowBlur = 3;
          } else {
            ctx.fillStyle = node.color;
            ctx.globalAlpha = 0.4 * nodeAlphaProgress;
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Canvas Layer for Network Nodes and Packets */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
