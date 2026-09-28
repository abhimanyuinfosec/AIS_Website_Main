import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'];

/**
 * ProtectedRoute — guards a route by authentication and optional role.
 *
 * Props:
 *  - allowedRoles: string[]  — if provided, user.role must be in this list
 *                              (SUPER_ADMIN always passes)
 *  - requireAdmin: boolean   — if true, user must have an admin-level role
 *                              (SUPER_ADMIN | ADMIN | EDITOR | AUTHOR)
 *  - redirectTo: string      — where to send unauthenticated users
 *                              defaults to '/admin/login'
 */
export const ProtectedRoute = ({
  children,
  allowedRoles,
  requireAdmin = false,
  redirectTo = '/admin/login',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // ── Loading spinner ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-cyan-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest uppercase text-slate-400">
            Verifying Security Credentials...
          </span>
        </div>
      </div>
    );
  }

  // ── Not authenticated at all ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // ── Admin-level role required (catches regular USERs trying /admin/*) ─────
  if (requireAdmin && user && !ADMIN_ROLES.includes(user.role)) {
    return <AccessDenied user={user} reason="admin" />;
  }

  // ── Specific role restriction (e.g. only SUPER_ADMIN | ADMIN) ────────────
  if (
    allowedRoles &&
    user &&
    user.role !== 'SUPER_ADMIN' &&
    !allowedRoles.includes(user.role)
  ) {
    return <AccessDenied user={user} reason="role" allowedRoles={allowedRoles} />;
  }

  return children;
};

// ── 403 screen ────────────────────────────────────────────────────────────────
const AccessDenied = ({ user, reason, allowedRoles }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-slate-300 p-6">
    <div className="max-w-md w-full text-center p-8 rounded-2xl border border-red-500/20 bg-red-500/5 shadow-[0_0_40px_rgba(239,68,68,0.08)] space-y-5">
      <div className="flex justify-center">
        <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20">
          <ShieldOff size={28} className="text-red-400" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold font-mono text-red-400 mb-1">403 — ACCESS DENIED</h2>
        {reason === 'admin' ? (
          <p className="text-sm text-slate-400">
            Your account role{' '}
            <span className="text-white font-mono">({user?.role})</span> does not have
            permission to access the administrative console.
          </p>
        ) : (
          <p className="text-sm text-slate-400">
            This resource requires one of:{' '}
            <span className="text-white font-mono">
              [{allowedRoles?.join(', ')}]
            </span>
            . Your current role is{' '}
            <span className="text-white font-mono">{user?.role}</span>.
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm border border-slate-700 transition"
        >
          <ArrowLeft size={14} />
          Public Site
        </Link>
        <Link
          to="/admin/login"
          className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 text-sm border border-red-500/30 transition"
        >
          Switch Account
        </Link>
      </div>
    </div>
  </div>
);

export default ProtectedRoute;
