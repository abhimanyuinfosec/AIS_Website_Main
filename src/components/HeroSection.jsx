import React from 'react';
import { Link } from 'react-router-dom';
import NetworkTopologyVisualizer from './NetworkTopologyVisualizer';

const HeroSection = () => {
  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden" data-purpose="hero-section">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">Next-Gen Cyber Defense</span>
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <span className="text-[11px] text-slate-300 font-medium">For SMEs &amp; MSMEs</span>
          </div>
          <h1 className="space-y-2 text-white">
            <span className="block text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold font-display tracking-tight leading-[1.08] abhimanyu-gradient-animated">
              Abhimanyu InfoSec
            </span>
            <span className="block text-xl sm:text-2xl lg:text-[1.45rem] font-semibold tracking-tight leading-snug text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200">
              Cybersecurity built for businesses that cannot afford to be vulnerable.
            </span>
          </h1>
          <p className="text-[1.025rem] text-slate-400 max-w-lg font-normal leading-relaxed">
            We help you identify vulnerabilities, detect threats, harden your security posture, and build resilient digital infrastructure without enterprise complexity or cost.
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-4">
            <Link
              className="btn-shimmer inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold tracking-wide text-white bg-gradient-to-r from-blue-600 via-brand-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              to="/contact"
            >
              Get Free Assessment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <a
              className="glass-surface-interactive inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide text-slate-200 hover:text-white rounded-full transition-all border border-white/15 hover:border-cyan-400/40"
              href="#how-it-works"
            >
              See How It Works
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]"></span>
              <span className="text-xs text-slate-400 font-medium">350+ Clients Protected</span>
            </div>
            <span className="hidden sm:block w-px h-3.5 bg-slate-700/80"></span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,240,255,0.9)]"></span>
              <span className="text-xs text-slate-400 font-medium">SOC2 &amp; ISO 27001</span>
            </div>
            <span className="hidden sm:block w-px h-3.5 bg-slate-700/80"></span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.9)]"></span>
              <span className="text-xs text-slate-400 font-medium">&lt;1.2ms Latency SLA</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 relative flex justify-center items-center" data-purpose="hero-network-visual" data-depth="hero">
          <NetworkTopologyVisualizer />
        </div>
      </div>
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
