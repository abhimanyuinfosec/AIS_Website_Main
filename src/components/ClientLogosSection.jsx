import React from 'react';

const ClientLogosSection = () => {
  const logos = [
    {
      id: 'cgv',
      node: (
        <div className="h-10 flex items-center justify-center font-bold text-xl tracking-tighter text-slate-300 hover:text-white transition-all cursor-default">
          <span className="text-2xl font-black text-cyan-400 mr-1">C</span>GV<sup className="text-[10px] ml-0.5">®</sup>
        </div>
      ),
    },
    {
      id: 'hmall',
      node: (
        <div className="h-10 flex items-center justify-center font-extrabold text-xl tracking-tight text-slate-300 hover:text-white transition-all cursor-default">
          Hmall<span className="text-brand-400 font-bold">.</span>
        </div>
      ),
    },
    {
      id: 'daum',
      node: (
        <div className="h-10 flex items-center justify-center font-semibold text-lg tracking-wider text-slate-300 hover:text-white transition-all cursor-default">
          <span className="text-amber-400">D</span>a<span className="text-blue-400">u</span>m
        </div>
      ),
    },
    {
      id: 'lotte',
      node: (
        <div className="h-10 flex items-center justify-center font-serif tracking-widest text-lg font-bold text-slate-300 hover:text-white transition-all cursor-default">
          LOTTE
        </div>
      ),
    },
    {
      id: 'naver',
      node: (
        <div className="h-10 flex items-center justify-center font-black text-xl tracking-tight text-slate-300 hover:text-white transition-all cursor-default">
          <span className="bg-white text-[#030611] px-1.5 py-0.5 rounded mr-1 text-sm font-black">N</span>NAVER
        </div>
      ),
    },
    {
      id: 'coupang',
      node: (
        <div className="h-10 flex items-center justify-center font-bold text-lg tracking-normal text-slate-300 hover:text-white transition-all cursor-default">
          coupang
        </div>
      ),
    },
  ];

  return (
    <section className="py-10 border-y border-white/[0.08] bg-slate-950/50 backdrop-blur-xl relative overflow-hidden" data-purpose="social-proof-strip">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase drop-shadow-sm flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Trusted by 350+ organizations &amp; modern security teams</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </p>
      </div>

      {/* Horizontal Infinite Marquee Carousel with Left & Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left Edge Gradient Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#030611] via-[#030611]/80 to-transparent z-10 pointer-events-none" />
        {/* Right Edge Gradient Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#030611] via-[#030611]/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track: Contains identical dual sets for seamless continuous loop */}
        <div className="animate-horizontal-marquee flex items-center gap-12 sm:gap-20 opacity-80 py-2">
          {/* First Sequence of Logos */}
          <div className="flex items-center gap-12 sm:gap-20 flex-shrink-0">
            {logos.map((item) => (
              <div key={`track1-${item.id}`} className="flex-shrink-0 hover:opacity-100 transition-opacity">
                {item.node}
              </div>
            ))}
          </div>

          {/* Second Sequence of Logos (Duplicate for seamless continuous loop) */}
          <div className="flex items-center gap-12 sm:gap-20 flex-shrink-0" aria-hidden="true">
            {logos.map((item) => (
              <div key={`track2-${item.id}`} className="flex-shrink-0 hover:opacity-100 transition-opacity">
                {item.node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
