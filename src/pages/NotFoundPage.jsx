import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center p-8 rounded-xl bg-slate-900/60 border border-slate-800">
        <span className="inline-block px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 tracking-widest uppercase mb-4">
          Error 404
        </span>
        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          The requested page does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
