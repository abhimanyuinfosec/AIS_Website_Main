import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  Briefcase,
  Cpu,
  BookOpen,
  FileText,
  Mail,
  Star,
  Users,
  Image,
  Settings,
  History,
  LogOut,
  ExternalLink,
  Bell,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  UserCog,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/services', label: 'Services', icon: ShieldAlert },
  { path: '/admin/projects', label: 'Projects', icon: Briefcase },
  { path: '/admin/products', label: 'Products', icon: Cpu },
  { path: '/admin/research', label: 'Research', icon: BookOpen },
  { path: '/admin/blog', label: 'Blog & Intel', icon: FileText },
  { path: '/admin/inquiries', label: 'Inquiries', icon: Mail, badgeKey: 'inquiries' },
  { path: '/admin/reviews', label: 'Reviews', icon: Star, badgeKey: 'reviews' },
  { path: '/admin/team', label: 'Team', icon: Users },
  { path: '/admin/media', label: 'Media Library', icon: Image },
  { path: '/admin/settings', label: 'Site Settings', icon: Settings },
  { path: '/admin/audit-logs', label: 'Audit Logs', icon: History, role: ['SUPER_ADMIN', 'ADMIN'] },
  { path: '/admin/users', label: 'User Management', icon: UserCog, role: ['SUPER_ADMIN', 'ADMIN'] },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30s poll
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.success) {
        setNotifications(res.data || []);
        setUnreadCount(res.unreadCount || 0);
      }
    } catch {
      // ignore in background
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.patch('/notifications/all/read');
      setUnreadCount(0);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout('/admin/login');
  };

  const currentNav = navItems.find((item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-slate-800 dark:text-slate-200 flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-white dark:bg-[#0D0D0D] border-r border-slate-200 dark:border-white/[0.08] shadow-sm ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Brand Header with Main Website Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0A0A]">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden group">
            {sidebarOpen ? (
              <img
                src="/lightlogo.png"
                alt="Abhimanyu InfoSec"
                className="h-10 w-auto max-w-[190px] object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C1121F] via-[#FF7A00] to-[#FFB000] p-[1.5px] shadow-[0_0_15px_rgba(193,18,31,0.35)] flex-shrink-0">
                <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#0D0D0D] flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] font-black text-sm font-heading">
                    AIS
                  </span>
                </div>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition hidden md:block"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            if (item.role && user && user.role !== 'SUPER_ADMIN' && !item.role.includes(user.role)) return null;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-medium tracking-wide transition-all select-none ${
                  isActive
                    ? 'bg-slate-100 dark:bg-white/[0.08] text-[#C1121F] dark:text-[#FFB000] border-l-2 border-[#C1121F] font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={18} className={isActive ? 'text-[#C1121F] dark:text-[#FFB000]' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors'} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* User Card & Logout */}
        <div className="p-3.5 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0A0A0A]">
          {sidebarOpen ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-900 dark:text-white truncate font-heading">{user?.name || 'Administrator'}</span>
                <span className="text-[10px] text-[#C1121F] dark:text-[#FFB000] font-mono uppercase tracking-wider truncate font-semibold">{user?.role}</span>
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-500/10 dark:text-slate-400 dark:hover:text-red-400 rounded-lg transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              title="Log Out"
              className="w-full flex justify-center p-2 text-slate-500 hover:text-red-600 hover:bg-red-500/10 dark:text-slate-400 dark:hover:text-red-400 rounded-lg transition"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/95 dark:bg-[#0D0D0D]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] px-6 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="font-mono text-[#C1121F] dark:text-[#FFB000] text-xs font-semibold">AIS CONTROL</span>
            <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
            <span className="text-slate-900 dark:text-white font-heading font-medium text-xs sm:text-sm">{currentNav?.label || 'Administration'}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* View live website */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-xs font-heading font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition shadow-2xs"
            >
              <ExternalLink size={13} className="text-[#C1121F] dark:text-[#FFB000]" />
              <span>Live Website</span>
            </a>

            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C1121F] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse shadow-[0_0_8px_rgba(193,18,31,0.6)]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-white/15 rounded-2xl shadow-xl z-50 p-3 overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.08]">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] text-[#C1121F] dark:text-[#FFB000] hover:underline flex items-center gap-1 font-mono"
                      >
                        <CheckCircle size={12} /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto py-2 space-y-2 text-xs custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-slate-400">No alerts or inquiries.</div>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl border transition ${
                            n.isRead
                              ? 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                              : 'bg-red-50 dark:bg-[#C1121F]/10 border-red-200 dark:border-[#C1121F]/30 text-slate-900 dark:text-slate-200'
                          }`}
                        >
                          <div className="font-semibold text-slate-900 dark:text-white text-xs">{n.title}</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</div>
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* System Status Ping */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping"></span>
              <span>API ONLINE</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#F8FAFC] dark:bg-[#080808] relative">
          {/* Ambient Cyber Glow matching main website */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(193,18,31,0.08),transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
