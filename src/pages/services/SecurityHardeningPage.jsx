import React from 'react';
import { Link } from 'react-router-dom';

const SecurityHardeningPage = () => {
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
          <span className="text-cyan-400">Security Hardening</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            Services • Security Hardening
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Make your systems harder to compromise.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Security hardening reduces unnecessary exposure by strengthening configurations, access controls and security controls across your technology environment.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Strengthen your security foundation →
            </Link>
          </div>
        </div>

        {/* 2. HARDENING AREAS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Coverage Scope
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hardening Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Operating systems',
              'Servers',
              'Network devices',
              'Web servers',
              'Applications',
              'Cloud environments',
              'User access',
              'Security configurations',
            ].map((area, idx) => (
              <div
                key={area}
                className="p-5 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{area}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. WHAT WE DO */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Hardening Lifecycle
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Identify Weak Configurations',
                desc: 'Find insecure or unnecessary settings.',
              },
              {
                step: '02',
                title: 'Reduce Attack Surface',
                desc: 'Disable unnecessary services and access points.',
              },
              {
                step: '03',
                title: 'Strengthen Access',
                desc: 'Improve authentication and privilege management.',
              },
              {
                step: '04',
                title: 'Apply Security Controls',
                desc: 'Implement practical security controls appropriate to your environment.',
              },
              {
                step: '05',
                title: 'Validate',
                desc: 'Verify that security improvements are working as intended.',
              },
            ].map((action) => (
              <div
                key={action.step}
                className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                    Stage {action.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{action.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. RESULT */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Deliverable Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Result
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-2">PILLAR 01</span>
                <span className="text-lg font-bold text-white">Less exposure</span>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-2">PILLAR 02</span>
                <span className="text-lg font-bold text-white">Stronger configurations</span>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-2">PILLAR 03</span>
                <span className="text-lg font-bold text-white">Better security posture</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgba(10,32,60,0.85)] to-[rgba(7,20,45,0.9)] border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Strengthen your security foundation.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Strengthen your security foundation →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SecurityHardeningPage;
