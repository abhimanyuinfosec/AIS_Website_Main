import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionBanner = () => {
  return (
    <section className="py-10 lg:py-12 relative overflow-hidden bg-[#05080D]" data-purpose="cta-banner" id="trial">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-2xl p-8 sm:p-10 bg-slate-900/40 border border-slate-800 text-center space-y-5 overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold uppercase tracking-widest text-slate-300 relative z-10">
            Start Today · No Hardware Required
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative z-10 leading-tight">
            Ready to shield your business<br className="hidden sm:block" /> in under 3 minutes?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto relative z-10 font-normal leading-relaxed">
            Experience absolute cyber peace of mind with zero hardware investments. Start your 14-day fully-featured trial today — no credit card required.
          </p>
          <div className="pt-1 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-normal text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm border border-blue-500/30 transition-colors"
              to="/contact"
            >
              Get Started Free
            </Link>
            <Link
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-normal text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
              to="/contact"
            >
              Talk to a Security Architect
            </Link>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 relative z-10 text-xs text-slate-400">
            <span>14-day free trial</span>
            <span className="text-slate-700 hidden sm:block">|</span>
            <span>No credit card required</span>
            <span className="text-slate-700 hidden sm:block">|</span>
            <span>SOC2 Type II &amp; ISO 27001</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
