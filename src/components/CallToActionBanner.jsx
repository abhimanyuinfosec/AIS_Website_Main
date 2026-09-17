import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
);

const CallToActionBanner = () => {
  return (
    <section className="py-24 relative overflow-hidden" data-purpose="cta-banner" id="trial">
      <div className="max-w-5xl mx-auto px-6">
        <div data-anim="scale-up" className="relative rounded-3xl p-10 sm:p-16 glass-cta-panel text-center space-y-7 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-semibold uppercase tracking-widest text-cyan-300 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Start Today - No Hardware Required
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative z-10 leading-tight">
            Ready to shield your business<br className="hidden sm:block" /> in under 3 minutes?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto relative z-10 font-normal leading-relaxed">
            Experience absolute cyber peace of mind with zero hardware investments. Start your 14-day fully-featured trial today - no credit card required.
          </p>
          <div className="pt-1 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              className="btn-shimmer inline-flex items-center gap-2.5 px-9 py-4 text-sm font-bold tracking-wide text-white bg-gradient-to-r from-blue-600 via-brand-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/25 transition-all hover:scale-[1.03] active:scale-95"
              to="/contact"
            >
              Get Started Free
              <ArrowIcon />
            </Link>
            <Link
              className="glass-surface-interactive inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide text-slate-200 hover:text-white rounded-full transition-all border border-white/20 hover:border-cyan-400/50"
              to="/contact"
            >
              Talk to a Cyber Architect
            </Link>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 relative z-10">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><CheckIcon />14-day free trial</span>
            <span className="w-px h-3 bg-slate-700 hidden sm:block"></span>
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><CheckIcon />No credit card required</span>
            <span className="w-px h-3 bg-slate-700 hidden sm:block"></span>
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><CheckIcon />SOC2 Type II &amp; ISO 27001</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
