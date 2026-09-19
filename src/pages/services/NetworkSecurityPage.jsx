import React from 'react';
import { Link } from 'react-router-dom';

const NetworkSecurityPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Services</span>
          <span>/</span>
          <span className="text-blue-400">Network Security</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-5 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider uppercase font-medium">
            Services • Network Security
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Know what is exposed across your network.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            We assess network infrastructure to identify exposed services, weak configurations and security weaknesses that could increase your attack surface.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Assess My Network →
            </Link>
          </div>
        </div>

        {/* 2. WHAT WE ASSESS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Perimeter & Internal Audit Scope
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    0{index + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">{item}</h3>
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
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Step-by-Step Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Assessment Process
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl">
            {[
              { step: '01', title: 'Asset Discovery', desc: 'Identify systems, services and externally exposed infrastructure.' },
              { step: '02', title: 'Service Enumeration', desc: 'Understand what is running and where potential weaknesses exist.' },
              { step: '03', title: 'Security Assessment', desc: 'Analyze configurations and vulnerabilities.' },
              { step: '04', title: 'Risk Prioritization', desc: 'Determine which weaknesses require immediate attention.' },
              { step: '05', title: 'Remediation', desc: 'Provide practical steps to reduce the attack surface.' },
            ].map((p, idx, arr) => (
              <React.Fragment key={p.step}>
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-1">Step {p.step}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div className="text-center text-slate-500 font-mono text-lg select-none">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4. OUTCOME */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Clarity & Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Outcome
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              You get a clearer understanding of:
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex-1 p-4 rounded-lg bg-slate-800/80 border border-slate-700 w-full">
                <span className="text-xs font-mono text-blue-400 font-bold block mb-1">01. VISIBILITY</span>
                <span className="text-base sm:text-lg font-semibold text-white">What is exposed</span>
              </div>
              <span className="text-slate-500 font-mono text-xl select-none hidden sm:inline">→</span>
              <div className="flex-1 p-4 rounded-lg bg-slate-800/80 border border-slate-700 w-full">
                <span className="text-xs font-mono text-blue-400 font-bold block mb-1">02. SEVERITY</span>
                <span className="text-base sm:text-lg font-semibold text-white">Why it matters</span>
              </div>
              <span className="text-slate-500 font-mono text-xl select-none hidden sm:inline">→</span>
              <div className="flex-1 p-4 rounded-lg bg-slate-800/80 border border-slate-700 w-full">
                <span className="text-xs font-mono text-blue-400 font-bold block mb-1">03. RESOLUTION</span>
                <span className="text-base sm:text-lg font-semibold text-white">How to fix it</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Reduce your attack surface.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
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
