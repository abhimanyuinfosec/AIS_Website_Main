import React from 'react';
import { Link } from 'react-router-dom';

const OurMissionPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">About Us</span>
          <span>/</span>
          <span className="text-blue-400">Our Mission</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Making cybersecurity practical and accessible.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Our mission is to help organizations identify security weaknesses, reduce their attack surface and build stronger defenses without making cybersecurity unnecessarily complicated.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Build a stronger security foundation with us →
            </Link>
          </div>
        </div>

        {/* 2. OUR MISSION */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Core Purpose
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
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
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    Focus 0{idx + 1}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">{focus.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{focus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OUR VISION */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Looking Forward
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our Vision
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/60 border border-slate-800">
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight leading-snug">
              "A future where every organization can build, understand and maintain a stronger security posture."
            </blockquote>
          </div>
        </div>

        {/* 4. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Build a stronger security foundation with us.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
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
