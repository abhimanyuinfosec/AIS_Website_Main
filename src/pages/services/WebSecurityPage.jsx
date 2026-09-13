import React from 'react';
import { Link } from 'react-router-dom';

const WebSecurityPage = () => {
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
          <span className="text-cyan-400">Web Security</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-5 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            Services • Web Security
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Secure your web applications from the inside out.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Modern applications expose sensitive data and business functionality. We identify weaknesses that attackers could use to compromise your application.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Secure My Application →
            </Link>
          </div>
        </div>

        {/* 2. WHAT WE TEST */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Application Vulnerability Vectors
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What We Test
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Authentication & authorization',
              'Access control',
              'Session management',
              'Input validation',
              'Injection vulnerabilities',
              'API security',
              'Security misconfigurations',
              'Sensitive data exposure',
              'Business logic vulnerabilities',
              'OWASP Top 10 risks',
            ].map((item, index) => (
              <div
                key={item}
                className="p-5 rounded-xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex items-center justify-between"
              >
                <span className="text-sm font-semibold text-slate-200">{item}</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. API SECURITY */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Deep Interface Protection
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              API Security
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Modern applications depend heavily on APIs. We assess:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Authentication mechanisms',
              'Authorization controls',
              'API endpoints',
              'Token handling',
              'Rate limiting',
              'Input validation',
              'Data exposure',
              'API misconfigurations',
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md"
              >
                <div className="text-cyan-400 font-mono text-xs mb-2 select-none">•</div>
                <h3 className="text-sm font-bold text-white mb-1">{item}</h3>
                <p className="text-xs text-slate-400">Targeted audit and rigorous security verification.</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TESTING APPROACH */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Execution Lifecycle
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Testing Approach
            </h2>
          </div>

          {/* Workflow Sequence Cards */}
          <div className="p-8 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base font-mono font-bold text-cyan-300">
              <span className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-400/30">Discover</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-400/30">Map</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-400/30">Test</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-400/30">Validate</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-400/30">Report</span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl pt-2">
              We combine automated security testing with manual validation to reduce false positives and identify application-specific vulnerabilities.
            </p>
          </div>
        </div>

        {/* 5. WHAT YOU RECEIVE */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Deliverables & Support
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What You Receive
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Detailed findings',
              'Severity ratings',
              'Proof/evidence',
              'Affected endpoints',
              'Attack scenarios',
              'Remediation recommendations',
              'Retesting support',
            ].map((item, index) => (
              <div
                key={item}
                className="p-5 rounded-xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex items-center justify-between"
              >
                <span className="text-sm font-semibold text-slate-200">{item}</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgba(10,32,60,0.85)] to-[rgba(7,20,45,0.9)] border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Build security into your application before attackers find the gaps.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Secure My Application →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WebSecurityPage;
