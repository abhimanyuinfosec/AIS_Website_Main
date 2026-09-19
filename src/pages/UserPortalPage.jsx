import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  Mail,
  Calendar,
  LogOut,
  ExternalLink,
  Shield,
  FileText,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserPortalPage = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#05070A] text-slate-100 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-slate-400 font-mono text-sm">Session expired or not found.</p>
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#0B1120]/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-[#070B14] flex items-center justify-center text-cyan-400 font-bold text-xl">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-semibold uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isAdmin && (
              <Link
                to="/admin"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <Shield size={14} />
                <span>Admin Console</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 border border-rose-500/30 font-semibold text-xs transition flex items-center justify-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Details & Quick Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0B1120]/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white">Auth Provider</h3>
            <p className="text-xs text-slate-400 font-mono capitalize">
              Authenticated via <span className="text-cyan-400 font-bold">{user.provider || 'LOCAL'}</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1120]/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white">Security Consultations</h3>
            <p className="text-xs text-slate-400">
              Request bespoke penetration testing and architecture reviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1120]/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white">Threat Intelligence</h3>
            <p className="text-xs text-slate-400">
              Direct access to AIS advisories, whitepapers, and defense tooling.
            </p>
          </div>
        </div>

        {/* Quick Action Navigation */}
        <div className="p-8 rounded-2xl bg-[#0B1120]/80 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Security Client Services</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/contact"
              className="p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition group"
            >
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition flex items-center justify-between">
                <span>Request Assessment</span>
                <ExternalLink size={13} className="text-slate-500 group-hover:text-cyan-400" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Initiate automated or manual penetration testing engagement.
              </p>
            </Link>

            <Link
              to="/services"
              className="p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition group"
            >
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition flex items-center justify-between">
                <span>Explore Capabilities</span>
                <ExternalLink size={13} className="text-slate-500 group-hover:text-cyan-400" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Red Team, Cloud Security, Code Review, and Incident Response.
              </p>
            </Link>

            <Link
              to="/research"
              className="p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition group"
            >
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition flex items-center justify-between">
                <span>Security Research</span>
                <ExternalLink size={13} className="text-slate-500 group-hover:text-cyan-400" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Vulnerability disclosures, technical papers, and CVE telemetry.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPortalPage;
