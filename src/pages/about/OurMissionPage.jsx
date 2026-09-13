import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const OurMissionPage = () => {
  return (
    <div className="min-h-screen bg-[#030611] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">About Us</span>
          <span>/</span>
          <span className="text-cyan-400">Our Mission</span>
        </div>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider uppercase">
          <Shield size={13} />
          About Us • Our Mission
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Our Mission
        </h1>

        {/* Description Placeholder */}
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-10">
          Comprehensive architecture and operational specifications for Our Mission. Content for this page will be configured soon.
        </p>

        {/* Clean Empty Content Container Ready For Content */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[rgba(8,24,45,0.45)] border border-[rgba(100,190,255,0.14)] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-10 min-h-[260px] flex flex-col items-center justify-center text-center border-dashed">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
            <Shield size={20} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Our Mission Content Shell</h3>
          <p className="text-xs text-slate-400 max-w-md">
            This module is structured and ready for upcoming content, architecture diagrams, and service details.
          </p>
        </div>

        {/* Return Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurMissionPage;
