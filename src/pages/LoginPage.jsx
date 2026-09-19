import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import {
  Shield,
  Lock,
  Mail,
  User as UserIcon,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Terminal,
  KeyRound,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../services/api';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const { login, register, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || (isAdmin ? '/admin' : '/portal');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? '/admin' : '/portal', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const loggedUser = await login(email, password);
        const destination = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'].includes(loggedUser.role)
          ? '/admin'
          : '/portal';
        navigate(destination, { replace: true });
      } else {
        const newUser = await register(name, email, password);
        navigate('/portal', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthGoogle = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleOAuthGitHub = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  };

  const handleFillDemo = () => {
    setMode('login');
    setEmail('admin@abhimanyuinfosec.com');
    setPassword('AdminSecurePassword2026!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25"></div>
      </div>

      {/* Main Split Grid Card */}
      <div className="w-full max-w-5xl rounded-3xl bg-[#0B1120]/80 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.15)] relative z-10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Cyber Branding & Telemetry */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-[#070B14] via-[#0C121D] to-[#070B14] border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between relative">
          <div className="space-y-6">
            {/* Header Brand */}
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src="/logo.png"
                  alt="Abhimanyu InfoSec"
                  className="h-16 sm:h-20 w-auto max-w-[260px] object-contain mix-blend-screen filter drop-shadow-[0_2px_20px_rgba(0,240,255,0.5)] group-hover:scale-[1.02] transition-all"
                />
              </Link>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                <Terminal size={13} /> SECURE ACCESS GATEWAY
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Defend. Detect. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  Operate Resiliently.
                </span>
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Zero-trust authentication portal for security researchers, clients, and platform administrators.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Shield size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">End-to-End Cryptography</h4>
                  <p className="text-[10px] text-slate-400">JWT sessions with automated refresh tokens</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Universal OAuth Integration</h4>
                  <p className="text-[10px] text-slate-400">Instant sign-in with verified Google & GitHub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              ACTIVE TLS 1.3
            </span>
            <span>{time}</span>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            {/* Top Navigation Back */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition"
              >
                <ArrowLeft size={13} />
                <span>Return to Home</span>
              </Link>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`py-2 rounded-lg font-semibold transition ${
                  mode === 'login'
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={`py-2 rounded-lg font-semibold transition ${
                  mode === 'register'
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleOAuthGoogle}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 text-white text-xs font-medium transition flex items-center justify-center gap-3 shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleOAuthGitHub}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 text-white text-xs font-medium transition flex items-center justify-center gap-3 shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-[#0B1120] px-3 text-[11px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
                Or with email
              </span>
              <div className="border-t border-slate-800 w-full"></div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider font-mono text-[11px] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                      size={15}
                    />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full bg-[#070B14] border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 outline-none transition text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider font-mono text-[11px] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    size={15}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-[#070B14] border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 outline-none transition text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase tracking-wider font-mono text-[11px] mb-1.5">
                  Password {mode === 'register' && <span className="text-slate-500">(min 8 characters)</span>}
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    size={15}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#070B14] border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-10 pr-11 py-2.5 text-white placeholder-slate-600 outline-none transition text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-200 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Authorize Session' : 'Create My Account'}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Helper for Admins */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono transition flex items-center justify-center gap-2"
              >
                <KeyRound size={12} />
                <span>Auto-Fill Super Admin Credentials</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
