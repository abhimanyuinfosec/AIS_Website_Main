import React from 'react';
import { Link } from 'react-router-dom';

const WhyAisPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">About Us</span>
          <span>/</span>
          <span className="text-blue-400">Why AIS</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider uppercase font-medium">
            Abhimanyu AIS • Innovation
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Intelligence-driven cybersecurity for the next generation of threats.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Abhimanyu AIS represents our focus on combining cybersecurity with artificial intelligence to improve detection, analysis and security automation.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Explore our security innovation →
            </Link>
          </div>
        </div>

        {/* 2. AREAS OF FOCUS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Next-Gen Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Areas of Focus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'AI-Assisted Security Analysis',
                desc: 'Use intelligent systems to analyze security data and identify meaningful patterns.',
              },
              {
                title: 'Threat Detection',
                desc: 'Improve the ability to identify suspicious behavior across large volumes of security data.',
              },
              {
                title: 'Security Automation',
                desc: 'Reduce repetitive security operations through intelligent workflows.',
              },
              {
                title: 'Predictive Security',
                desc: 'Explore how security data can be used to anticipate potential threats.',
              },
            ].map((focus, idx) => (
              <div
                key={focus.title}
                className="p-7 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    Focus 0{idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2.5 leading-snug">
                    {focus.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {focus.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OUR RESEARCH DIRECTION */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              R&D Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our Research Direction
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Intrusion detection',
              'Threat intelligence',
              'Attack forecasting',
              'Automated security assessment',
              'Security analytics',
              'AI-assisted SOC operations',
            ].map((research, idx) => (
              <div
                key={research}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    Track 0{idx + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{research}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Partner with us on AI-driven cyber defense research and operations.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Explore our security innovation →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhyAisPage;
