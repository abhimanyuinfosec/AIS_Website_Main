import React from 'react';
import { Link } from 'react-router-dom';

const WebSecurityPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Services</span>
          <span>/</span>
          <span className="text-blue-400">Web Security</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-5 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Secure your web applications from the inside out.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Modern applications expose sensitive data and business functionality. We identify weaknesses that attackers could use to compromise your application.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Secure My Application →
            </Link>
          </div>
        </div>

        {/* 2. WHAT WE TEST */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Application Vulnerability Vectors
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-slate-200">{item}</span>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. API SECURITY */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Deep Interface Protection
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800"
              >
                <div className="text-blue-400 font-mono text-xs mb-2 select-none">•</div>
                <h3 className="text-sm font-semibold text-white mb-1">{item}</h3>
                <p className="text-xs text-slate-400">Targeted audit and rigorous security verification.</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TESTING APPROACH */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Execution Lifecycle
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Testing Approach
            </h2>
          </div>

          {/* Workflow Sequence Cards */}
          <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base font-mono font-medium text-slate-200">
              <span className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">Discover</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">Map</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">Test</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">Validate</span>
              <span className="text-slate-600 font-sans">→</span>
              <span className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">Report</span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl pt-2">
              We combine automated security testing with manual validation to reduce false positives and identify application-specific vulnerabilities.
            </p>
          </div>
        </div>

        {/* 5. WHAT YOU RECEIVE */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Deliverables & Support
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-slate-200">{item}</span>
                <span className="text-xs font-mono text-blue-400 font-bold">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Build security into your application before attackers find the gaps.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
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
