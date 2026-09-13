import React from 'react';

const ValuePropositionSection = () => {
  return (
    <section className="py-24 lg:py-32 relative" data-purpose="features-overview" id="product">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-cyan-400/30 text-xs font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md shadow-sm">
            Universal Solution
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Abhimanyu?
          </h2>
          <p className="text-slate-300 text-base font-normal">
            Abhimanyu is the first and only easy to use cloud firewall for distributed enterprises and remote teams.
          </p>
        </div>

        {/* 3 Feature Glass Cards Grid with Hover Sweeps & Specular Glows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Reliable Protection */}
          <div className="glass-feature-card rounded-2xl p-8 group" data-purpose="feature-card">
            <div className="flex items-center gap-4 mb-5">
              {/* Coral Shield Glow Icon with Glass Well */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/25 group-hover:shadow-rose-500/40 transition-shadow">
                <div className="w-full h-full bg-[#0a1026]/90 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-rose-400 filter drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                Reliable protection
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              We manage and isolate all untrusted network traffic, keeping your company experience smoothly protected without lag.
            </p>
          </div>

          {/* Card 2: Easy to set up */}
          <div className="glass-feature-card rounded-2xl p-8 group" data-purpose="feature-card">
            <div className="flex items-center gap-4 mb-5">
              {/* Electric Blue Gear/Cloud Glow Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-[#0a1026]/90 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-cyan-400 filter drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                Easy to set up
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your team's sensitive data is encrypted in transit and at rest immediately upon connecting — zero manual config.
            </p>
          </div>

          {/* Card 3: Virus & Threat Protection */}
          <div className="glass-feature-card rounded-2xl p-8 group" data-purpose="feature-card">
            <div className="flex items-center gap-4 mb-5">
              {/* Amber Threat Defense Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
                <div className="w-full h-full bg-[#0a1026]/90 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-amber-400 filter drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                Virus protection
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              All incoming and outbound web traffic is autonomously screened for malware, ransomware, and malicious spyware.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
