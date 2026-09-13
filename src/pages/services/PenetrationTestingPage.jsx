import React from 'react';
import { Link } from 'react-router-dom';

const PenetrationTestingPage = () => {
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
          <span className="text-cyan-400">Penetration Testing</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            Services • Penetration Testing
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Penetration Testing
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Identify vulnerabilities that could allow unauthorized access or data exposure.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Request a Penetration Test →
            </Link>
          </div>
        </div>

        {/* 2. TARGET SCOPES (APIs, Network Infrastructure, Authentication) */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Core Vectors
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Assessment Vectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">Vector 01</div>
              <h3 className="text-lg font-bold text-white mb-2">APIs</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Test authentication, authorization, input handling and endpoint security.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">Vector 02</div>
              <h3 className="text-lg font-bold text-white mb-2">Network Infrastructure</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Assess externally and internally exposed services and infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">Vector 03</div>
              <h3 className="text-lg font-bold text-white mb-2">Authentication</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Evaluate authentication mechanisms and access controls.
              </p>
            </div>
          </div>
        </div>

        {/* 3. OUR METHODOLOGY */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Rigorous Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Methodology
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Reconnaissance',
                desc: 'Understand the target and attack surface.',
              },
              {
                step: '02',
                title: 'Enumeration',
                desc: 'Identify technologies, services and potential entry points.',
              },
              {
                step: '03',
                title: 'Security Testing',
                desc: 'Test identified weaknesses in a controlled environment.',
              },
              {
                step: '04',
                title: 'Validation',
                desc: 'Confirm whether vulnerabilities are practically exploitable.',
              },
              {
                step: '05',
                title: 'Impact Analysis',
                desc: 'Determine the potential business and technical impact.',
              },
              {
                step: '06',
                title: 'Reporting',
                desc: 'Provide actionable findings and remediation guidance.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                    Phase {item.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. IMPORTANT NOTE */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(8,24,45,0.7)] border-l-4 border-l-cyan-400 border border-[rgba(100,190,255,0.14)] backdrop-blur-md">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-1 tracking-wider">
            Important
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            All testing is performed within an <strong className="text-white font-bold">authorized scope</strong> defined with the client.
          </p>
        </div>

        {/* 5. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgba(10,32,60,0.85)] to-[rgba(7,20,45,0.9)] border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            See how an attacker could reach your systems.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Request a Penetration Test →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PenetrationTestingPage;
