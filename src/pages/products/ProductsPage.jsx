import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Clock, ArrowRight, Lock, Terminal, Cpu } from 'lucide-react';

export const ProductsPage = () => {
  const upcomingProducts = [
    {
      title: 'Hybrid IDS Engine',
      tagline: 'Autonomous Intrusion Detection & Deep Packet Inspection',
      icon: Terminal,
      stage: 'Engineering Phase',
      description:
        'Next-generation inline packet filtering and machine intelligence model that detects lateral movement and protocol anomalies with zero latency impact.',
    },
    {
      title: 'AutoRed APT',
      tagline: 'Autonomous Breach & Adversary Emulation Framework',
      icon: Cpu,
      stage: 'Architecture Lab',
      description:
        'Continuous offensive simulation engine chaining real-world exploit graphs to identify privilege escalation paths before external adversaries.',
    },
    {
      title: 'IP Threat Intelligence',
      tagline: 'Global Distributed Telemetry & Anomaly Signal Aggregation',
      icon: Shield,
      stage: 'Data Modeling',
      description:
        'Sub-millisecond IP reputation and malicious actor correlation powered by high-throughput edge telemetry clusters.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#080808] text-slate-900 dark:text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-crimson/10 to-brand-amber/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 pt-4">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-xs font-mono font-medium text-brand-crimson tracking-wider uppercase">
            <Clock size={12} className="text-[#FF7A00]" />
            <span>Research &amp; Product Labs · Coming Soon</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Proprietary Defense Tools<br />
            <span className="ais-signature-gradient">Under Active Development</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            We are engineering purpose-built cybersecurity products designed to redefine enterprise cloud defense, telemetry, and automated penetration testing. Commercial rollout is currently being planned.
          </p>
        </div>

        {/* 3 Staging Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {upcomingProducts.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.title}
                className="bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/10 rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-brand-crimson">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 font-semibold tracking-wide">
                      {prod.stage}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-1.5">
                    {prod.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-crimson mb-3 font-mono">
                    {prod.tagline}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1.5">
                    <Lock size={12} className="text-slate-400" />
                    <span>Pilot Program Access</span>
                  </span>
                  <span className="text-slate-400 font-mono">2026 Roadmap</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation Call to Action */}
        <div className="text-center bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/10 rounded-2xl p-8 sm:p-10 shadow-sm max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono text-brand-crimson font-semibold">
            <Sparkles size={14} className="text-[#FF7A00]" />
            <span>EARLY PILOT &amp; ARCHITECTURAL REVIEW</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white mb-3">
            Interested in piloting or shaping our defense software?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
            We partner with select enterprise security teams to pilot new modules and integrate real-world adversary telemetry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:brightness-110 shadow-sm transition"
            >
              <span>Speak with Our Lab Architects</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-[#151515] hover:bg-slate-200 dark:hover:bg-[#202020] border border-slate-200 dark:border-white/10 transition"
            >
              <span>Explore Active Services</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
