import React from 'react';
import { Link } from 'react-router-dom';

const OurMissionPage = () => {
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
          <span className="text-cyan-400">Our Mission</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            About Us • Our Mission
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Making cybersecurity practical and accessible.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Our mission is to help organizations identify security weaknesses, reduce their attack surface and build stronger defenses without making cybersecurity unnecessarily complicated.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Build a stronger security foundation with us →
            </Link>
          </div>
        </div>

        {/* 2. OUR MISSION */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Core Purpose
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Mission
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              At Abhimanyu InfoSec, we aim to bridge the gap between complex cybersecurity technology and the organizations that need it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Practical security',
                desc: 'Defensive implementations tailored to operational reality, not just theoretical checklists.',
              },
              {
                title: 'Continuous improvement',
                desc: 'Adaptive defense postures that iterate and evolve against shifting threat dynamics.',
              },
              {
                title: 'Actionable findings',
                desc: 'Clear, prioritized remediation guidance that engineering teams can execute immediately.',
              },
              {
                title: 'Accessible cybersecurity',
                desc: 'Demystifying complex security telemetry so leadership and developers can make informed decisions.',
              },
              {
                title: 'Security-driven innovation',
                desc: 'Pioneering intelligent automation and machine learning to stay ahead of modern adversaries.',
              },
            ].map((focus, idx) => (
              <div
                key={focus.title}
                className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                    Focus 0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{focus.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{focus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OUR VISION */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Looking Forward
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Vision
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[rgba(8,24,45,0.55)] border border-cyan-400/25 backdrop-blur-xl">
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
              "A future where every organization can build, understand and maintain a stronger security posture."
            </blockquote>
          </div>
        </div>

        {/* 4. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgba(10,32,60,0.85)] to-[rgba(7,20,45,0.9)] border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Build a stronger security foundation with us.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Build a stronger security foundation with us →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurMissionPage;
