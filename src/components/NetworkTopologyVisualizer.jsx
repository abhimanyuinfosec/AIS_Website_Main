import React, { useRef, useEffect, useCallback } from 'react';

/**
 * NetworkTopologyVisualizer
 * Static Enterprise Architecture Schematic.
 * Features:
 * - AIS Security Gateway at the core hub (with logo)
 * - 4 Satellite Security Modules: VAPT, Threat Detection, Web Security, Security Hardening
 * - Client Ingress & Protected Destination Server
 * - Completely static, clean, precise enterprise technical diagram (no continuous animations).
 */
const NetworkTopologyVisualizer = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const drawVisualizer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = Math.min(460, Math.max(320, width * 0.70));
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const isMobile = width < 520;
    const isTablet = width >= 520 && width < 840;

    const centerX = width * 0.50;
    const centerY = height * 0.48;

    const rx = isMobile ? width * 0.38 : isTablet ? width * 0.38 : width * 0.40;
    const ry = isMobile ? height * 0.36 : isTablet ? height * 0.36 : height * 0.38;

    // Node Definitions
    const nodes = [
      // Central AIS Security Gateway
      {
        id: 'gateway',
        label: 'AIS Security Gateway',
        tier: 'hub',
        icon: 'ais',
        x: centerX,
        y: centerY,
        r: isMobile ? 32 : isTablet ? 38 : 42,
        sub: 'Zero-Trust Defense Core',
      },
      // Client Ingress
      {
        id: 'client',
        label: isMobile ? 'Client' : 'Client Ingress',
        tier: 'endpoint',
        icon: 'client',
        x: centerX - rx * (isMobile ? 1 : 0.96),
        y: centerY,
        r: isMobile ? 18 : 22,
        sub: 'Encrypted Ingress',
      },
      // VAPT
      {
        id: 'vapt',
        label: 'VAPT',
        tier: 'sat',
        icon: 'vapt',
        x: centerX - rx * 0.50,
        y: centerY - ry * 0.84,
        r: isMobile ? 15 : 17,
      },
      // Threat Detection
      {
        id: 'threat',
        label: isMobile ? 'Threat AI' : 'Threat Detection',
        tier: 'sat',
        icon: 'threat',
        x: centerX + rx * 0.50,
        y: centerY - ry * 0.84,
        r: isMobile ? 15 : 17,
      },
      // Web Security
      {
        id: 'websec',
        label: 'Web Security',
        tier: 'sat',
        icon: 'websec',
        x: centerX - rx * 0.50,
        y: centerY + ry * 0.84,
        r: isMobile ? 15 : 17,
      },
      // Security Hardening
      {
        id: 'hardening',
        label: isMobile ? 'Hardening' : 'Sec Hardening',
        tier: 'sat',
        icon: 'hardening',
        x: centerX + rx * 0.50,
        y: centerY + ry * 0.84,
        r: isMobile ? 15 : 17,
      },
      // Protected Server
      {
        id: 'server',
        label: isMobile ? 'Server' : 'Protected Server',
        tier: 'endpoint',
        icon: 'server',
        x: centerX + rx * (isMobile ? 1 : 0.96),
        y: centerY,
        r: isMobile ? 18 : 22,
        sub: 'Hardened VPC',
      },
    ];

    const nodeMap = {};
    nodes.forEach((n) => (nodeMap[n.id] = n));

    // Links
    const links = [
      // Radial Spokes
      { from: nodeMap.client, to: nodeMap.gateway, primary: true },
      { from: nodeMap.vapt, to: nodeMap.gateway, primary: true },
      { from: nodeMap.threat, to: nodeMap.gateway, primary: true },
      { from: nodeMap.websec, to: nodeMap.gateway, primary: true },
      { from: nodeMap.hardening, to: nodeMap.gateway, primary: true },
      { from: nodeMap.gateway, to: nodeMap.server, primary: true },
      // Perimeter Mesh
      { from: nodeMap.client, to: nodeMap.vapt, ring: true },
      { from: nodeMap.client, to: nodeMap.websec, ring: true },
      { from: nodeMap.vapt, to: nodeMap.threat, ring: true },
      { from: nodeMap.websec, to: nodeMap.hardening, ring: true },
      { from: nodeMap.threat, to: nodeMap.server, ring: true },
      { from: nodeMap.hardening, to: nodeMap.server, ring: true },
    ];

    // 1. Subtle Static Technical Grid
    const gridSpacing = 40;
    ctx.save();
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Static Concentric Range Rings around Gateway
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, isMobile ? 65 : 85, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();

    const outerR = Math.min(width * 0.38, height * 0.38);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, outerR * 1.04, outerR * 0.88, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 8]);
    ctx.stroke();
    ctx.restore();

    // 3. Static Connection Lines
    links.forEach(({ from, to, primary, ring }) => {
      if (!from || !to) return;
      ctx.save();
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2 - (ring ? 6 : 0);

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      if (ring) {
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
      } else {
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = primary ? 'rgba(59, 130, 246, 0.35)' : 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = primary ? 1.5 : 1;
      }
      ctx.stroke();
      ctx.restore();
    });

    // 4. Render Nodes
    const aisLogoImg = new Image();
    aisLogoImg.src = '/logo.png';
    const drawNodes = () => {
      nodes.forEach((node) => {
        const { x, y, r, tier, icon, label } = node;

        ctx.save();

        if (tier === 'hub') {
          // Central Hub Outer Halo (Static)
          const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.0);
          glowGrad.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
          glowGrad.addColorStop(0.6, 'rgba(30, 58, 138, 0.08)');
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.beginPath();
          ctx.arc(x, y, r * 2.0, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          // Hexagonal Boundary
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (Math.PI / 3) * a - Math.PI / 6;
            const hx = x + Math.cos(angle) * (r + 2);
            const hy = y + Math.sin(angle) * (r + 2);
            if (a === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fillStyle = '#050b1a';
          ctx.fill();
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.65)';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Inner circular core
          ctx.beginPath();
          ctx.arc(x, y, r - 5, 0, Math.PI * 2);
          ctx.fillStyle = '#030712';
          ctx.fill();
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Center Logo
          if (aisLogoImg.complete && aisLogoImg.naturalWidth > 0) {
            const logoW = r * 1.4;
            const logoH = r * 0.7;
            ctx.drawImage(aisLogoImg, x - logoW / 2, y - logoH / 2 - 2, logoW, logoH);
          } else {
            ctx.fillStyle = '#ffffff';
            ctx.font = '700 13px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('AIS', x, y - 2);
          }

          // Hub Label
          const labelY = y + r + 15;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.font = '600 12px Inter, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(label, x, labelY);

        } else if (tier === 'endpoint') {
          // Ingress & Egress Endpoints
          ctx.beginPath();
          ctx.arc(x, y, r * 1.35, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(30, 58, 138, 0.12)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = '#060d20';
          ctx.fill();
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
          ctx.lineWidth = 1.3;
          ctx.stroke();

          if (icon === 'client') {
            // Client Screen Glyph
            ctx.fillStyle = '#cbd5e1';
            ctx.fillRect(x - 6, y - 4, 12, 7);
            ctx.fillStyle = '#1d4ed8';
            ctx.fillRect(x - 4, y - 2, 8, 4);
            ctx.fillStyle = '#64748b';
            ctx.fillRect(x - 7, y + 4, 14, 2);
          } else {
            // Server Rack Glyph
            const drawRack = (ry, h) => {
              ctx.fillStyle = '#081430';
              ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.roundRect(x - 8, ry, 16, h, 2);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = '#3b82f6';
              ctx.beginPath();
              ctx.arc(x + 4, ry + h / 2, 1.2, 0, Math.PI * 2);
              ctx.fill();
            };
            drawRack(y - 7, 4);
            drawRack(y - 1.5, 4);
            drawRack(y + 4, 4);
          }

          const labelY = y + r + 13;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.font = '500 11px Inter, sans-serif';
          ctx.fillStyle = '#e2e8f0';
          ctx.fillText(label, x, labelY);

        } else {
          // Satellite Security Nodes: VAPT, Threat, Web Sec, Hardening
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = '#060e24';
          ctx.fill();
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.55)';
          ctx.lineWidth = 1.3;
          ctx.stroke();

          if (icon === 'vapt') {
            // Crosshair icon
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(x, y, 5.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - 7, y);
            ctx.lineTo(x + 7, y);
            ctx.moveTo(x, y - 7);
            ctx.lineTo(x, y + 7);
            ctx.stroke();
          } else if (icon === 'threat') {
            // Threat radar diamond icon
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x, y - 6);
            ctx.lineTo(x + 6, y);
            ctx.lineTo(x, y + 6);
            ctx.lineTo(x - 6, y);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(x, y, 1.6, 0, Math.PI * 2);
            ctx.fill();
          } else if (icon === 'websec') {
            // Web shield / globe icon
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(x, y, 2.8, 6, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - 6, y);
            ctx.lineTo(x + 6, y);
            ctx.stroke();
          } else if (icon === 'hardening') {
            // Hardened Shield icon
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x, y - 5.5);
            ctx.lineTo(x + 4.5, y - 2.5);
            ctx.lineTo(x + 4.5, y + 1.5);
            ctx.lineTo(x, y + 5.5);
            ctx.lineTo(x - 4.5, y + 1.5);
            ctx.lineTo(x - 4.5, y - 2.5);
            ctx.closePath();
            ctx.stroke();
          }

          const isTop = y < centerY;
          const labelY = isTop ? y - r - 6 : y + r + 13;

          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.font = '500 11px Inter, sans-serif';
          ctx.fillStyle = '#e2e8f0';
          ctx.fillText(label, x, labelY);
        }

        ctx.restore();
      });
    };

    if (aisLogoImg.complete) {
      drawNodes();
    } else {
      aisLogoImg.onload = () => {
        drawNodes();
      };
      // Initial render in case image is cached or delayed
      drawNodes();
    }
  }, []);

  useEffect(() => {
    drawVisualizer();
    window.addEventListener('resize', drawVisualizer);
    return () => {
      window.removeEventListener('resize', drawVisualizer);
    };
  }, [drawVisualizer]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[580px] h-[340px] sm:h-[400px] lg:h-[440px] flex flex-col items-center justify-center select-none"
      data-purpose="hero-cybersecurity-star-topology"
    >
      {/* Subtle Static Atmosphere Accent */}
      <div className="absolute -inset-2 bg-blue-600/5 rounded-3xl blur-2xl pointer-events-none -z-10" />

      {/* Static Enterprise Architecture Badge (Top Right) */}
      <div className="absolute top-1 right-2 hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-[#050b1a]/90 border border-slate-800 text-[10px] text-slate-300 font-medium tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        <span>AIS ZERO-TRUST ARCHITECTURE</span>
      </div>

      {/* Static Canvas Diagram */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block rounded-xl cursor-default"
        aria-label="Star topology cybersecurity architecture schematic with AIS Security Gateway at center, connecting VAPT, Web Security, Threat Detection, Security Hardening, Client Ingress, and Protected Server"
      />

      {/* Bottom Architecture Flow Caption */}
      <div className="mt-1 flex items-center justify-center gap-2 px-3.5 py-1 rounded-md bg-[#050b1a]/80 border border-slate-800/80 text-[10px] text-slate-400 font-normal tracking-wide">
        <span className="text-blue-400 font-semibold">FLOW:</span>
        <span>CLIENT INGRESS → AIS GATEWAY [VAPT · WEB SEC · THREAT · HARDENING] → SECURE SERVER</span>
      </div>
    </div>
  );
};

export default NetworkTopologyVisualizer;
