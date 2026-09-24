import React from 'react';
import { Link } from 'react-router-dom';

const SecurityHardeningPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Services</span>
          <span>/</span>
          <span className="text-blue-400">Security Hardening</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Make your systems harder to compromise.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Security hardening reduces unnecessary exposure by strengthening configurations, access controls and security controls across your technology environment.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Strengthen your security foundation →
            </Link>
          </div>
        </div>

        {/* 2. HARDENING AREAS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Coverage Scope
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{area}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. WHAT WE DO */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Hardening Lifecycle
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    Stage {action.step}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{action.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. RESULT */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Deliverable Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Result
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-6 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-mono text-blue-400 font-bold block mb-2">PILLAR 01</span>
                <span className="text-lg font-semibold text-white">Less exposure</span>
              </div>
              <div className="p-6 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-mono text-blue-400 font-bold block mb-2">PILLAR 02</span>
                <span className="text-lg font-semibold text-white">Stronger configurations</span>
              </div>
              <div className="p-6 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-mono text-blue-400 font-bold block mb-2">PILLAR 03</span>
                <span className="text-lg font-semibold text-white">Better security posture</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Strengthen your security foundation.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
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
