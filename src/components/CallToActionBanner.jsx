import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionBanner = () => {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden bg-black" data-purpose="cta-banner" id="contact-banner">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-2xl p-8 sm:p-12 bg-[#0D0D0D] border border-[#C1121F]/30 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(193,18,31,0.14),transparent_70%)] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#151515] border border-[#C1121F]/30 text-xs font-heading font-semibold uppercase tracking-widest text-[#FFB000] relative z-10">
            Enterprise Security Consultation
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight relative z-10 leading-tight">
            Ready to strengthen your enterprise <span className="ais-signature-gradient">cyber defense?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto relative z-10 font-normal leading-relaxed">
            Consult with Abhimanyu InfoSec security architects to evaluate your attack surface, remediate critical risks, and build an uncompromising zero-trust posture.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:opacity-95 active:scale-[0.98] rounded-lg shadow-lg shadow-[#C1121F]/20 border border-white/10 transition-all"
              to="/contact"
            >
              Schedule Security Scoping
            </Link>
            <Link
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#151515] rounded-lg border border-[#C1121F]/30 hover:border-[#FF7A00]/50 transition-all"
              to="/about/approach"
            >
              Learn Our Methodology
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
