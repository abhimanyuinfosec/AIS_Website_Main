import React, { useState, useEffect } from 'react';

/**
 * SecurityStackWorkflowVisualizer
 * 3D Vertical Cybersecurity Workflow Stack:
 * 01 — ACCESS (Connect securely)
 * 02 — IDENTIFY (Discover & assess)
 * 03 — SECURE (Protect & remediate)
 * 04 — MONITOR (Detect & respond)
 * 
 * Arranged as a 3D isometric stacked polygonal infrastructure with
 * ascending energy pulses, progressive layer illumination, radar sweeps on MONITOR,
 * interactive hover highlights, and smooth continuous loop resets.
 */
const SecurityStackWorkflowVisualizer = ({ externalActiveStep, onStepChange }) => {
  // Current active step in sequence: 0 (ACCESS), 1 (IDENTIFY), 2 (SECURE), 3 (MONITOR), 4 (BURST/FULL PIPELINE)
  const [internalActiveStep, setInternalActiveStep] = useState(0);
  const activeStep = externalActiveStep !== undefined ? externalActiveStep : internalActiveStep;
  const setActiveStep = (val) => {
    const nextVal = typeof val === 'function' ? val(activeStep) : val;
    setInternalActiveStep(nextVal);
    if (onStepChange) onStepChange(nextVal);
  };
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Four-stage cybersecurity stack definitions (ordered bottom to top)
  const stages = [
    {
      step: '01',
      id: 'access',
      name: 'ACCESS',
      descriptor: 'Connect securely',
      icon: 'access',
      color: '#38bdf8',
      tier: 'base',
      baseY: 280, // Bottom layer
      width: 280,
      height: 48,
    },
    {
      step: '02',
      id: 'identify',
      name: 'IDENTIFY',
      descriptor: 'Discover & assess',
      icon: 'identify',
      color: '#60a5fa',
      tier: 'inspection',
      baseY: 200, // Second layer
      width: 250,
      height: 48,
    },
    {
      step: '03',
      id: 'secure',
      name: 'SECURE',
      descriptor: 'Protect & remediate',
      icon: 'secure',
      color: '#00f0ff',
      tier: 'primary', // Strongest visual highlight
      baseY: 120, // Third layer
      width: 220,
      height: 48,
    },
    {
      step: '04',
      id: 'monitor',
      name: 'MONITOR',
      descriptor: 'Detect & respond',
      icon: 'monitor',
      color: '#34d399',
      tier: 'apex',
      baseY: 40, // Top layer
      width: 190,
      height: 48,
    },
  ];

  // Automatic progression through workflow:
  // Step 0: ACCESS (0s - 2s)
  // Step 1: IDENTIFY (2s - 4s)
  // Step 2: SECURE (4s - 6s)
  // Step 3: MONITOR (6s - 8s)
  // Step 4: Vertical Energy Flow across full stack (8s - 10s) -> Smooth loop back to 0
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2200);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Determine if a stage is currently active or energized
  const isStageActive = (index) => {
    if (hoveredStep !== null) return hoveredStep === index;
    if (activeStep === 4) return true; // Full pipeline flow
    return activeStep >= index;
  };

  const isCurrentStageFocus = (index) => {
    if (hoveredStep !== null) return hoveredStep === index;
    return activeStep === index || activeStep === 4;
  };

  return (
    <div
      className="relative w-full max-w-[520px] mx-auto flex flex-col items-center justify-center select-none py-4"
      data-purpose="3d-cybersecurity-workflow-stack"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredStep(null);
      }}
    >
      {/* Background Radial Atmosphere Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-600/15 to-indigo-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Central 3D Stack SVG Engine */}
      <div className="relative w-full max-w-[460px] h-[390px] sm:h-[410px]">
        <svg
          viewBox="0 0 500 420"
          className="w-full h-full overflow-visible drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for 3D Polygon Faces */}
            <linearGradient id="polyTopActive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#0f2148" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#081024" stopOpacity="0.96" />
            </linearGradient>

            <linearGradient id="polyTopSecure" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#0e3a6c" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#091830" stopOpacity="0.96" />
            </linearGradient>

            <linearGradient id="polyTopInactive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111c33" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#070c18" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="polyLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#091222" />
              <stop offset="100%" stopColor="#030710" />
            </linearGradient>

            <linearGradient id="polyRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0e1b33" />
              <stop offset="100%" stopColor="#050a14" />
            </linearGradient>

            <linearGradient id="energyBeam" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
            </linearGradient>

            {/* Glowing Neon Filter */}
            <filter id="stackGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central Vertical Alignment Spine Axis */}
          <line
            x1="250"
            y1="50"
            x2="250"
            y2="370"
            stroke="rgba(0, 240, 255, 0.15)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* Ascending Energy Spine Pulse (Flows bottom to top across whole stack) */}
          <line
            x1="250"
            y1="360"
            x2="250"
            y2="40"
            stroke="url(#energyBeam)"
            strokeWidth={activeStep === 4 ? 3.5 : 2}
            className={activeStep === 4 ? "animate-pulse" : ""}
            opacity={activeStep > 0 ? 0.85 : 0.25}
          />

          {/* =======================================================
              RENDER 3D POLYGONAL STACKED LAYERS (FROM BOTTOM TO TOP)
              01 ACCESS -> 02 IDENTIFY -> 03 SECURE -> 04 MONITOR
             ======================================================= */}
          {stages.map((stage, idx) => {
            const active = isStageActive(idx);
            const isFocus = isCurrentStageFocus(idx);
            const isHovered = hoveredStep === idx;

            // Lift active or hovered layers slightly on the Y-axis for authentic 3D extrusion
            const lift = isHovered ? 12 : isFocus ? 7 : active ? 2 : 0;
            const cy = stage.baseY - lift;

            // Polygon Dimensions (Isometric diamond / hexagonal facet)
            const rx = stage.width / 2;
            const ry = stage.height / 2;
            const extrude = 16; // 3D depth thickness

            // Coordinates for Isometric Polygon Top Face
            // Top: (250, cy - ry), Right: (250 + rx, cy), Bottom: (250, cy + ry), Left: (250 - rx, cy)
            const ptTop = `${250},${cy - ry}`;
            const ptRight = `${250 + rx},${cy}`;
            const ptBottom = `${250},${cy + ry}`;
            const ptLeft = `${250 - rx},${cy}`;

            // Coordinates for Extruded Left & Right 3D Sides
            const ptLeftExtrude = `${250 - rx},${cy + extrude}`;
            const ptBottomExtrude = `${250},${cy + ry + extrude}`;
            const ptRightExtrude = `${250 + rx},${cy + extrude}`;

            return (
              <g
                key={stage.id}
                className={`cursor-pointer transition-transform duration-500 ease-out animate-spring-layer-${idx}`}
                style={{ transformOrigin: '250px center' }}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* 1. Ambient Glow Underneath Active Layer */}
                {active && (
                  <ellipse
                    cx="250"
                    cy={cy + ry + extrude / 2}
                    rx={rx * 0.9}
                    ry={ry * 0.75}
                    fill={stage.tier === 'primary' ? 'rgba(0, 240, 255, 0.25)' : 'rgba(56, 189, 248, 0.16)'}
                    filter="url(#strongGlow)"
                  />
                )}

                {/* 2. Extruded Left 3D Face */}
                <polygon
                  points={`${ptLeft} ${ptBottom} ${ptBottomExtrude} ${ptLeftExtrude}`}
                  fill="url(#polyLeft)"
                  stroke={active ? (isFocus ? '#00f0ff' : '#38bdf8') : '#1e293b'}
                  strokeWidth="0.8"
                  strokeOpacity={active ? 0.6 : 0.2}
                />

                {/* 3. Extruded Right 3D Face */}
                <polygon
                  points={`${ptBottom} ${ptRight} ${ptRightExtrude} ${ptBottomExtrude}`}
                  fill="url(#polyRight)"
                  stroke={active ? (isFocus ? '#00f0ff' : '#38bdf8') : '#1e293b'}
                  strokeWidth="0.8"
                  strokeOpacity={active ? 0.7 : 0.25}
                />

                {/* 4. Top 3D Polygon Platform Surface */}
                <polygon
                  points={`${ptTop} ${ptRight} ${ptBottom} ${ptLeft}`}
                  fill={
                    stage.tier === 'primary' && active
                      ? 'url(#polyTopSecure)'
                      : active
                      ? 'url(#polyTopActive)'
                      : 'url(#polyTopInactive)'
                  }
                  stroke={
                    isFocus
                      ? stage.tier === 'primary'
                        ? '#00f0ff'
                        : '#38bdf8'
                      : active
                      ? 'rgba(56, 189, 248, 0.65)'
                      : 'rgba(71, 85, 105, 0.4)'
                  }
                  strokeWidth={isFocus ? (stage.tier === 'primary' ? 2.2 : 1.8) : 1.2}
                  filter={isFocus ? 'url(#stackGlow)' : undefined}
                />

                {/* 5. Inner Circuit / Inset Edge Highlight */}
                {active && (
                  <polygon
                    points={`${250},${cy - ry * 0.65} ${250 + rx * 0.65},${cy} ${250},${cy + ry * 0.65} ${250 - rx * 0.65},${cy}`}
                    fill="none"
                    stroke={stage.tier === 'primary' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(147, 197, 253, 0.3)'}
                    strokeWidth="1"
                    strokeDasharray={isFocus ? "none" : "4 3"}
                  />
                )}

                {/* 6. Central Layer Emblem / Core Icon */}
                <g transform={`translate(${250}, ${cy})`}>
                  {stage.icon === 'access' && (
                    // User / Connection Node
                    <g filter={isFocus ? "url(#stackGlow)" : undefined}>
                      <circle cx="0" cy="0" r="7" fill="#08142c" stroke={active ? "#38bdf8" : "#475569"} strokeWidth="1.4" />
                      <circle cx="0" cy="-2" r="2.4" fill={active ? "#ffffff" : "#94a3b8"} />
                      <path d="M-4,4 C-4,1 4,1 4,4" fill="none" stroke={active ? "#38bdf8" : "#94a3b8"} strokeWidth="1.2" />
                    </g>
                  )}

                  {stage.icon === 'identify' && (
                    // Scanner / Crosshair / Radar Search
                    <g filter={isFocus ? "url(#stackGlow)" : undefined}>
                      <circle cx="0" cy="0" r="7.5" fill="#08142c" stroke={active ? "#60a5fa" : "#475569"} strokeWidth="1.4" />
                      <circle cx="0" cy="0" r="3.5" stroke={active ? "#93c5fd" : "#64748b"} strokeWidth="1" fill="none" />
                      <line x1="-8" y1="0" x2="8" y2="0" stroke={active ? "#38bdf8" : "#475569"} strokeWidth="1" />
                      <line x1="0" y1="-8" x2="0" y2="8" stroke={active ? "#38bdf8" : "#475569"} strokeWidth="1" />
                    </g>
                  )}

                  {stage.icon === 'secure' && (
                    // Hardened Shield Core (Primary Highlight)
                    <g filter={isFocus ? "url(#strongGlow)" : undefined}>
                      <circle cx="0" cy="0" r="9" fill="#031633" stroke="#00f0ff" strokeWidth="1.6" />
                      <path
                        d="M0,-5 L5,-2.5 L5,1.5 C5,4.5 0,7 0,7 C0,7 -5,4.5 -5,1.5 L-5,-2.5 Z"
                        fill="rgba(0, 240, 255, 0.25)"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <path d="M-1.5,0.5 L-0.3,1.7 L2,-1" fill="none" stroke="#00f0ff" strokeWidth="1.2" strokeLinecap="round" />
                    </g>
                  )}

                  {stage.icon === 'monitor' && (
                    // Continuous Monitor / Radar Pulse
                    <g>
                      <circle cx="0" cy="0" r="8" fill="#061c24" stroke={active ? "#34d399" : "#475569"} strokeWidth="1.4" />
                      <circle cx="0" cy="0" r="3" fill={active ? "#34d399" : "#64748b"} />
                      {/* Live sweeping radar arc on top layer */}
                      {active && (
                        <circle
                          cx="0"
                          cy="0"
                          r="14"
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="1.2"
                          strokeDasharray="6 8"
                          className="animate-spin"
                          style={{ transformOrigin: 'center', animationDuration: '4s' }}
                        />
                      )}
                    </g>
                  )}
                </g>

                {/* 7. Directional Connector Signal Line linking to label */}
                <path
                  d={`M ${250 + rx},${cy} L ${250 + rx + 16},${cy}`}
                  stroke={active ? (isFocus ? "#00f0ff" : "rgba(56, 189, 248, 0.4)") : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth="1.2"
                />

                {/* 8. Minimal, Clean Stage Label Integrated Immediately Beside Layer */}
                <g transform={`translate(${250 + rx + 24}, ${cy - 8})`}>
                  {/* Step Number Tag */}
                  <text
                    x="0"
                    y="7"
                    fontFamily="'Space Grotesk', system-ui, sans-serif"
                    fontSize="10"
                    fontWeight="700"
                    fill={isFocus ? stage.color : active ? "#94a3b8" : "#475569"}
                    letterSpacing="0.05em"
                  >
                    {stage.step}
                  </text>

                  {/* Stage Name */}
                  <text
                    x="22"
                    y="7"
                    fontFamily="'Space Grotesk', system-ui, sans-serif"
                    fontSize="13"
                    fontWeight={isFocus ? "700" : "600"}
                    fill={isFocus ? "#ffffff" : active ? "#e2e8f0" : "#64748b"}
                    letterSpacing="0.03em"
                  >
                    {stage.name}
                  </text>

                  {/* Supporting Subtle Descriptor */}
                  <text
                    x="22"
                    y="21"
                    fontFamily="'Inter', system-ui, sans-serif"
                    fontSize="9.5"
                    fontWeight="400"
                    fill={isFocus ? (stage.tier === 'primary' ? "#38bdf8" : "#94a3b8") : "#64748b"}
                  >
                    {stage.descriptor}
                  </text>
                </g>

                {/* Left Step Indicator Beacon Dot */}
                <circle
                  cx={250 - rx - 12}
                  cy={cy}
                  r={isFocus ? 3.5 : 2}
                  fill={isFocus ? stage.color : active ? "#38bdf8" : "#334155"}
                  filter={isFocus ? "url(#stackGlow)" : undefined}
                />
              </g>
            );
          })}

          {/* Inter-layer Ascending Signal Packets */}
          {activeStep > 0 && activeStep < 4 && (
            <circle
              cx="250"
              cy={stages[activeStep].baseY + 30}
              r="3.5"
              fill="#00f0ff"
              filter="url(#stackGlow)"
              className="animate-pulse"
            />
          )}
        </svg>
      </div>

      {/* Integrated Workflow Sequence Indicator Bar (Directly beneath 3D stack) */}
      <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full bg-[#070e24]/80 border border-white/10 backdrop-blur-md text-[10px] text-slate-300 font-mono tracking-wider shadow-sm">
        <span className="text-cyan-400 font-bold">PIPELINE:</span>
        <span className={activeStep === 0 ? "text-cyan-300 font-semibold" : "text-slate-400"}>01 ACCESS</span>
        <span className="text-slate-600">→</span>
        <span className={activeStep === 1 ? "text-blue-300 font-semibold" : "text-slate-400"}>02 IDENTIFY</span>
        <span className="text-slate-600">→</span>
        <span className={activeStep === 2 ? "text-cyan-300 font-bold drop-shadow-[0_0_8px_#00f0ff]" : "text-slate-400"}>03 SECURE</span>
        <span className="text-slate-600">→</span>
        <span className={activeStep === 3 ? "text-emerald-300 font-semibold" : "text-slate-400"}>04 MONITOR</span>
      </div>
    </div>
  );
};

export default SecurityStackWorkflowVisualizer;
