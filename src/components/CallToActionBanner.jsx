import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionBanner = () => {
  return (
    <section className="py-24 relative overflow-hidden" data-purpose="cta-banner" id="trial">
      <div className="max-w-5xl mx-auto px-6">
        <div data-anim="scale-up" className="relative rounded-3xl p-10 sm:p-16 glass-cta-panel text-center space-y-6 overflow-hidden">
          {/* Subtle Deep Blue / Cyan Ambient Aura Spots behind Banner */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative z-10">
            Ready to shield your enterprise in under 3 minutes?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto relative z-10 font-normal">
            Experience absolute cyber peace of mind with zero hardware investments. Start your 14-day fully-featured trial today.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-5 relative z-10">
            <Link 
              className="btn-shimmer px-8 py-4 text-sm font-bold tracking-wide text-white bg-gradient-to-r from-blue-600 via-brand-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/25 transition-all hover:scale-105 active:scale-95" 
              to="/contact"
            >
              GET STARTED FREE
            </Link>
            <Link 
              className="glass-surface-interactive px-8 py-4 text-sm font-semibold tracking-wide text-slate-200 hover:text-white rounded-full transition-all border border-white/15 hover:border-cyan-400/40" 
              to="/contact"
            >
              TALK TO CYBER ARCHITECT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
