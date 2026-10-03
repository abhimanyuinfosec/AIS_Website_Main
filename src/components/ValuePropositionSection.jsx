import React from 'react';

const ValuePropositionSection = () => {
  return (
    <section className="py-10 lg:py-12 relative bg-black" data-purpose="features-overview" id="product">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Why <span className="ais-signature-gradient">Abhimanyu InfoSec?</span>
          </h2>
          <p className="text-slate-400 text-base font-normal">
            Abhimanyu InfoSec provides enterprise-grade cyber defense and proactive security architectures for distributed teams.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Reliable Protection */}
          <div className="bg-[#0D0D0D] border border-white/[0.08] hover:border-[#C1121F]/40 hover:shadow-lg hover:shadow-[#C1121F]/10 rounded-xl p-8 transition-all duration-300" data-purpose="feature-card">
            <h3 className="text-xl font-heading font-bold text-white tracking-tight mb-3">
              Reliable Protection
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We manage and isolate all untrusted network traffic, keeping your company experience smoothly protected without lag.
            </p>
          </div>

          {/* Card 2: Easy to set up */}
          <div className="bg-[#0D0D0D] border border-white/[0.08] hover:border-[#C1121F]/40 hover:shadow-lg hover:shadow-[#C1121F]/10 rounded-xl p-8 transition-all duration-300" data-purpose="feature-card">
            <h3 className="text-xl font-heading font-bold text-white tracking-tight mb-3">
              Easy to Set Up
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your team's sensitive data is encrypted in transit and at rest immediately upon connecting with zero manual configuration.
            </p>
          </div>

          {/* Card 3: Virus & Threat Protection */}
          <div className="bg-[#0D0D0D] border border-white/[0.08] hover:border-[#C1121F]/40 hover:shadow-lg hover:shadow-[#C1121F]/10 rounded-xl p-8 transition-all duration-300" data-purpose="feature-card">
            <h3 className="text-xl font-heading font-bold text-white tracking-tight mb-3">
              Threat Protection
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              All incoming and outbound web traffic is autonomously screened for malware, ransomware, and malicious spyware.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
