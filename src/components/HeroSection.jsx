import React from 'react';
import { Link } from 'react-router-dom';
import NetworkTopologyVisualizer from './NetworkTopologyVisualizer';

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
            <span className="text-[11px] text-slate-300 font-medium">For SME's &amp; MSME's</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="space-y-2 text-white">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.1] abhimanyu-gradient-animated whitespace-normal lg:whitespace-nowrap">
              Abhimanyu InfoSec
            </span>
            <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-snug text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200">
              Cybersecurity built for businesses that cannot afford to be vulnerable.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed drop-shadow-sm">
            Abhimanyu InfoSec helps businesses identify vulnerabilities, detect threats, strengthen security, and build resilient digital infrastructure.
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
              EXPLORE
            </a>
          </div>
        </div>

        {/* Hero Cybersecurity Network Hops 3D Topology Visualization */}
        <div className="lg:col-span-6 relative flex justify-center items-center" data-purpose="hero-network-visual" data-depth="hero">
          <NetworkTopologyVisualizer />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint" aria-hidden="true">
        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-medium">Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-mouse-wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
