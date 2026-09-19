import React, { useRef, useEffect } from 'react';

/**
 * AmbientBackdrop
 * Enterprise "quiet dark night" cybersecurity background atmosphere.
 * - Deep near-black background (#020508, #03070B, #05090F)
 * - Sparse tiny star points (1px - 2px max) with low opacity (0.10 - 0.20, occasional 0.25 - 0.35)
 * - Very thin, dark desaturated blue constellation connections (0.06 - 0.12 opacity)
 * - Ultra-minimal 2-3 depth layer parallax (maximum 5 - 8px movement)
 * - Slow, subtle twinkle on ~12% of stars (6 - 12s period)
 * - Respects prefers-reduced-motion and tab visibility
 * - Lightweight HTML5 2D Canvas with zero external dependencies
 */
const AmbientBackdrop = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let stars = [];
    let constellations = [];

    // Subtle white, cool-gray, and quiet desaturated blue star colors
    const neutralColors = ['#cbd5e1', '#94a3b8', '#e2e8f0'];
    const blueAccentColor = '#93c5fd';

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        currentOffsetX = 0;
        currentOffsetY = 0;
        targetOffsetX = 0;
        targetOffsetY = 0;
      }
    };
    motionQuery.addEventListener?.('change', handleMotionChange);

    // Parallax tracking with gentle damping (max 7px movement)
    const MAX_PARALLAX = 7;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const nx = (e.clientX / (width || 1)) - 0.5; // -0.5 to 0.5
      const ny = (e.clientY / (height || 1)) - 0.5; // -0.5 to 0.5
      targetOffsetX = nx * MAX_PARALLAX * 2;
      targetOffsetY = ny * MAX_PARALLAX * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize stars & sparse constellation lines
    const initSky = (w, h) => {
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;

      // Sparse star count: Mobile ~28, Tablet ~45, Desktop ~68
      const starCount = isMobile ? 28 : isTablet ? 45 : 68;

      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        // Depth Layer:
        // Layer 1 (60%): tiny background stars, almost static (layerDepth: 0.22)
        // Layer 2 (40%): slightly larger stars, subtle parallax (layerDepth: 0.85)
        const isLayer2 = Math.random() < 0.40;
        const layerDepth = isLayer2 ? 0.85 : 0.22;
        const radius = isLayer2 ? (0.75 + Math.random() * 0.2) : (0.45 + Math.random() * 0.15); // 1.0px to 1.9px max

        // Opacity:
        // 85% low opacity: 0.10 to 0.20
        // 15% occasional brighter: 0.25 to 0.35 (strictly <= 0.35)
        const isBrighter = Math.random() < 0.15;
        const baseAlpha = isBrighter
          ? 0.25 + Math.random() * 0.10
          : 0.10 + Math.random() * 0.10;

        // Colors: 82% cool gray/white, 18% quiet blue accent
        const isBlue = Math.random() < 0.18;
        const color = isBlue
          ? blueAccentColor
          : neutralColors[Math.floor(Math.random() * neutralColors.length)];

        // Twinkle: only ~12% have a very slow twinkle (6 to 12 seconds)
        const canTwinkle = Math.random() < 0.12;
        const twinkleDuration = (6000 + Math.random() * 6000); // 6s - 12s
        const phase = Math.random() * Math.PI * 2;

        newStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: radius,
          baseAlpha,
          color,
          layerDepth,
          canTwinkle,
          twinkleDuration,
          phase,
        });
      }

      // Constellation lines:
      // Very sparse connections between selected nearby stars around edges & empty areas
      const newConstellations = [];
      const maxLineDistance = isMobile ? 85 : 125;
      const targetConnections = isMobile ? 5 : isTablet ? 8 : 12;

      for (let i = 0; i < newStars.length && newConstellations.length < targetConnections; i++) {
        const s1 = newStars[i];

        // Prefer stars away from center reading zone
        const isEdgeOrEmptyZone =
          s1.x < w * 0.35 || s1.x > w * 0.65 || s1.y < h * 0.22 || s1.y > h * 0.75;
        if (!isEdgeOrEmptyZone && Math.random() < 0.75) continue;

        for (let j = i + 1; j < newStars.length; j++) {
          const s2 = newStars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 45 && dist < maxLineDistance) {
            // Very thin dark blue/gray line with opacity between 0.06 - 0.12
            const lineAlpha = 0.06 + Math.random() * 0.06;
            newConstellations.push({
              starA: i,
              starB: j,
              alpha: lineAlpha,
            });
            break; // 1-2 connections max per selected star to keep it sparse
          }
        }
      }

      return { stars: newStars, constellations: newConstellations };
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      const sky = initSky(width, height);
      stars = sky.stars;
      constellations = sky.constellations;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Animation Render Loop
    const render = (now) => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Smooth parallax interpolation
        if (!prefersReducedMotion) {
          currentOffsetX += (targetOffsetX - currentOffsetX) * 0.04;
          currentOffsetY += (targetOffsetY - currentOffsetY) * 0.04;
        } else {
          currentOffsetX = 0;
          currentOffsetY = 0;
        }

        // 1. Draw Constellation Connections (Layer 3)
        // Extremely thin (0.6px), dark desaturated blue/gray, low opacity (0.06 - 0.12)
        ctx.lineWidth = 0.65;
        for (let i = 0; i < constellations.length; i++) {
          const conn = constellations[i];
          const s1 = stars[conn.starA];
          const s2 = stars[conn.starB];
          if (!s1 || !s2) continue;

          const x1 = s1.x + currentOffsetX * s1.layerDepth;
          const y1 = s1.y + currentOffsetY * s1.layerDepth;
          const x2 = s2.x + currentOffsetX * s2.layerDepth;
          const y2 = s2.y + currentOffsetY * s2.layerDepth;

          ctx.save();
          ctx.strokeStyle = '#4a678d'; // Dark desaturated slate-blue
          ctx.globalAlpha = conn.alpha;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.restore();
        }

        // 2. Draw Stars (Layers 1 & 2)
        // Tiny dots (1px - 2px max), 0.10 - 0.20 opacity, occasional 0.25 - 0.35
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];

          // Compute gentle slow twinkle for qualifying stars
          let alpha = s.baseAlpha;
          if (s.canTwinkle && !prefersReducedMotion) {
            const progress = (now + s.phase) / s.twinkleDuration;
            const wave = 0.5 + 0.5 * Math.sin(progress * Math.PI * 2);
            // Variations strictly between 0.10 and 0.25 (or baseAlpha)
            alpha = s.baseAlpha * (0.8 + 0.35 * wave);
          }

          // Strict clamp: never exceed 0.35
          alpha = Math.min(0.35, Math.max(0.08, alpha));

          const drawX = s.x + currentOffsetX * s.layerDepth;
          const drawY = s.y + currentOffsetY * s.layerDepth;

          ctx.save();
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(drawX, drawY, s.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020508]"
    >
      {/* 1. Subtle Dark Atmosphere (near-black #020508, #03070B, #05090F) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,#05090F_0%,#03070B_45%,#020508_100%)]" />

      {/* 2. Extremely subtle, dark navy depth in upper periphery (barely visible) */}
      <div className="absolute -top-[15%] right-[5%] w-[650px] h-[650px] rounded-full bg-blue-950/[0.08] blur-[170px]" />
      <div className="absolute top-[40%] -left-[12%] w-[550px] h-[550px] rounded-full bg-[#070d1a]/[0.10] blur-[180px]" />

      {/* 3. Soft Dark Vignette preserving central text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,5,8,0.75)_100%)]" />

      {/* 4. Canvas: Sparse Stars, Constellation Lines & Minimal Parallax */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};

export default AmbientBackdrop;
