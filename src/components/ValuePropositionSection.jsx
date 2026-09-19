import React from 'react';

const ValuePropositionSection = () => {
  return (
    <section className="py-10 lg:py-12 relative bg-[#05080D]" data-purpose="features-overview" id="product">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold uppercase tracking-widest text-slate-300">
            Universal Solution
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Abhimanyu?
          </h2>
          <p className="text-slate-400 text-base font-normal">
            Abhimanyu is the first and only easy to use cloud firewall for distributed enterprises and remote teams.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Reliable Protection */}
          <div className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 rounded-xl p-8 transition-colors duration-200" data-purpose="feature-card">
            <h3 className="text-xl font-bold text-white tracking-tight mb-3">
              Reliable Protection
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We manage and isolate all untrusted network traffic, keeping your company experience smoothly protected without lag.
            </p>
          </div>

          {/* Card 2: Easy to set up */}
          <div className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 rounded-xl p-8 transition-colors duration-200" data-purpose="feature-card">
            <h3 className="text-xl font-bold text-white tracking-tight mb-3">
              Easy to Set Up
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your team's sensitive data is encrypted in transit and at rest immediately upon connecting — zero manual config.
            </p>
          </div>

          {/* Card 3: Virus & Threat Protection */}
          <div className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 rounded-xl p-8 transition-colors duration-200" data-purpose="feature-card">
            <h3 className="text-xl font-bold text-white tracking-tight mb-3">
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
