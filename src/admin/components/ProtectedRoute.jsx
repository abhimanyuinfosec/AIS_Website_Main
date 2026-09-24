import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles, redirectTo = '/admin/login' }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-blue-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-mono text-sm tracking-widest uppercase text-slate-400">Verifying Security Credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && user && user.role !== 'SUPER_ADMIN' && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-red-400 p-6">
        <div className="max-w-md text-center p-8 rounded-xl border border-red-500/20 bg-red-500/5">
          <h2 className="text-2xl font-bold mb-2 font-mono">403 — ACCESS DENIED</h2>
          <p className="text-gray-400 text-sm mb-6">
            Your role (<span className="text-white font-mono">{user.role}</span>) does not have authorization to view this resource.
          </p>
          <a href="/admin" className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded border border-red-500/30 text-sm">
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
