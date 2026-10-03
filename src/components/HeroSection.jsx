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
          className="hero-ambient-vignette absolute inset-0 z-0 pointer-events-none transition-all duration-300"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(193, 18, 31, 0.08) 0%, rgba(255, 122, 0, 0.03) 35%, rgba(0, 0, 0, 0.75) 75%, #000000 100%)',
          }}
        />
        {/* Refined, professional parameters: delicate hairline network, luminous light nodes */}
        <WireframeSphere
          radius={5.2}
          wireframeOpacity={0.12}
          nodeSize={0.30}
          nodeOpacity={0.55}
          rotationSpeed={0.35}
          mouseStrength={0.0}
          depthFade={0.82}
          nodeCount={920}
          enableScrollDisruption={true}
          disruptionStrength={1.0}
        />
      </div>

      <div className="hero-content-container max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-5 sm:space-y-6 relative z-10 dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
        {/* Main Brand Heading in one line with only AIS capital - padding added so 'Y' is completely visible */}
        <h1 className="hero-title font-heading font-bold tracking-tight leading-[1.25] max-w-full whitespace-nowrap ais-signature-gradient dark:drop-shadow-sm select-none px-4 py-2 pb-3 overflow-visible inline-block">
          Abhimanyu InfoSec
        </h1>

        {/* Core Subtitle - background rectangle box removed, keeping text color */}
        <h2 className="hero-subtitle font-semibold tracking-[-0.025em] max-w-3xl">
          <span className="block text-slate-900 dark:text-slate-100">
            Cybersecurity built for businesses that
          </span>
          <span className="fire-yellow-text inline-block mt-2 font-bold text-[#D97706] dark:text-[#FFB703]">
            cannot afford to be vulnerable.
          </span>
        </h2>

        {/* Description Body - original text copy */}
        <p className="hero-body text-slate-600 dark:text-slate-300/90 font-normal leading-relaxed max-w-2xl">
          We help you identify vulnerabilities, detect threats, harden your security posture, and build resilient digital infrastructure without enterprise complexity or cost.
        </p>

        {/* Enterprise CTAs */}
        <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:brightness-110 active:scale-[0.98] rounded-lg shadow-sm border border-white/20 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span>Get Free Assessment</span>
          </Link>
          <a
            href="#how-it-works"
            className="hero-secondary-btn w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-300 hover:text-[#C1121F] dark:hover:text-white bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-[#C1121F] dark:hover:border-slate-600 shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <span className="hero-secondary-text">See How It Works</span>
          </a>
        </div>

        {/* Trust Indicators - original text copy & style */}
        <div className="hero-trust-bar flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
