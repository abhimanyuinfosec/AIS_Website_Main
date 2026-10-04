import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(api.getToken());
  const [isLoading, setIsLoading] = useState(true);

  // ── Clean logout helper (used internally + exported) ──────────────────────
  const _clearSession = useCallback(() => {
    api.setToken(null);
    setToken(null);
    setUser(null);
    localStorage.removeItem('ais_demo_user');
  }, []);

  const logout = useCallback(async (redirectTo = '/') => {
    try {
      await api.post('/auth/logout').catch(() => {});
    } finally {
      _clearSession();
      if (typeof window !== 'undefined' && redirectTo && window.location.pathname !== redirectTo) {
        window.location.href = redirectTo;
      }
    }
  }, [_clearSession]);

  // ── Listen for token-refresh-failed event from api.js ─────────────────────
  useEffect(() => {
    const handleExpired = () => {
      console.warn('[Auth] Session expired — logging out.');
      _clearSession();
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    };
    window.addEventListener('ais:session-expired', handleExpired);
    return () => window.removeEventListener('ais:session-expired', handleExpired);
  }, [_clearSession]);

  // ── Verify session on mount ───────────────────────────────────────────────
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = api.getToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.success && res.data?.user) {
          setUser(res.data.user);
        } else {
          _clearSession();
        }
      } catch (err) {
        console.warn('[Auth] Session check failed:', err.message);
        _clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [_clearSession]);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.data?.token) {
      api.setToken(res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res.message || 'Login failed. Please check your credentials.');
  };

  // ── Register ──────────────────────────────────────────────────────────────
  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    if (res.success && res.data?.token) {
      api.setToken(res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  // ── Called after OAuth redirect to load session from returned JWT ──────────
  const setAuthToken = async (newToken) => {
    if (!newToken) return null;
    api.setToken(newToken);
    setToken(newToken);
    try {
      const res = await api.get('/auth/me');
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        return res.data.user;
      }
    } catch (err) {
      console.error('[Auth] Error fetching user with new token:', err);
    }
    return null;
  };

  const isAdmin = user ? ADMIN_ROLES.includes(user.role) : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        login,
        register,
        setAuthToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
