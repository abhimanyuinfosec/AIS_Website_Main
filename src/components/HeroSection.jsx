import React from 'react';
import { Link } from 'react-router-dom';
import WireframeSphere from './WireframeSphere';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen -mt-20 md:-mt-24 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 flex flex-col justify-center items-center overflow-hidden" data-purpose="hero-section">
      {/* 3D Wireframe Sphere Background with Ambient Radial Glow spanning full screen */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Subtle, refined ambient dark vignette behind sphere */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255, 60, 30, 0.05) 0%, rgba(200, 50, 20, 0.02) 40%, rgba(0, 0, 0, 0.75) 75%, #000000 100%)',
          }}
        />
        {/* Refined, professional parameters: delicate hairline network, luminous light nodes */}
        <WireframeSphere
          radius={5.2}
          wireframeOpacity={0.1}
          nodeSize={0.30}
          nodeOpacity={0.5}
          rotationSpeed={0.35}
          mouseStrength={0.0}
          depthFade={0.82}
          nodeCount={920}
          enableScrollDisruption={true}
          disruptionStrength={1.0}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-5 sm:space-y-6 relative z-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
        {/* Main Brand Heading */}
        <h1 className="hero-title font-bold tracking-[-0.035em] leading-[1.08] max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-100 to-white">
          Abhimanyu InfoSec
        </h1>

        {/* Core Subtitle */}
        <h2 className="hero-subtitle font-semibold tracking-[-0.025em] max-w-3xl">
          <span className="block text-slate-100 drop-shadow-sm">
            Cybersecurity built for businesses that
          </span>
          <span className="inline-block mt-2 px-3 py-0.5 sm:py-1 bg-[#38bdf8] text-[#030611] font-bold rounded-sm shadow-md">
            cannot afford to be vulnerable.
          </span>
        </h2>

        {/* Description Body */}
        <p className="hero-body text-slate-300/90 font-normal leading-relaxed max-w-2xl text-shadow-sm">
          We help you identify vulnerabilities, detect threats, harden your security posture, and build resilient digital infrastructure without enterprise complexity or cost.
        </p>

        {/* Enterprise CTAs */}
        <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm border border-blue-500/30 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span>Get Free Assessment</span>
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span>See How It Works</span>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-slate-400 font-medium">
          <span>350+ Clients Protected</span>
          <span className="hidden sm:block text-slate-700">|</span>
          <span>SOC2 &amp; ISO 27001</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
