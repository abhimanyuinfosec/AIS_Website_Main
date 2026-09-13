import React from 'react';
import { Link } from 'react-router-dom';

const NetworkSecurityPage = () => {
  return (
    <div className="min-h-screen bg-[#030611] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Services</span>
          <span>/</span>
          <span className="text-cyan-400">Network Security</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-5 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            Services • Network Security
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Know what is exposed across your network.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            We assess network infrastructure to identify exposed services, weak configurations and security weaknesses that could increase your attack surface.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Assess My Network →
            </Link>
          </div>
        </div>

        {/* 2. WHAT WE ASSESS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Perimeter & Internal Audit Scope
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What We Assess
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Open ports and services',
              'Network exposure',
              'Firewall configurations',
              'Service versions',
              'Authentication mechanisms',
              'Remote access services',
              'Network segmentation',
              'Configuration weaknesses',
            ].map((item, index) => (
              <div
                key={item}
                className="p-5 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                    0{index + 1}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{item}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Granular discovery and verification across network layers.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ASSESSMENT PROCESS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Step-by-Step Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Assessment Process
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-1">Step 01</div>
              <h3 className="text-base font-bold text-white mb-2">Asset Discovery</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Identify systems, services and externally exposed infrastructure.
              </p>
            </div>

            <div className="text-center text-cyan-400 font-mono text-lg select-none">↓</div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-1">Step 02</div>
              <h3 className="text-base font-bold text-white mb-2">Service Enumeration</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Understand what is running and where potential weaknesses exist.
              </p>
            </div>

            <div className="text-center text-cyan-400 font-mono text-lg select-none">↓</div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-1">Step 03</div>
              <h3 className="text-base font-bold text-white mb-2">Security Assessment</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Analyze configurations and vulnerabilities.
              </p>
            </div>

            <div className="text-center text-cyan-400 font-mono text-lg select-none">↓</div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-1">Step 04</div>
              <h3 className="text-base font-bold text-white mb-2">Risk Prioritization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Determine which weaknesses require immediate attention.
              </p>
            </div>

            <div className="text-center text-cyan-400 font-mono text-lg select-none">↓</div>

            {/* Step 5 */}
            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-1">Step 05</div>
              <h3 className="text-base font-bold text-white mb-2">Remediation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Provide practical steps to reduce the attack surface.
              </p>
            </div>
          </div>
        </div>

        {/* 4. OUTCOME */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Clarity & Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Outcome
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              You get a clearer understanding of:
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex-1 p-4 rounded-xl bg-slate-900/60 border border-slate-800 w-full">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">01. VISIBILITY</span>
                <span className="text-base sm:text-lg font-bold text-white">What is exposed</span>
              </div>
              <span className="text-slate-500 font-mono text-xl select-none hidden sm:inline">→</span>
              <div className="flex-1 p-4 rounded-xl bg-slate-900/60 border border-slate-800 w-full">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">02. SEVERITY</span>
                <span className="text-base sm:text-lg font-bold text-white">Why it matters</span>
              </div>
              <span className="text-slate-500 font-mono text-xl select-none hidden sm:inline">→</span>
              <div className="flex-1 p-4 rounded-xl bg-slate-900/60 border border-slate-800 w-full">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">03. RESOLUTION</span>
                <span className="text-base sm:text-lg font-bold text-white">How to fix it</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgba(10,32,60,0.85)] to-[rgba(7,20,45,0.9)] border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Reduce your attack surface.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Assess My Network →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkSecurityPage;
