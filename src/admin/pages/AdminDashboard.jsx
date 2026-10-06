import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Briefcase,
  Cpu,
  BookOpen,
  FileText,
  Mail,
  Star,
  Users,
  Image,
  UserCog,
  History,
  ArrowUpRight,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Server,
  Database,
  Plus,
  Send,
  Building2,
  Phone,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Check,
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const STATUS_COLORS = {
  NEW: 'bg-[#FF7A00]/15 text-[#FF7A00] border-[#FF7A00]/30',
  READ: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  CONTACTED: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  IN_PROGRESS: 'bg-amber-500/20 text-[#FFB000] border-amber-500/30',
  CONVERTED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  CLOSED: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  SPAM: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

const ACTION_COLORS = {
  USER_LOGIN: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  USER_REGISTER: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  INQUIRY_SUBMIT: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  INQUIRY_UPDATE: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  SERVICE_CREATE: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  BLOG_CREATE: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  DEFAULT: 'text-slate-300 bg-slate-800 border-slate-700',
};

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [updatingInquiryId, setUpdatingInquiryId] = useState(null);

  const isSuperAdminOrAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  const fetchSummary = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const res = await api.get('/dashboard/summary');
      if (res.success && res.data) {
        setData(res.data);
        setLastUpdated(new Date());
      } else {
        throw new Error(res.message || 'Failed to retrieve telemetry data.');
      }
    } catch (err) {
      console.error('Failed to fetch dashboard summary:', err);
      setError(err.message || 'Could not connect to the administrative telemetry service.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  // Quick inquiry status updater right from the dashboard
  const handleQuickStatusChange = async (inquiryId, newStatus) => {
    try {
      setUpdatingInquiryId(inquiryId);
      const res = await api.patch(`/inquiries/${inquiryId}`, { status: newStatus });
      if (res.success) {
        // Optimistically update local dashboard state
        setData((prev) => {
          if (!prev) return prev;
          const updatedRecent = (prev.recentInquiries || []).map((inq) =>
            inq.id === inquiryId ? { ...inq, status: newStatus } : inq
          );
          return { ...prev, recentInquiries: updatedRecent };
        });
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    } finally {
      setUpdatingInquiryId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-2 border-[#C1121F]/20 border-t-[#C1121F] animate-spin" />
          <Activity size={24} className="absolute inset-0 m-auto text-[#FF7A00] animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide font-heading">
            Establishing SOC Telemetry Uplink
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
            Aggregating platform intelligence, threat feeds & CMS metrics...
          </p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-rose-500/30 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
          <AlertCircle size={26} />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide font-heading">SOC Telemetry Disconnected</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">{error}</p>
        <div className="pt-2">
          <button
            onClick={fetchSummary}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:brightness-110 text-white font-semibold text-xs transition shadow-glow-crimson cursor-pointer font-heading"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    );
  }

  const counts = data?.counts || {};
  const system = data?.system || {};
  const breakdown = data?.inquiriesBreakdown || {};

  const statCards = [
    {
      label: 'Client Inquiries',
      count: counts.inquiries || 0,
      badge: counts.newInquiries ? `${counts.newInquiries} New` : null,
      badgeColor: 'bg-amber-500/15 text-[#FFB000] border-amber-500/30',
      icon: Mail,
      color: 'text-[#FFB000]',
      link: '/admin/inquiries',
      subtext: `${counts.newInquiries || 0} awaiting triage`,
    },
    {
      label: 'Active Services',
      count: counts.services || 0,
      badge: counts.activeServices ? `${counts.activeServices} Active` : null,
      badgeColor: 'bg-red-500/15 text-red-300 border-red-500/30',
      icon: Shield,
      color: 'text-[#C1121F]',
      link: '/admin/services',
      subtext: 'Core defensive offerings',
    },
    {
      label: 'Security Projects',
      count: counts.projects || 0,
      icon: Briefcase,
      color: 'text-[#FF7A00]',
      link: '/admin/projects',
      subtext: 'Engagements & case studies',
    },
    {
      label: 'Products & Tools',
      count: counts.products || 0,
      icon: Cpu,
      color: 'text-[#FFB000]',
      link: '/admin/products',
      subtext: 'Proprietary security tooling',
    },
    {
      label: 'Research Papers',
      count: counts.research || 0,
      badge: counts.publishedResearch ? `${counts.publishedResearch} Live` : null,
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: BookOpen,
      color: 'text-emerald-400',
      link: '/admin/research',
      subtext: 'Threat intel & vulnerability disclosures',
    },
    {
      label: 'Intelligence Posts',
      count: counts.blogs || 0,
      badge: counts.publishedBlogs ? `${counts.publishedBlogs} Live` : null,
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: FileText,
      color: 'text-[#C1121F]',
      link: '/admin/blog',
      subtext: 'Cyber advisory & publications',
    },
    {
      label: 'Reviews & Feedback',
      count: counts.reviews || 0,
      badge: counts.pendingReviews ? `${counts.pendingReviews} Pending` : null,
      badgeColor: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
      icon: Star,
      color: 'text-yellow-400',
      link: '/admin/reviews',
      subtext: 'Client testimonials',
    },
    {
      label: 'Team Members',
      count: counts.team || 0,
      icon: Users,
      color: 'text-sky-400',
      link: '/admin/team',
      subtext: 'Security engineers & staff',
    },
    {
      label: 'Media Assets',
      count: counts.media || 0,
      icon: Image,
      color: 'text-purple-400',
      link: '/admin/media',
      subtext: 'Encrypted storage library',
    },
    ...(isSuperAdminOrAdmin
      ? [
          {
            label: 'System Users',
            count: counts.users || 0,
            badge: counts.admins ? `${counts.admins} Admins` : null,
            badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
            icon: UserCog,
            color: 'text-[#FF7A00]',
            link: '/admin/users',
            subtext: 'Role-based access accounts',
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* ──────────────── Top Command Banner ──────────────── */}
      <div className="relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#141414] dark:via-[#0E0E0E] dark:to-[#080808] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C1121F]/10 via-[#FF7A00]/5 to-transparent dark:from-[#C1121F]/20 dark:via-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                SOC Command Core • Active Telemetry
              </span>
              {system.latencyMs !== undefined && (
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/10">
                  {system.latencyMs}ms DB ping
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-heading">
              Welcome back,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000]">
                {user?.name || 'Administrator'}
              </span>
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed font-normal">
              Abhimanyu InfoSec unified operational nexus. Manage client engagements, publish defense bulletins, and audit security events in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={fetchSummary}
              disabled={refreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-heading font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition active:scale-95 cursor-pointer shadow-2xs"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin text-[#FF7A00]' : ''} />
              <span>{refreshing ? 'Syncing...' : 'Sync Telemetry'}</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition shadow-2xs"
            >
              <ExternalLink size={13} className="text-[#C1121F] dark:text-[#FFB000]" />
              <span>Live Site</span>
            </a>
            <Link
              to="/admin/settings"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:brightness-110 text-white font-semibold text-xs font-heading shadow-glow-crimson transition active:scale-95"
            >
              <span>Site CMS</span>
            </Link>
          </div>
        </div>

        {lastUpdated && (
          <div className="relative z-10 mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Server Session: {user?.email} ({user?.role})</span>
            <span>Last synchronized at {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* ──────────────── Quick Launchpad (Action Shortcuts) ──────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider font-heading flex items-center gap-2">
            <Sparkles size={14} className="text-[#FF7A00] dark:text-[#FFB000]" />
            <span>Rapid Operational Launchpad</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">One-click creation workflows</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          <Link
            to="/admin/services"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121212] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] hover:border-[#C1121F]/40 text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition group shadow-2xs"
          >
            <Plus size={14} className="text-[#C1121F] group-hover:scale-125 transition-transform" />
            <span className="truncate">New Service</span>
          </Link>

          <Link
            to="/admin/projects"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121212] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] hover:border-[#FF7A00]/40 text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition group shadow-2xs"
          >
            <Plus size={14} className="text-[#FF7A00] group-hover:scale-125 transition-transform" />
            <span className="truncate">Add Project</span>
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121212] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] hover:border-[#FFB000]/40 text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition group shadow-2xs"
          >
            <Plus size={14} className="text-[#FFB000] group-hover:scale-125 transition-transform" />
            <span className="truncate">Add Product</span>
          </Link>

          <Link
            to="/admin/blog"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121212] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] hover:border-rose-500/40 text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition group shadow-2xs"
          >
            <Plus size={14} className="text-rose-500 dark:text-rose-400 group-hover:scale-125 transition-transform" />
            <span className="truncate">Write Post</span>
          </Link>

          <Link
            to="/admin/team"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121212] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] hover:border-sky-500/40 text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition group shadow-2xs"
          >
            <Plus size={14} className="text-sky-500 dark:text-sky-400 group-hover:scale-125 transition-transform" />
            <span className="truncate">Team Member</span>
          </Link>

          <Link
            to="/admin/media"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121212] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] hover:border-purple-500/40 text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition group shadow-2xs"
          >
            <Plus size={14} className="text-purple-500 dark:text-purple-400 group-hover:scale-125 transition-transform" />
            <span className="truncate">Upload Media</span>
          </Link>
        </div>
      </div>

      {/* ──────────────── KPI Cards Grid ──────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/[0.08] hover:border-[#C1121F]/40 hover:shadow-[0_4px_25px_rgba(193,18,31,0.15)] transition-all duration-300 group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-heading font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                  {card.label}
                </span>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] group-hover:bg-[#C1121F]/15 group-hover:border-[#C1121F]/30 transition">
                  <Icon size={16} className={`${card.color} group-hover:scale-110 transition-transform`} />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
                    {card.count}
                  </span>
                  {card.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border font-mono ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-1">{card.subtext}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ──────────────── Main Operational Grid ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Prospective Inquiries & Triage (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#FF7A00] dark:text-[#FFB000]">
                  <Mail size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                    Prospective Client Inquiries
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct security triage from web portal</p>
                </div>
              </div>
              <Link
                to="/admin/inquiries"
                className="text-xs text-[#C1121F] dark:text-[#FFB000] hover:underline flex items-center gap-1 font-mono font-semibold"
              >
                Full Inbox <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Inquiries Pipeline Ribbon */}
            {breakdown.total > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-4 p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/[0.06] text-center font-mono text-[10px]">
                <div>
                  <span className="text-slate-500 block">NEW</span>
                  <span className="text-[#FF7A00] font-bold text-xs">{breakdown.new || 0}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">CONTACTED</span>
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-xs">{breakdown.contacted || 0}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">IN PROGRESS</span>
                  <span className="text-amber-500 dark:text-[#FFB000] font-bold text-xs">{breakdown.inProgress || 0}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">CONVERTED</span>
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold text-xs">{breakdown.resolved || 0}</span>
                </div>
              </div>
            )}

            <div className="space-y-3 flex-1">
              {!data?.recentInquiries || data.recentInquiries.length === 0 ? (
                <div className="text-center py-14 text-slate-400 text-xs">
                  No prospective client inquiries recorded yet.
                </div>
              ) : (
                data.recentInquiries.map((inq) => {
                  const statusClass = STATUS_COLORS[inq.status] || STATUS_COLORS.READ;
                  const isUpdating = updatingInquiryId === inq.id;

                  return (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-slate-50/80 dark:bg-[#121212]/90 border border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate font-heading">
                            {inq.name}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${statusClass}`}>
                            {inq.status}
                          </span>
                          {inq.organization && (
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                              <Building2 size={11} />
                              {inq.organization}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                          {inq.email} {inq.phone ? `• ${inq.phone}` : ''} • Service:{' '}
                          <span className="text-slate-800 dark:text-slate-200 font-medium">{inq.service || 'General Security Inquiry'}</span>
                        </p>

                        {inq.message && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 italic bg-white dark:bg-black/40 px-2.5 py-1 rounded border border-slate-200 dark:border-white/5">
                            "{inq.message}"
                          </p>
                        )}
                      </div>

                      {/* Quick Status and Contact Actions */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-white/5">
                        <select
                          value={inq.status}
                          disabled={isUpdating}
                          onChange={(e) => handleQuickStatusChange(inq.id, e.target.value)}
                          className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-[11px] rounded-lg px-2.5 py-1.5 focus:border-[#C1121F] outline-none cursor-pointer shadow-2xs"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>

                        <a
                          href={`mailto:${inq.email}?subject=RE: Abhimanyu InfoSec Security Consultation`}
                          title="Reply to prospect via email"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#C1121F] text-slate-600 hover:text-white dark:bg-white/5 dark:text-slate-300 transition"
                        >
                          <Send size={13} />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: SOC Telemetry & Audit Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* SOC Telemetry Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-[#FFB000]">
                <Database size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                  Infrastructure Health
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Live cloud telemetry status</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#121212]/90 border border-slate-200 dark:border-white/[0.06]">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Server size={14} className="text-emerald-500 dark:text-emerald-400" />
                  REST API Engine
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">ONLINE (Node.js)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#121212]/90 border border-slate-200 dark:border-white/[0.06]">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Database size={14} className="text-[#FF7A00] dark:text-[#FFB000]" />
                  Neon Database
                </span>
                <span className="text-[#FF7A00] dark:text-[#FFB000] font-bold">
                  {system.dbStatus || 'Connected'} ({system.latencyMs || 0}ms)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#121212]/90 border border-slate-200 dark:border-white/[0.06]">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Shield size={14} className="text-[#C1121F] dark:text-[#FF7A00]" />
                  Identity Protocol
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">Zero-Trust JWT (15m/7d)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#121212]/90 border border-slate-200 dark:border-white/[0.06]">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Clock size={14} className="text-sky-500 dark:text-sky-400" />
                  Server Uptime
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {system.uptimeSeconds
                    ? `${Math.floor(system.uptimeSeconds / 60)}m active`
                    : 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Audit Log Stream */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[#C1121F] dark:text-[#FF7A00]">
                  <History size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                    Security Audit Trail
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Immutable administrative activity</p>
                </div>
              </div>
              {isSuperAdminOrAdmin && (
                <Link
                  to="/admin/audit-logs"
                  className="text-xs text-[#C1121F] dark:text-[#FFB000] hover:underline flex items-center gap-1 font-mono font-semibold"
                >
                  Full Trail <ArrowUpRight size={13} />
                </Link>
              )}
            </div>

            <div className="space-y-2 flex-1">
              {!data?.recentLogs || data.recentLogs.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No administrative events logged yet.
                </div>
              ) : (
                data.recentLogs.map((log) => {
                  const badgeStyle = ACTION_COLORS[log.action] || ACTION_COLORS.DEFAULT;

                  return (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#121212]/90 border border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition flex items-center justify-between text-xs shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <div className="truncate">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${badgeStyle}`}
                          >
                            {log.action}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400 text-[11px] ml-2 truncate">
                            by {log.user?.name || 'System Operator'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                        {new Date(log.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
