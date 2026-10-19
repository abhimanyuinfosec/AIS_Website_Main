import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#080808] text-slate-900 dark:text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-gradient-to-r from-brand-crimson/10 to-brand-amber/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center py-10">
        {/* Coming Soon Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs font-mono font-semibold text-amber-800 dark:text-amber-300 tracking-wider uppercase mb-6">
          <Clock size={13} className="text-[#FF7A00]" />
          <span>Coming Soon</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-5">
          Security Products<br />
          <span className="ais-signature-gradient">Coming Soon</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-8 max-w-xl mx-auto">
          We are currently engineering proprietary cybersecurity products. Our software solutions will be available soon.
        </p>

        {/* Card for Active Services Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/10 shadow-xs mb-8">
          <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">
            Looking for cybersecurity protection today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Our full suite of security assessment, vulnerability management, and penetration testing services is fully active and protecting businesses right now.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/services/vulnerability-assessment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#8B0D18] active:scale-[0.98] transition shadow-xs"
            >
              <span>Explore Active Services</span>
              <ArrowRight size={13} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-[#151515] hover:bg-slate-200 dark:hover:bg-[#202020] border border-slate-200 dark:border-white/10 transition"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
