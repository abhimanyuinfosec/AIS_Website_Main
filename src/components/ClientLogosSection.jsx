import React from 'react';

const ClientLogosSection = () => {
  return (
    <section className="py-14 border-y border-white/[0.1] bg-slate-900/40 backdrop-blur-xl relative" data-purpose="social-proof-strip">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold tracking-widest text-slate-300 uppercase mb-8 drop-shadow-sm">
          Trusted by 350+ happy customer organizations &amp; modern security teams
        </p>
        {/* Logo Grid with Clean Monochromatic Brands with Glow Hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-75">
          {/* Logo 1: CGV */}
          <div className="h-9 flex items-center justify-center font-bold text-xl tracking-tighter text-slate-300 hover:text-white hover:scale-105 transition-all cursor-default">
            <span className="text-2xl font-black text-cyan-400 mr-1">C</span>GV<sup className="text-[10px] ml-0.5">®</sup>
          </div>
          {/* Logo 2: Hmall */}
          <div className="h-9 flex items-center justify-center font-extrabold text-xl tracking-tight text-slate-300 hover:text-white hover:scale-105 transition-all cursor-default">
            Hmall<span className="text-brand-400 font-bold">.</span>
          </div>
          {/* Logo 3: Daum */}
          <div className="h-9 flex items-center justify-center font-semibold text-lg tracking-wider text-slate-300 hover:text-white hover:scale-105 transition-all cursor-default">
            <span className="text-amber-400">D</span>a<span className="text-blue-400">u</span>m
          </div>
          {/* Logo 4: LOTTE */}
          <div className="h-9 flex items-center justify-center font-serif tracking-widest text-lg font-bold text-slate-300 hover:text-white hover:scale-105 transition-all cursor-default">
            LOTTE
          </div>
          {/* Logo 5: NAVER */}
          <div className="h-9 flex items-center justify-center font-black text-xl tracking-tight text-slate-300 hover:text-white hover:scale-105 transition-all cursor-default">
            <span className="bg-white text-[#030611] px-1.5 py-0.5 rounded mr-1 text-sm font-black">N</span>NAVER
          </div>
          {/* Logo 6: Coupang */}
          <div className="h-9 flex items-center justify-center font-bold text-lg tracking-normal text-slate-300 hover:text-white hover:scale-105 transition-all cursor-default">
            coupang
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
