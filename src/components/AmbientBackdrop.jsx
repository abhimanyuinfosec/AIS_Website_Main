import React from 'react';

const AmbientBackdrop = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Glowing Neon Cyan / Blue / Violet Animated Spheres */}
      <div className="absolute -top-[12%] right-[5%] w-[680px] h-[680px] rounded-full bg-gradient-to-br from-blue-600/25 via-cyan-500/15 to-indigo-700/25 blur-[120px] animate-orb-1"></div>
      <div className="absolute top-[28%] -left-[12%] w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-indigo-700/20 via-purple-600/15 to-blue-500/20 blur-[130px] animate-orb-2"></div>
      <div className="absolute top-[60%] right-[15%] w-[580px] h-[580px] rounded-full bg-gradient-to-br from-cyan-400/15 via-blue-600/15 to-violet-800/15 blur-[140px] animate-orb-3"></div>
      <div className="absolute -bottom-[15%] left-[20%] w-[700px] h-[700px] rounded-full bg-blue-700/20 blur-[150px] animate-orb-1"></div>
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70"></div>
      {/* Subtle Vignette to keep focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,6,17,0.7)_100%)]"></div>
    </div>
  );
};

export default AmbientBackdrop;
