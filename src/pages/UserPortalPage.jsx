import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
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
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 font-sans selection:bg-brand-crimson selection:text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-crimson/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:28px_28px] opacity-25"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#0D0D0D] border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-crimson to-brand-amber p-0.5 shadow-lg shadow-brand-crimson/20">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-[#080808] flex items-center justify-center text-brand-amber font-bold text-xl font-heading">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-[10px] font-mono font-semibold uppercase">
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
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-brand-crimson to-brand-amber hover:brightness-110 text-white font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md shadow-brand-crimson/20 font-heading"
              >
                <Shield size={14} />
                <span>Admin Console</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#151515] hover:bg-[#202020] text-rose-400 border border-rose-500/30 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer font-heading"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Details & Quick Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-crimson/10 border border-brand-crimson/30 flex items-center justify-center text-brand-crimson">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white font-heading">Auth Provider</h3>
            <p className="text-xs text-slate-400 font-mono capitalize">
              Authenticated via <span className="text-brand-amber font-bold">{user.provider || 'LOCAL'}</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white font-heading">Security Consultations</h3>
            <p className="text-xs text-slate-400">
              Request bespoke penetration testing and architecture reviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-bright/10 border border-brand-bright/30 flex items-center justify-center text-brand-bright">
              <Sparkles size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white font-heading">Threat Intelligence</h3>
            <p className="text-xs text-slate-400">
              Direct access to AIS advisories, whitepapers, and defense tooling.
            </p>
          </div>
        </div>

        {/* Quick Action Navigation */}
        <div className="p-8 rounded-2xl bg-[#0D0D0D] border border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
            <span>Security Client Services</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/contact"
              className="p-5 rounded-xl bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-brand-crimson/50 transition group"
            >
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-brand-amber transition flex items-center justify-between font-heading">
                <span>Request Assessment</span>
                <ExternalLink size={13} className="text-slate-500 group-hover:text-brand-amber" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Initiate automated or manual penetration testing engagement.
              </p>
            </Link>

            <Link
              to="/services"
              className="p-5 rounded-xl bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-brand-crimson/50 transition group"
            >
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-brand-amber transition flex items-center justify-between font-heading">
                <span>Explore Capabilities</span>
                <ExternalLink size={13} className="text-slate-500 group-hover:text-brand-amber" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Red Team, Cloud Security, Code Review, and Incident Response.
              </p>
            </Link>

            <Link
              to="/insights"
              className="p-5 rounded-xl bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-brand-crimson/50 transition group"
            >
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-brand-amber transition flex items-center justify-between font-heading">
                <span>Security Research</span>
                <ExternalLink size={13} className="text-slate-500 group-hover:text-brand-amber" />
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
