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
    await logout();
    navigate('/admin/login');
  };

  const currentNav = navItems.find((item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-[#0b1120]/95 backdrop-blur border-r border-cyan-500/20 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-cyan-500/10">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
            {sidebarOpen ? (
              <img
                src="/logo.png"
                alt="Abhimanyu InfoSec"
                className="h-12 w-auto max-w-[210px] object-contain filter drop-shadow-[0_2px_14px_rgba(6,182,212,0.45)]"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] flex-shrink-0">
                A
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition hidden md:block"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            if (item.role && user && !item.role.includes(user.role)) return null;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* User Card & Logout */}
        <div className="p-3 border-t border-cyan-500/10 bg-[#070b14]/60">
          {sidebarOpen ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</span>
                <span className="text-[10px] text-cyan-400/80 font-mono uppercase truncate">{user?.role}</span>
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              title="Log Out"
              className="w-full flex justify-center p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0b1120]/80 backdrop-blur border-b border-cyan-500/20 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="font-mono text-cyan-400/70">AIS CORE</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{currentNav?.label || 'Administration'}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* View live website */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-300 transition"
            >
              <ExternalLink size={13} className="text-cyan-400" />
              <span>Live Website</span>
            </a>

            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-cyan-500 text-black text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0f172a] border border-cyan-500/30 rounded-xl shadow-2xl z-50 p-3 overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <CheckCircle size={12} /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto py-2 space-y-2 text-xs">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-slate-500">No alerts or inquiries.</div>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg border transition ${
                            n.isRead
                              ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                              : 'bg-cyan-950/30 border-cyan-500/30 text-slate-200'
                          }`}
                        >
                          <div className="font-semibold text-white text-xs">{n.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</div>
                          <div className="text-[9px] text-slate-500 mt-1 font-mono">
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
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>API ONLINE</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested View */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#070b14]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
