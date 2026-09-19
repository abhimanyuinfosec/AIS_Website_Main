import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(api.getToken());
  const [isLoading, setIsLoading] = useState(true);

  // Check auth state on mount
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
          logout();
        }
      } catch (err) {
        console.warn('Session check failed:', err.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.data?.token) {
      api.setToken(res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res.message || 'Login failed');
  };

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

  // Called after OAuth redirect to load session from returned JWT
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
      console.error('Error fetching user with new token:', err);
    }
    return null;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout').catch(() => {});
    } finally {
      api.setToken(null);
      setToken(null);
      setUser(null);
    }
  };

  const isAdmin = user ? ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'].includes(user.role) : false;

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
