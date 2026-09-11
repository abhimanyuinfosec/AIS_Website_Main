import React from 'react';

const DetailedProtectionGrid = () => {
  return (
    <section className="py-24 bg-[#030611] relative" data-purpose="security-matrix">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">Maximum Assurance</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How Abhimanyu can protect my data?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Matrix Item 1 */}
          <div className="glass-surface glass-surface-interactive p-6 rounded-2xl group">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-400/30 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(251,146,60,0.2)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">Secure end to end data encryption</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Military-grade AES-256 and ChaCha20 protocols secure data being transmitted without your intervention.
            </p>
          </div>

          {/* Matrix Item 2 */}
          <div className="glass-surface glass-surface-interactive p-6 rounded-2xl group">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">Data protection at rest and in transit</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Zero persistent disk footprint. Ephemeral encryption keys ensure no logs exist to be compromised.
            </p>
          </div>

          {/* Matrix Item 3 */}
          <div className="glass-surface glass-surface-interactive p-6 rounded-2xl group">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(99,102,241,0.25)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">Advanced machine learning protection</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Neural network heuristics adapt to zero-day attack surfaces before signature databases are released.
            </p>
          </div>

          {/* Matrix Item 4 */}
          <div className="glass-surface glass-surface-interactive p-6 rounded-2xl group">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(52,211,153,0.2)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">Individual user silos to air-gap data</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Granular isolation preventing lateral movement from infected team devices to company core servers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedProtectionGrid;
