import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden" data-purpose="hero-section">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Hero Text Column */}
        <div className="lg:col-span-6 space-y-7 text-left">
          {/* Eyebrow Pill Badge with Radar Live Pulse Indicator */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">Next-Gen Cyber Defense</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span className="text-[11px] text-slate-300 font-medium">Zero-Day Shield</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            <span className="abhimanyu-gradient-animated">Abhimanyu</span> <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200">
              The first cloud-firewall, built for WFH &amp; Enterprise.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed drop-shadow-sm">
            Abhimanyu is simple and zero-latency to use, no hardware or on-prem IT department required. Your distributed workforce is automatically safeguarded by autonomous zero-trust machine intelligence.
          </p>

          {/* Primary Actions with Shimmer & Glow */}
          <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-5">
            <Link 
              className="btn-shimmer px-8 py-3.5 text-sm font-bold tracking-wide text-white bg-gradient-to-r from-blue-600 via-brand-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center" 
              to="/contact"
            >
              SIGN UP NOW
            </Link>
            <a 
              className="glass-surface-interactive px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-200 hover:text-white rounded-full transition-all text-center border border-white/15 hover:border-cyan-400/40" 
              href="#how-it-works"
            >
              READ MORE
            </a>
          </div>

          {/* Micro Trust Stat */}
          <div className="pt-4 flex items-center gap-4 text-xs text-slate-400 border-t border-white/[0.08] max-w-lg">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <svg className="w-4 h-4 filter drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
              </svg>
              <span>Instant deployment (under 3 min)</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="text-slate-300">SOC2 Type II &amp; ISO 27001 Certified</div>
          </div>
        </div>

        {/* Hero 3D Isometric Pedestal Illustration Column with Glass & Glow */}
        <div className="lg:col-span-6 relative flex justify-center items-center" data-purpose="hero-3d-visual" data-depth="hero">
          {/* Outer radial glowing aura */}
          <div className="absolute w-[440px] h-[440px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/25 to-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          {/* 3D Isometric Scene Render Container with Smooth Float */}
          <div className="relative w-full max-w-[520px] h-[460px] flex items-center justify-center animate-pedestal">
            <svg className="w-full h-auto max-h-[460px] filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]" fill="none" viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Pedestal Gradients with Glass Sheen Highlights */}
                <linearGradient id="pedestalTop" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#243352"></stop>
                  <stop offset="60%" stopColor="#141f36"></stop>
                  <stop offset="100%" stopColor="#0c1324"></stop>
                </linearGradient>
                <linearGradient id="pedestalLeft" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#10192e"></stop>
                  <stop offset="100%" stopColor="#060a14"></stop>
                </linearGradient>
                <linearGradient id="pedestalRight" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#172440"></stop>
                  <stop offset="100%" stopColor="#080e1d"></stop>
                </linearGradient>

                {/* Futuristic Cloud Gradients */}
                <linearGradient id="cloudGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8"></stop>
                  <stop offset="40%" stopColor="#2563eb"></stop>
                  <stop offset="100%" stopColor="#1d4ed8"></stop>
                </linearGradient>
                <linearGradient id="shieldGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9"></stop>
                  <stop offset="60%" stopColor="#2563eb"></stop>
                  <stop offset="100%" stopColor="#1e3a8a"></stop>
                </linearGradient>

                {/* Hologram Globe Gradient */}
                <radialGradient cx="35%" cy="35%" id="globeGrad" r="65%">
                  <stop offset="0%" stopColor="#67e8f9"></stop>
                  <stop offset="35%" stopColor="#3b82f6"></stop>
                  <stop offset="75%" stopColor="#1d4ed8"></stop>
                  <stop offset="100%" stopColor="#0b1329"></stop>
                </radialGradient>

                {/* Neon Glow Filter */}
                <filter height="160%" id="neonGlow" width="160%" x="-30%" y="-30%">
                  <feGaussianBlur result="blur" stdDeviation="6"></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="blur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
                <filter height="180%" id="cyanAura" width="180%" x="-40%" y="-40%">
                  <feGaussianBlur result="blur" stdDeviation="10"></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="blur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>

              {/* ISOMETRIC LOWER PLATFORM (BASE) */}
              <polygon fill="url(#pedestalTop)" points="300,280 480,380 300,480 120,380" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.2"></polygon>
              <polygon fill="url(#pedestalLeft)" points="120,380 300,480 300,505 120,405"></polygon>
              <polygon fill="url(#pedestalRight)" points="300,480 480,380 480,405 300,505"></polygon>

              {/* Matrix Grid Dots on Base Platform with Pulsing Cyan Glow */}
              <g fill="#00f0ff" filter="url(#neonGlow)" opacity="0.75">
                <circle cx="210" cy="380" r="2.2"></circle>
                <circle cx="230" cy="390" r="2.2"></circle>
                <circle cx="250" cy="400" r="2.2"></circle>
                <circle cx="225" cy="368" r="2"></circle>
                <circle cx="245" cy="378" r="2"></circle>
                <circle cx="265" cy="388" r="2"></circle>
                <circle cx="240" cy="355" r="1.8"></circle>
                <circle cx="260" cy="365" r="1.8"></circle>
                <circle cx="280" cy="375" r="1.8"></circle>
              </g>

              {/* Hardware Gateway / Router Node on Left Stepped Block */}
              <g transform="translate(145, 230)">
                <polygon fill="#1e293b" points="60,30 110,60 60,90 10,60" stroke="#475569" strokeWidth="1.2"></polygon>
                <polygon fill="#090e1c" points="10,60 60,90 60,115 10,85"></polygon>
                <polygon fill="#0f172a" points="60,90 110,60 110,85 60,115"></polygon>
                <line stroke="#334155" strokeWidth="2" x1="40" x2="80" y1="42" y2="65"></line>
                <line stroke="#334155" strokeWidth="2" x1="33" x2="73" y1="48" y2="71"></line>
                <line stroke="#334155" strokeWidth="2" x1="26" x2="66" y1="54" y2="77"></line>
                <rect fill="#000" height="9" rx="1.5" width="10" x="25" y="70"></rect>
                <rect fill="#000" height="9" rx="1.5" width="10" x="40" y="79"></rect>
                <circle cx="29" cy="85" fill="#22c55e" filter="url(#neonGlow)" r="2"></circle>
                <circle cx="44" cy="94" fill="#00f0ff" filter="url(#neonGlow)" r="2"></circle>
              </g>

              {/* Step Pedestal Tier 2 (Right Steps) */}
              <g transform="translate(0, 0)">
                <polygon fill="#1b2438" points="410,255 495,305 440,335 355,285" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.8"></polygon>
                <polygon fill="#0b1122" points="355,285 440,335 440,355 355,305"></polygon>
                <polygon fill="#10182b" points="440,335 495,305 495,325 440,355"></polygon>
                <polygon fill="#161f33" points="440,290 520,335 480,360 400,315" stroke="#253248" strokeWidth="0.8"></polygon>
                <polygon fill="#070c18" points="400,315 480,360 480,380 400,335"></polygon>
                <polygon fill="#0b1224" points="480,360 520,335 520,355 480,380"></polygon>
              </g>

              {/* ISOMETRIC CENTRAL MAIN PEDESTAL CUBE WITH GLASS RIM */}
              <polygon fill="url(#pedestalTop)" points="300,175 425,245 300,320 175,250" stroke="#00f0ff" strokeOpacity="0.4" strokeWidth="1.4"></polygon>
              <polygon fill="url(#pedestalLeft)" points="175,250 300,320 300,380 175,310"></polygon>
              <polygon fill="url(#pedestalRight)" points="300,320 425,245 425,305 300,380"></polygon>

              {/* Shield Badge on Pedestal Front Left Face */}
              <g transform="translate(225, 290) skewY(26) scale(0.85)">
                <path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z" fill="url(#shieldGrad)" filter="url(#neonGlow)"></path>
                <path d="M8 12l3 3 5-5" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"></path>
              </g>

              {/* HOLOGRAPHIC FLOATING SECURITY CLOUD EMBLEM */}
              <g className="animate-cloud-badge" transform="translate(0, -10)">
                <g filter="url(#cyanAura)">
                  <path d="M330,135 C345,135 358,124 360,109 C372,107 382,97 382,84 C382,69 369,57 354,57 C352,57 350,57 348,58 C342,44 327,34 310,34 C290,34 274,47 270,65 C266,63 261,62 256,62 C240,62 227,75 227,91 C227,105 237,117 251,120 C250,122 250,125 250,127 C250,132 254,135 260,135 Z" fill="url(#cloudGrad)"></path>
                </g>
                <path d="M280,72 L268,78 L268,92 C268,102 274,109 280,112 C286,109 292,102 292,92 L292,78 Z" fill="#ffffff" opacity="0.95"></path>
                <path d="M276,87 L279,90 L285,84" fill="none" stroke="#1d4ed8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <text fill="#ffffff" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800" letterSpacing="-0.5" x="298" y="96">Abhimanyu</text>
                <circle cx="400" cy="85" fill="#67e8f9" filter="url(#neonGlow)" r="3"></circle>
              </g>

              {/* FLOATING 3D BLUE GLOBAL SPHERE ON BASE */}
              <g transform="translate(360, 310)">
                <ellipse cx="28" cy="48" fill="#000000" opacity="0.5" rx="22" ry="9"></ellipse>
                <circle cx="28" cy="28" fill="url(#globeGrad)" filter="url(#neonGlow)" r="24"></circle>
                <path d="M12 28 A16 16 0 0 0 44 28" fill="none" opacity="0.9" stroke="#bae6fd" strokeDasharray="3 2" strokeWidth="1.5"></path>
                <ellipse cx="28" cy="28" fill="none" opacity="0.7" rx="20" ry="8" stroke="#e0f2fe" strokeWidth="1.2"></ellipse>
                <path d="M20 12 C25 15, 34 18, 38 27 C42 34, 38 42, 33 46" fill="none" opacity="0.8" stroke="#ffffff" strokeWidth="1.5"></path>
              </g>

              {/* ISOMETRIC 3D DIGITAL LOCK (RIGHT PLATFORM) */}
              <g className="animate-cloud-badge" style={{ animationDelay: '-2s' }} transform="translate(460, 160)">
                <path d="M22,25 L22,14 C22,7 32,7 32,14 L32,25" fill="none" filter="url(#neonGlow)" stroke="#38bdf8" strokeLinecap="round" strokeWidth="4.5"></path>
                <polygon fill="#0284c7" points="27,24 45,34 27,45 9,35"></polygon>
                <polygon fill="#0369a1" points="9,35 27,45 27,62 9,52"></polygon>
                <polygon fill="#0ea5e9" points="27,45 45,34 45,51 27,62"></polygon>
                <circle cx="27" cy="48" fill="#ffffff" r="2.5"></circle>
                <line stroke="#ffffff" strokeWidth="2" x1="27" x2="27" y1="50" y2="55"></line>
              </g>

              {/* Location / Node Pin Pointer on Step */}
              <g transform="translate(345, 195)">
                <path d="M15,0 C6.7,0 0,6.7 0,15 C0,26.2 15,38 15,38 C15,38 30,26.2 30,15 C30,6.7 23.3,0 15,0 Z" fill="#0284c7" filter="url(#neonGlow)"></path>
                <circle cx="15" cy="14" fill="#ffffff" r="5"></circle>
                <ellipse cx="15" cy="42" fill="#00f0ff" filter="url(#neonGlow)" opacity="0.8" rx="6" ry="3"></ellipse>
              </g>

              {/* Light Animated Connection Circuit Rays */}
              <path className="animate-dash-flow" d="M200,285 L145,320 L180,340" opacity="0.75" stroke="#00f0ff" strokeWidth="1.8"></path>
              <path className="animate-dash-flow" d="M300,320 L300,390 L360,425" opacity="0.65" stroke="#38bdf8" strokeWidth="1.8"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
