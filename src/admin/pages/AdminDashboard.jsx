import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Briefcase,
  Cpu,
  BookOpen,
  FileText,
  Mail,
  Star,
  Image,
  ArrowUpRight,
  RefreshCw,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import api from '../../services/api';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSummary = async () => {
    try {
      setRefreshing(true);
      const res = await api.get('/dashboard/summary');
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard summary:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-cyan-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono">Aggregating telemetry...</span>
        </div>
      </div>
    );
  }

  const counts = data?.counts || {};

  const statCards = [
    { label: 'Inquiries', count: counts.inquiries || 0, badge: counts.newInquiries ? `${counts.newInquiries} New` : null, icon: Mail, color: 'text-amber-400', link: '/admin/inquiries' },
    { label: 'Active Services', count: counts.services || 0, icon: Shield, color: 'text-cyan-400', link: '/admin/services' },
    { label: 'Security Projects', count: counts.projects || 0, icon: Briefcase, color: 'text-blue-400', link: '/admin/projects' },
    { label: 'Products & Tools', count: counts.products || 0, icon: Cpu, color: 'text-purple-400', link: '/admin/products' },
    { label: 'Research Papers', count: counts.research || 0, icon: BookOpen, color: 'text-emerald-400', link: '/admin/research' },
    { label: 'Intelligence Posts', count: counts.blogs || 0, icon: FileText, color: 'text-rose-400', link: '/admin/blog' },
    { label: 'Reviews & Feedback', count: counts.reviews || 0, badge: counts.pendingReviews ? `${counts.pendingReviews} Pending` : null, icon: Star, color: 'text-yellow-400', link: '/admin/reviews' },
    { label: 'Media Assets', count: counts.media || 0, icon: Image, color: 'text-sky-400', link: '/admin/media' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/20 shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <span>SOC Telemetry & Command Center</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time management for Abhimanyu InfoSec cybersecurity content, leads, and operational tools.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSummary}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin text-cyan-400' : ''} />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
          >
            <span>Site CMS</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-5 rounded-xl bg-[#0b1120] border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</span>
                <Icon size={18} className={`${card.color} group-hover:scale-110 transition-transform`} />
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white font-mono">{card.count}</span>
                {card.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {card.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent Inquiries & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="p-6 rounded-2xl bg-[#0b1120] border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Latest Prospective Inquiries</h2>
            </div>
            <Link to="/admin/inquiries" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono">
              View All <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="flex-1 space-y-3">
            {(!data?.recentInquiries || data.recentInquiries.length === 0) ? (
              <div className="text-center py-12 text-slate-500 text-xs">No client inquiries captured yet.</div>
            ) : (
              data.recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl bg-[#070b14] border border-slate-800/80 hover:border-slate-700 flex items-center justify-between gap-4 transition"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white truncate">{inq.name}</span>
                      {inq.status === 'NEW' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{inq.email} • {inq.service || 'General'}</p>
                  </div>
                  <Link
                    to="/admin/inquiries"
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 text-[11px] font-mono transition"
                  >
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log Feed */}
        <div className="p-6 rounded-2xl bg-[#0b1120] border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Administrative Audit Stream</h2>
            </div>
            <Link to="/admin/audit-logs" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono">
              Full Log <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="flex-1 space-y-2.5">
            {(!data?.recentLogs || data.recentLogs.length === 0) ? (
              <div className="text-center py-12 text-slate-500 text-xs">No audit records logged yet.</div>
            ) : (
              data.recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-[#070b14] border border-slate-800/60 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                    <div className="truncate">
                      <span className="font-mono text-cyan-300 text-[11px]">{log.action}</span>
                      <span className="text-slate-500 mx-1.5">•</span>
                      <span className="text-slate-400 text-[11px] truncate">
                        {log.user?.name || 'System'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono flex-shrink-0 ml-2">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
