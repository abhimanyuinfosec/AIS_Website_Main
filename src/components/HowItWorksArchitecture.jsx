import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorksArchitecture = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#070b1e]/40 to-[#040714]/70 border-t border-white/[0.08] relative" data-purpose="how-it-works-diagram" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Endpoint Laptop Pedestal & Dynamic Animated Flow */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-blue-600/20 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative w-full max-w-[480px] animate-pedestal">
              <svg className="w-full h-auto drop-shadow-2xl" fill="none" viewBox="0 0 500 380" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="laptopPedestal" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#22314f"></stop>
                    <stop offset="100%" stopColor="#0b101c"></stop>
                  </linearGradient>
                  <linearGradient id="screenGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#0b1226"></stop>
                    <stop offset="100%" stopColor="#040714"></stop>
                  </linearGradient>
                </defs>
                {/* Pedestal with Glass Highlight Rim */}
                <polygon fill="url(#laptopPedestal)" points="250,220 420,290 250,360 80,290" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1.2"></polygon>
                <polygon fill="#070b14" points="80,290 250,360 250,380 80,310"></polygon>
                <polygon fill="#0f172a" points="250,360 420,290 420,310 250,380"></polygon>
                {/* Blue Circuit Tracer Ring with Animated Dash Flow & Toggle (+) */}
                <ellipse className="animate-dash-flow" cx="250" cy="290" opacity="0.8" rx="140" ry="55" stroke="#00f0ff" strokeWidth="1.8"></ellipse>
                <circle cx="250" cy="345" fill="#2563eb" filter="drop-shadow(0 0 10px rgba(0,240,255,0.9))" r="14" stroke="#ffffff" strokeWidth="1"></circle>
                <path d="M250,339 L250,351 M244,345 L256,345" stroke="#ffffff" strokeLinecap="round" strokeWidth="2.5"></path>
                {/* Laptop Base Platform */}
                <polygon fill="#334155" points="250,180 370,230 250,270 130,220" stroke="#64748b" strokeWidth="0.8"></polygon>
                <polygon fill="#1e293b" points="130,220 250,270 250,278 130,228"></polygon>
                <polygon fill="#0f172a" points="250,270 370,230 370,238 250,278"></polygon>
                {/* Keyboard Deck */}
                <polygon fill="#0f172a" points="248,190 350,230 250,262 148,222"></polygon>
                {/* Upright Laptop Display Screen with Glass Rim */}
                <polygon fill="#0f172a" points="140,85 330,85 330,210 140,210" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="2"></polygon>
                <polygon fill="url(#screenGrad)" points="144,89 326,89 326,206 144,206"></polygon>
                {/* Screen Contents: Abhimanyu Fort Logo on Screen */}
                <g transform="translate(205, 120)">
                  <path d="M15,4 L3,9 v8 c0 7.3 5.1 14.3 12 16 c6.9-1.7 12-8.7 12-16 V9 L15,4 z" fill="#2563eb" opacity="0.95"></path>
                  <path d="M10,17 l3.5,3.5 l6.5,-6.5" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <text fill="#ffffff" fontSize="14" fontWeight="700" letterSpacing="-0.3" x="35" y="24">Abhimanyu</text>
                  <circle cx="112" cy="20" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" r="3.5"></circle>
                </g>
                {/* Signal Vector Linking with Dashflow Animation */}
                <path className="animate-dash-flow" d="M250,345 C250,375 350,380 480,380" fill="none" opacity="0.8" stroke="#00f0ff" strokeWidth="2.2"></path>
              </svg>
            </div>
          </div>

          {/* Right Column: Explanatory Content & Glass Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-300 uppercase">
              Reliable Protection
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How it works
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Abhimanyu acts as an impermeable rockwall. It transparently encrypts and screens every byte of your network traffic, whether at home, in co-working spaces, or on the go. It is constantly learning, neutralizing threats before they reach your devices.
            </p>

            {/* Feature Bullet List with Frosted Glass Panels */}
            <div className="space-y-4 pt-2">
              <div className="glass-surface glass-surface-interactive flex items-start gap-4 p-4 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Automated Zero-Trust Tunnel</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Continuous cryptographic identity validation on every packet, preventing spoofing and MitM attacks.</p>
                </div>
              </div>

              <div className="glass-surface glass-surface-interactive flex items-start gap-4 p-4 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Autonomous AI Sandboxing</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Untrusted payloads and suspicious links are executed in remote micro-containers before touching your hardware.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors group" to="/technology">
                <span>View interactive architectural breakdown</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksArchitecture;
