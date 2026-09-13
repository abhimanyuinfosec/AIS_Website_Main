import React from 'react';
import { Link } from 'react-router-dom';

const OurApproachPage = () => {
  return (
    <div className="min-h-screen bg-[#030611] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">About Us</span>
          <span>/</span>
          <span className="text-cyan-400">Our Approach</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            About Us • Methodology
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Security is not a one-time checklist.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Our approach focuses on understanding the environment, identifying meaningful risks and continuously improving security.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Start an Assessment →
            </Link>
          </div>
        </div>

        {/* 2. OUR SECURITY CYCLE */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Lifecycle Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Security Cycle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Understand',
                desc: 'Learn about your business, technology and security requirements.',
              },
              {
                num: '02',
                title: 'Discover',
                desc: 'Map assets, applications, infrastructure and attack surfaces.',
              },
              {
                num: '03',
                title: 'Assess',
                desc: 'Identify vulnerabilities, misconfigurations and security gaps.',
              },
              {
                num: '04',
                title: 'Prioritize',
                desc: 'Focus on risks that matter most to the organization.',
              },
              {
                num: '05',
                title: 'Remediate',
                desc: 'Provide practical recommendations to address identified weaknesses.',
              },
              {
                num: '06',
                title: 'Improve',
                desc: 'Reassess and continuously strengthen the security posture.',
              },
            ].map((cycle) => (
              <div
                key={cycle.num}
                className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                    Phase {cycle.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">{cycle.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{cycle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OUR PRINCIPLES */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Foundational Values
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Practical over complicated',
                desc: 'Security recommendations should be realistic to implement.',
              },
              {
                title: 'Risk over noise',
                desc: 'Not every finding deserves the same priority.',
              },
              {
                title: 'Evidence over assumptions',
                desc: 'Security findings should be validated wherever possible.',
              },
              {
                title: 'Continuous improvement',
                desc: 'Security evolves as technology and threats evolve.',
              },
            ].map((principle, idx) => (
              <div
                key={principle.title}
                className="p-7 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md"
              >
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                  Principle 0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 leading-snug">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgba(10,32,60,0.85)] to-[rgba(7,20,45,0.9)] border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Ready for a practical, outcome-driven security approach?
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Get in Touch →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurApproachPage;
