import React from 'react';

const DeviceManagementSection = () => {
  return (
    <section className="py-24 border-t border-white/[0.08] bg-gradient-to-b from-[#070b1e]/50 to-[#030611] relative" data-purpose="dashboard-telemetry" id="telemetry">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Text & Store Badges */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            Mobile &amp; Cloud Apps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Control everything from <br />your smartphone or browser
          </h2>
          <p className="text-slate-300 text-base leading-relaxed max-w-lg">
            Monitor real-time threat neutralization, authorize device requests with 1-tap biometric confirmation, and toggle custom network rules from anywhere on earth.
          </p>

          {/* Store Buttons with Frosted Glass Finish */}
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Google Play Badge */}
            <button className="glass-surface-interactive flex items-center gap-3.5 px-5 py-2.5 rounded-xl border border-white/15 hover:border-cyan-400/40 text-left group">
              <svg className="w-6 h-6 text-emerald-400 filter drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 01-.61-.956V2.77c.18-.386.41-.715.61-.956zM15.207 13.414l2.593 2.593-11.45 6.51 8.857-9.103zm0-2.828L6.35 1.483l11.45 6.51-2.593 2.593zm1.414 1.414l3.197-1.818c1.03-.585 1.03-1.54 0-2.125l-3.197-1.818-1.414 1.414 1.414 4.347z"></path>
              </svg>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-slate-300">Get it on</div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-200">Google Play</div>
              </div>
            </button>

            {/* App Store Badge */}
            <button className="glass-surface-interactive flex items-center gap-3.5 px-5 py-2.5 rounded-xl border border-white/15 hover:border-cyan-400/40 text-left group">
              <svg className="w-6 h-6 text-white filter drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 0.6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.68-1.26z"></path>
              </svg>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-slate-300">Download on the</div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-200">Apple Store</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right: Telemetry Dashboard Cards Layout with Glowing Glass Accents */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md space-y-4">
            {/* Live Status Telemetry Widget */}
            <div className="glass-surface p-6 rounded-2xl shadow-glass-card space-y-5 border border-white/15">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.09]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-radar-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                  </span>
                  <span className="text-xs font-bold text-white">Firewall Active: Cluster 04 (Tokyo - AP)</span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 px-2.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.2)]">99.999% Uptime</span>
              </div>

              {/* Threat Stats Row with Glass Insets */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md shadow-inner">
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Blocked Threats</div>
                  <div className="text-lg font-extrabold text-white mt-0.5">14,290</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md shadow-inner">
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Latency</div>
                  <div className="text-lg font-extrabold text-emerald-400 mt-0.5 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]">1.2ms</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md shadow-inner">
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Nodes</div>
                  <div className="text-lg font-extrabold text-cyan-300 mt-0.5 drop-shadow-[0_0_6px_rgba(0,240,255,0.3)]">128 / 128</div>
                </div>
              </div>

              {/* Device item row */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-deep-950/70 border border-white/[0.08] shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">MacBook Pro 16" (Distributed Employee)</div>
                    <div className="text-[10px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <span>Encrypted DNS</span>
                      <span>•</span>
                      <span className="text-cyan-300">Tunnel Verified</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-md shadow-[0_0_8px_rgba(52,211,153,0.2)]">Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceManagementSection;
