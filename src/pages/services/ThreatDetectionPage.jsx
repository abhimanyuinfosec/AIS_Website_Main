import React from 'react';
import { Link } from 'react-router-dom';

const ThreatDetectionPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Services</span>
          <span>/</span>
          <span className="text-blue-400">Threat Detection</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider uppercase font-medium">
            Services • Threat Detection
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Detect threats before they become incidents.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Prevention alone is not enough. Threat detection helps organizations identify suspicious activity and respond before an attack causes significant damage.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Explore Threat Detection →
            </Link>
          </div>
        </div>

        {/* 2. WHAT WE FOCUS ON */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Behavioral & Indicator Analysis
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What We Focus On
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              'Suspicious network activity',
              'Authentication anomalies',
              'Malicious connections',
              'Unusual system behavior',
              'Indicators of compromise',
              'Potential data exfiltration',
              'Known attack patterns',
            ].map((focusItem, idx) => (
              <div
                key={focusItem}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{focusItem}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. DETECTION WORKFLOW */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              End-to-End Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Detection Workflow
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
              {[
                { step: '01', title: 'Collect' },
                { step: '02', title: 'Analyze' },
                { step: '03', title: 'Detect' },
                { step: '04', title: 'Investigate' },
                { step: '05', title: 'Respond' },
              ].map((stage, i, arr) => (
                <React.Fragment key={stage.title}>
                  <div className="flex-1 p-4 rounded-lg bg-slate-800/80 border border-slate-700 w-full">
                    <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1">
                      PHASE {stage.step}
                    </span>
                    <span className="text-base font-semibold text-white">{stage.title}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-slate-500 font-mono text-lg select-none hidden md:inline">
                      →
                    </span>
                  )}
                  {i < arr.length - 1 && (
                    <span className="text-slate-500 font-mono text-sm select-none md:hidden">
                      ↓
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 4. SECURITY MONITORING */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Visibility Vectors
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Security Monitoring
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              We can help organizations establish visibility across:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Network activity',
              'Endpoints',
              'Applications',
              'Authentication events',
              'Security logs',
            ].map((item, idx) => (
              <div
                key={item}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800"
              >
                <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                  Vector 0{idx + 1}
                </div>
                <h3 className="text-sm font-semibold text-white">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* 5. WHY DETECTION MATTERS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Strategic Value
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Detection Matters
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              Attackers may bypass preventive controls. Effective detection helps answer:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                q: 'What happened?',
                sub: 'Reconstruct root cause and event origin.',
              },
              {
                q: 'When did it happen?',
                sub: 'Establish precise timeline and dwell time.',
              },
              {
                q: 'Which systems were affected?',
                sub: 'Trace lateral movement and blast radius.',
              },
              {
                q: 'What should we do next?',
                sub: 'Execute decisive containment and eradication.',
              },
            ].map((card, idx) => (
              <div
                key={card.q}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800"
              >
                <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                  Query 0{idx + 1}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{card.q}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Turn security events into actionable intelligence.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Explore Threat Detection →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThreatDetectionPage;
