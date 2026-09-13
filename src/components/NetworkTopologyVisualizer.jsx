import React, { useRef, useEffect } from 'react';

/**
 * NetworkTopologyVisualizer
 * Star Topology Security Mesh animation with AIS Security Gateway at the core.
 * Features requested security nodes:
 * 1. VAPT (Vulnerability Assessment & Penetration Testing)
 * 2. Web Security
 * 3. Threat Detection
 * 4. Security Hardening
 * plus Client Ingress & Protected Destination Server in a radiant star-cluster topology.
 */
const NetworkTopologyVisualizer = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Honor prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Star topology layout: Center = AIS Gateway, Satellite rays = Security modules + Client + Server
    const getNodeDefinitions = (w, h) => {
      const isMobile = w < 520;
      const isTablet = w >= 520 && w < 840;

      const centerX = w * 0.50;
      const centerY = h * 0.48;

      if (isMobile) {
        // Streamlined star configuration on mobile with high legibility
        const rx = w * 0.38;
        const ry = h * 0.36;

        return [
          // Core Hub
          {
            id: 'gateway',
            label: 'AIS Gateway',
            tier: 'hub',
            icon: 'ais',
            x: centerX,
            y: centerY,
            r: 32,
            sub: 'Central Hub',
          },
          // Left Endpoint
          {
            id: 'client',
            label: 'Client Ingress',
            tier: 'secondary',
            icon: 'client',
            x: centerX - rx,
            y: centerY,
            r: 19,
          },
          // Top-Left Security node
          {
            id: 'vapt',
            label: 'VAPT',
            tier: 'sat',
            icon: 'vapt',
            x: centerX - rx * 0.58,
            y: centerY - ry * 0.88,
            r: 15,
          },
          // Top-Right Security node
          {
            id: 'threat',
            label: 'Threat Detection',
            tier: 'sat',
            icon: 'threat',
            x: centerX + rx * 0.58,
            y: centerY - ry * 0.88,
            r: 15,
          },
          // Bottom-Left Security node
          {
            id: 'websec',
            label: 'Web Security',
            tier: 'sat',
            icon: 'websec',
            x: centerX - rx * 0.58,
            y: centerY + ry * 0.88,
            r: 15,
          },
          // Bottom-Right Security node
          {
            id: 'hardening',
            label: 'Sec Hardening',
            tier: 'sat',
            icon: 'hardening',
            x: centerX + rx * 0.58,
            y: centerY + ry * 0.88,
            r: 15,
          },
          // Right Destination Endpoint
          {
            id: 'server',
            label: 'Protected Server',
            tier: 'secondary',
            icon: 'server',
            x: centerX + rx,
            y: centerY,
            r: 19,
          },
        ];
      }

      // Desktop & Tablet Star Topology Layout
      const rx = isTablet ? w * 0.38 : w * 0.40;
      const ry = isTablet ? h * 0.36 : h * 0.38;

      return [
        // ==========================================
        // 1. CENTRAL AIS SECURITY GATEWAY (STAR HUB)
        // ==========================================
        {
          id: 'gateway',
          label: 'AIS Security Gateway',
          tier: 'hub',
          icon: 'ais',
          x: centerX,
          y: centerY,
          r: isTablet ? 38 : 42,
          sub: 'Zero-Trust Defense Core',
        },

        // ==========================================
        // 2. CLIENT INGRESS (WEST ORBIT)
        // ==========================================
        {
          id: 'client',
          label: 'User Client',
          tier: 'secondary',
          icon: 'client',
          x: centerX - rx * 0.96,
          y: centerY,
          r: 22,
          sub: 'Encrypted Ingress',
        },

        // ==========================================
        // 3. VAPT (NORTH-WEST STAR NODE)
        // Vulnerability Assessment & Penetration Testing
        // ==========================================
        {
          id: 'vapt',
          label: 'VAPT',
          subLabel: 'Pen-Test & Audit',
          tier: 'sat',
          icon: 'vapt',
          x: centerX - rx * 0.48,
          y: centerY - ry * 0.84,
          r: 17,
        },

        // ==========================================
        // 4. THREAT DETECTION (NORTH-EAST STAR NODE)
        // Machine Intelligence & Anomaly Scanner
        // ==========================================
        {
          id: 'threat',
          label: 'Threat Detection',
          subLabel: 'AI Anomaly Scanner',
          tier: 'sat',
          icon: 'threat',
          x: centerX + rx * 0.48,
          y: centerY - ry * 0.84,
          r: 17,
        },

        // ==========================================
        // 5. WEB SECURITY (SOUTH-WEST STAR NODE)
        // WAF, TLS 1.3 & API Gateway Protection
        // ==========================================
        {
          id: 'websec',
          label: 'Web Security',
          subLabel: 'WAF & DDoS Shield',
          tier: 'sat',
          icon: 'websec',
          x: centerX - rx * 0.48,
          y: centerY + ry * 0.84,
          r: 17,
        },

        // ==========================================
        // 6. SECURITY HARDENING (SOUTH-EAST STAR NODE)
        // Zero-Trust Policies & Kernel Hardening
        // ==========================================
        {
          id: 'hardening',
          label: 'Security Hardening',
          subLabel: 'Policy Enforcement',
          tier: 'sat',
          icon: 'hardening',
          x: centerX + rx * 0.48,
          y: centerY + ry * 0.84,
          r: 17,
        },

        // ==========================================
        // 7. PROTECTED DESTINATION SERVER (EAST ORBIT)
        // ==========================================
        {
          id: 'server',
          label: 'Protected Server',
          tier: 'secondary',
          icon: 'server',
          x: centerX + rx * 0.96,
          y: centerY,
          r: 22,
          sub: 'Hardened VPC Core',
        },
      ];
    };

    // Star Topology Connections: All star nodes link directly to the central AIS Hub
    // Plus circumferential orbital links connecting perimeter nodes
    const getConnections = (nodes) => {
      const nodeMap = {};
      nodes.forEach((n) => (nodeMap[n.id] = n));

      const links = [];
      const addLink = (fromId, toId, type = 'star-spoke', primary = false) => {
        if (nodeMap[fromId] && nodeMap[toId]) {
          links.push({
            from: nodeMap[fromId],
            to: nodeMap[toId],
            type, // 'star-spoke' (radial to center) or 'orbit-ring' (outer perimeter)
            primary,
          });
        }
      };

      // 1. Radial Star Spokes (Direct links connecting every node to central AIS Hub)
      addLink('client', 'gateway', 'star-spoke', true);
      addLink('vapt', 'gateway', 'star-spoke', true);
      addLink('threat', 'gateway', 'star-spoke', true);
      addLink('websec', 'gateway', 'star-spoke', true);
      addLink('hardening', 'gateway', 'star-spoke', true);
      addLink('gateway', 'server', 'star-spoke', true);

      // 2. Circumferential Star Orbit Links (Gives topology an authentic network mesh feel)
      addLink('client', 'vapt', 'orbit-ring', false);
      addLink('client', 'websec', 'orbit-ring', false);
      addLink('vapt', 'threat', 'orbit-ring', false);
      addLink('websec', 'hardening', 'orbit-ring', false);
      addLink('threat', 'server', 'orbit-ring', false);
      addLink('hardening', 'server', 'orbit-ring', false);

      return links;
    };

    // Data packets that cycle through the Star Topology
    let packets = [];
    const createPacket = (links) => {
      if (links.length === 0) return null;
      // Prioritize star-spokes (radial to/from center)
      const spokes = links.filter((l) => l.type === 'star-spoke');
      const chosen = Math.random() > 0.35 && spokes.length > 0
        ? spokes[Math.floor(Math.random() * spokes.length)]
        : links[Math.floor(Math.random() * links.length)];

      return {
        link: chosen,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.006,
        size: 2.2 + Math.random() * 1.2,
        color: Math.random() > 0.3 ? '#00f0ff' : '#60a5fa',
        trail: [],
        trailLength: 6,
      };
    };

    // Ambient floating dust particles - kept restrained (12 particles max)
    let particles = [];
    const initParticles = (w, h) => {
      const count = Math.min(14, Math.max(8, Math.floor(w / 45)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.2 + 0.6,
          alpha: Math.random() * 0.25 + 0.1,
        });
      }
    };

    let nodes = [];
    let connections = [];
    let gatewayGlowIntensity = 0;

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = Math.min(500, Math.max(390, width * 0.72));
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      nodes = getNodeDefinitions(width, height);
      connections = getConnections(nodes);
      initParticles(width, height);

      // Initialize packets
      packets = [];
      const packetCount = width < 520 ? 6 : 11;
      for (let i = 0; i < packetCount; i++) {
        const p = createPacket(connections);
        if (p) packets.push(p);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let time = 0;

    // Load AIS logo
    const aisLogoImg = new Image();
    aisLogoImg.src = '/logo.png';
    let logoLoaded = false;
    aisLogoImg.onload = () => {
      logoLoaded = true;
    };

    // Render loop
    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Enterprise Isometric / Technical Grid
      const gridSpacing = 38;
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
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

      // 2. Star Orbit Range Circles (Visualizes the star topology field)
      const gatewayNode = nodes.find((n) => n.id === 'gateway');
      if (gatewayNode) {
        const gx = gatewayNode.x;
        const gy = gatewayNode.y + Math.sin(time * 1.2 + gatewayNode.x * 0.01) * 2;

        ctx.save();
        // Inner concentric star pulse
        const pulseR = (Math.sin(time * 1.5) + 1) * 12 + 75;
        ctx.beginPath();
        ctx.arc(gx, gy, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 6]);
        ctx.stroke();

        // Outer star constellation perimeter ring
        const outerR = Math.min(width * 0.38, height * 0.39);
        ctx.beginPath();
        ctx.ellipse(gx, gy, outerR * 1.05, outerR * 0.88, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 8]);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Ambient Particles
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * (0.8 + 0.2 * Math.sin(time + i))})`;
        ctx.fill();
      }
      ctx.restore();

      // 4. Star Topology Interconnections (Radial Spokes + Circumferential Ring)
      connections.forEach((conn) => {
        const { from, to, type, primary } = conn;

        const fromY = from.y + Math.sin(time * 1.2 + from.x * 0.01) * 2;
        const toY = to.y + Math.sin(time * 1.2 + to.x * 0.01) * 2;

        const midX = (from.x + to.x) / 2;
        const midY = (fromY + toY) / 2 - (type === 'star-spoke' ? 0 : 6);

        ctx.save();
        // Background soft line glow
        ctx.beginPath();
        ctx.moveTo(from.x, fromY);
        if (type === 'orbit-ring') {
          ctx.quadraticCurveTo(midX, midY, to.x, toY);
        } else {
          ctx.lineTo(to.x, toY);
        }

        if (type === 'star-spoke') {
          ctx.strokeStyle = primary ? 'rgba(0, 240, 255, 0.22)' : 'rgba(30, 58, 138, 0.2)';
          ctx.lineWidth = 2.5;
        } else {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.10)';
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();

        // Core thin wire
        ctx.beginPath();
        ctx.moveTo(from.x, fromY);
        if (type === 'orbit-ring') {
          ctx.quadraticCurveTo(midX, midY, to.x, toY);
          ctx.strokeStyle = 'rgba(96, 165, 250, 0.22)';
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 4]);
        } else {
          ctx.lineTo(to.x, toY);
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.5)';
          ctx.lineWidth = 1.1;
        }
        ctx.stroke();
        ctx.restore();
      });

      // 5. Data Packets (Traveling across Star Spokes and Perimeter)
      if (!prefersReducedMotion) {
        packets.forEach((pkt) => {
          pkt.progress += pkt.speed;

          if (pkt.progress >= 1) {
            if (pkt.link.to.type === 'hub' || pkt.link.from.type === 'hub') {
              gatewayGlowIntensity = 1.0;
            }

            const currentToId = pkt.link.to.id;
            const nextCandidates = connections.filter((c) => c.from.id === currentToId);

            if (nextCandidates.length > 0) {
              pkt.link = nextCandidates[Math.floor(Math.random() * nextCandidates.length)];
              pkt.progress = 0;
            } else {
              pkt.link = connections[Math.floor(Math.random() * connections.length)];
              pkt.progress = 0;
            }
          }

          const { from, to, type } = pkt.link;
          const fromY = from.y + Math.sin(time * 1.2 + from.x * 0.01) * 2;
          const toY = to.y + Math.sin(time * 1.2 + to.x * 0.01) * 2;
          const midX = (from.x + to.x) / 2;
          const midY = (fromY + toY) / 2 - (type === 'star-spoke' ? 0 : 6);

          const t = pkt.progress;
          let curX, curY;

          if (type === 'orbit-ring') {
            const invT = 1 - t;
            curX = invT * invT * from.x + 2 * invT * t * midX + t * t * to.x;
            curY = invT * invT * fromY + 2 * invT * t * midY + t * t * toY;
          } else {
            curX = from.x + (to.x - from.x) * t;
            curY = fromY + (toY - fromY) * t;
          }

          pkt.trail.push({ x: curX, y: curY });
          if (pkt.trail.length > pkt.trailLength) {
            pkt.trail.shift();
          }

          ctx.save();
          // Packet Tail
          if (pkt.trail.length > 1) {
            for (let h = 0; h < pkt.trail.length - 1; h++) {
              const h1 = pkt.trail[h];
              const h2 = pkt.trail[h + 1];
              const alpha = (h / pkt.trail.length) * 0.45;
              ctx.beginPath();
              ctx.moveTo(h1.x, h1.y);
              ctx.lineTo(h2.x, h2.y);
              ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
              ctx.lineWidth = pkt.size * 0.65;
              ctx.stroke();
            }
          }

          // Packet Glow
          const radGrad = ctx.createRadialGradient(curX, curY, 0, curX, curY, pkt.size * 2.8);
          radGrad.addColorStop(0, '#ffffff');
          radGrad.addColorStop(0.35, pkt.color);
          radGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');

          ctx.beginPath();
          ctx.arc(curX, curY, pkt.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = radGrad;
          ctx.fill();

          // Packet Core
          ctx.beginPath();
          ctx.arc(curX, curY, pkt.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.restore();
        });
      }

      // Gateway Highlight Decay
      if (gatewayGlowIntensity > 0) {
        gatewayGlowIntensity = Math.max(0, gatewayGlowIntensity - 0.022);
      }

      // 6. Render Star Topology Nodes & Labels
      nodes.forEach((node) => {
        const floatY = node.y + Math.sin(time * 1.2 + node.x * 0.01) * 2;
        const x = node.x;
        const y = floatY;

        ctx.save();

        if (node.tier === 'hub') {
          // ==========================================
          // AIS SECURITY GATEWAY (CENTRAL STAR HUB)
          // ==========================================
          const isInspecting = gatewayGlowIntensity > 0.05;
          const r = node.r;

          // Star Radar Security Sweep Ring
          const radarAngle = time * 1.6;
          ctx.beginPath();
          ctx.arc(x, y, r + 13, 0, Math.PI * 2);
          ctx.strokeStyle = isInspecting ? 'rgba(0, 240, 255, 0.45)' : 'rgba(56, 189, 248, 0.2)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Sweeping arc
          ctx.beginPath();
          ctx.arc(x, y, r + 13, radarAngle, radarAngle + Math.PI * 0.5);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.75)';
          ctx.lineWidth = 2.2;
          ctx.stroke();

          // Radial Atmosphere Glow
          const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
          glowGrad.addColorStop(0, isInspecting ? 'rgba(0, 240, 255, 0.38)' : 'rgba(37, 99, 235, 0.30)');
          glowGrad.addColorStop(0.55, 'rgba(14, 165, 233, 0.09)');
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.beginPath();
          ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          // Hexagonal Beveled Shell
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (Math.PI / 3) * a - Math.PI / 6;
            const hx = x + Math.cos(angle) * (r + 2);
            const hy = y + Math.sin(angle) * (r + 2);
            if (a === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fillStyle = '#060d22';
          ctx.fill();
          ctx.strokeStyle = isInspecting ? 'rgba(0, 240, 255, 0.95)' : 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Inner circular platform
          ctx.beginPath();
          ctx.arc(x, y, r - 5, 0, Math.PI * 2);
          ctx.fillStyle = '#040816';
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Integrated AIS Logo
          if (logoLoaded && aisLogoImg.complete) {
            const logoW = r * 1.5;
            const logoH = r * 0.75;
            ctx.drawImage(aisLogoImg, x - logoW / 2, y - logoH / 2 - 2, logoW, logoH);
          } else {
            ctx.fillStyle = '#ffffff';
            ctx.font = '700 14px "Space Grotesk", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('AIS', x, y - 2);
          }

          // Active Protection Indicator Dot
          ctx.beginPath();
          ctx.arc(x, y + r - 8, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isInspecting ? '#22c55e' : '#00f0ff';
          ctx.shadowColor = isInspecting ? '#22c55e' : '#00f0ff';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Hub Label
          const labelY = y + r + 16;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.font = '600 12px "Space Grotesk", system-ui, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(node.label, x, labelY);

        } else if (node.tier === 'secondary') {
          // ==========================================
          // CLIENT INGRESS & PROTECTED SERVER
          // ==========================================
          const r = node.r;

          ctx.beginPath();
          ctx.arc(x, y, r * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = node.icon === 'client' ? 'rgba(14, 165, 233, 0.12)' : 'rgba(52, 211, 153, 0.12)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = '#070f24';
          ctx.fill();
          ctx.strokeStyle = node.icon === 'client' ? 'rgba(56, 189, 248, 0.7)' : 'rgba(52, 211, 153, 0.7)';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          if (node.icon === 'client') {
            // Client Screen Glyph
            ctx.fillStyle = '#e0f2fe';
            ctx.fillRect(x - 7, y - 5, 14, 8);
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(x - 5, y - 3, 10, 5);
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(x - 9, y + 4, 18, 2);
          } else {
            // Server Rack Glyph
            const drawRack = (ry, h) => {
              ctx.fillStyle = '#09152e';
              ctx.strokeStyle = 'rgba(52, 211, 153, 0.65)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.roundRect(x - 9, ry, 18, h, 2);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = '#22c55e';
              ctx.beginPath();
              ctx.arc(x + 5, ry + h / 2, 1.3, 0, Math.PI * 2);
              ctx.fill();
            };
            drawRack(y - 8, 4.5);
            drawRack(y - 2, 4.5);
            drawRack(y + 4, 4.5);
          }

          const labelY = y + r + 14;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.font = '500 11px "Space Grotesk", system-ui, sans-serif';
          ctx.fillStyle = '#f1f5f9';
          ctx.fillText(node.label, x, labelY);

        } else {
          // ==========================================
          // SATELLITE SECURITY NODES:
          // 1. VAPT
          // 2. Web Security
          // 3. Threat Detection
          // 4. Security Hardening
          // ==========================================
          const r = node.r;

          // Subtle pulse ring
          const pulse = (Math.sin(time * 2 + node.x * 0.05) + 1) / 2;
          ctx.beginPath();
          ctx.arc(x, y, r + 4 + pulse * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.16)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Outer Node Body
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = '#071024';
          ctx.fill();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Node Glyphs for each specialized security module
          if (node.icon === 'vapt') {
            // Target / Pen-test crosshair icon
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - 8, y);
            ctx.lineTo(x + 8, y);
            ctx.moveTo(x, y - 8);
            ctx.lineTo(x, y + 8);
            ctx.stroke();
          } else if (node.icon === 'threat') {
            // Threat Radar / Warning Diamond icon
            ctx.strokeStyle = '#38bdf8';
            ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x, y - 7);
            ctx.lineTo(x + 7, y);
            ctx.lineTo(x, y + 7);
            ctx.lineTo(x - 7, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Center focal dot
            ctx.fillStyle = '#00f0ff';
            ctx.beginPath();
            ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          } else if (node.icon === 'websec') {
            // Globe / Web Shield icon
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(x, y, 6.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(x, y, 3, 6.5, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - 6.5, y);
            ctx.lineTo(x + 6.5, y);
            ctx.stroke();
          } else if (node.icon === 'hardening') {
            // Hardened Lock / Security Shield icon
            ctx.strokeStyle = '#38bdf8';
            ctx.fillStyle = '#38bdf8';
            ctx.lineWidth = 1.2;
            // Shield contour
            ctx.beginPath();
            ctx.moveTo(x, y - 6);
            ctx.lineTo(x + 5, y - 3);
            ctx.lineTo(x + 5, y + 2);
            ctx.lineTo(x, y + 6);
            ctx.lineTo(x - 5, y + 2);
            ctx.lineTo(x - 5, y - 3);
            ctx.closePath();
            ctx.stroke();
            // Inner core
            ctx.beginPath();
            ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }

          // Node Label: Top nodes have labels positioned above; bottom nodes have labels positioned below
          const isTop = y < height * 0.48;
          const labelY = isTop ? y - r - 6 : y + r + 14;

          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.font = '600 10.5px "Space Grotesk", system-ui, sans-serif';
          ctx.fillStyle = '#f1f5f9';
          ctx.fillText(node.label, x, labelY);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[590px] h-[410px] sm:h-[460px] lg:h-[480px] flex flex-col items-center justify-center select-none"
      data-purpose="hero-cybersecurity-star-topology"
    >
      {/* Ambient Atmosphere Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-cyan-500/8 to-indigo-600/10 rounded-3xl blur-2xl pointer-events-none -z-10" />

      {/* Tightly positioned Star Mesh Telemetry Badge (Top Right) */}
      <div className="absolute top-1 right-2 hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#060c20]/85 border border-cyan-400/25 backdrop-blur-md text-[9.5px] text-cyan-300 font-mono tracking-wider shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>AIS DEFENSE STAR MESH</span>
      </div>

      {/* High-Performance Canvas Animation */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block rounded-2xl cursor-default"
        aria-label="Star topology cybersecurity network animation with AIS Security Gateway at center hub, connecting VAPT, Web Security, Threat Detection, Security Hardening, Client Ingress, and Protected Server"
      />

      {/* Bottom Directional Star Flow Indicator */}
      <div className="mt-1 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#060c20]/75 border border-white/10 backdrop-blur-md text-[9.5px] text-slate-300 font-mono tracking-wider">
        <span className="text-cyan-400 font-semibold">STAR TOPOLOGY:</span>
        <span>CLIENT → AIS HUB [VAPT • WEB SEC • THREAT • HARDENING] → SECURE SERVER</span>
      </div>
    </div>
  );
};

export default NetworkTopologyVisualizer;
