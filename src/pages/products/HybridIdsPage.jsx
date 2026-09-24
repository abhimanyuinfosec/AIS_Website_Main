import React from 'react';
import { Link } from 'react-router-dom';

const HybridIdsPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-blue-400">Hybrid IDS</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Intelligent network intrusion detection.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            A research-driven intrusion detection approach combining deep learning techniques to identify malicious network behavior.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Explore Hybrid IDS →
            </Link>
          </div>
        </div>

        {/* 2. FOCUS AREAS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Research & Detection Scope
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Focus Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Network traffic analysis',
                desc: 'Deep packet inspection and behavioral telemetry across high-throughput network streams.',
              },
              {
                title: 'Anomaly detection',
                desc: 'Statistical and machine-learned baseline deviation modeling for unknown threats.',
              },
              {
                title: 'Attack classification',
                desc: 'Precise multi-class neural categorization mapped directly to adversarial tactics.',
              },
              {
                title: 'Real-time detection',
                desc: 'Low-latency inline inference designed for mission-critical enterprise environments.',
              },
              {
                title: 'Intelligent threat analysis',
                desc: 'Contextual correlation and automated alert validation to eliminate false positives.',
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

        {/* 3. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Intelligent network intrusion detection powered by deep learning.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Explore Hybrid IDS →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HybridIdsPage;
