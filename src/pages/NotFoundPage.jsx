import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#0b1120] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-6">
          <ShieldAlert size={32} />
        </div>
        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">ERROR 404 — SECTOR NOT FOUND</span>
        <h1 className="text-3xl font-black text-white mt-2 mb-3">Target Coordinate Unreachable</h1>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          The requested endpoint or sector does not exist or has been relocated to an air-gapped network.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <ArrowLeft size={14} />
          <span>Return to Perimeter Base</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
