import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Terminal,
  Activity,
  KeyRound,
  Fingerprint,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/Navbar';
import { API_BASE_URL, prewarmBackend, initiateOAuthRedirect } from '../../services/api';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // 'google' | 'github' | null
  const [oauthStatus, setOauthStatus] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  // Pre-warm backend immediately when visiting admin login
  useEffect(() => {
    prewarmBackend();
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin', { replace: true });
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
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Invalid cryptographic credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthGoogle = () => {
    setOauthLoading('google');
    setOauthStatus('Connecting to Google identity provider...');
    initiateOAuthRedirect('google', ({ message }) => {
      setOauthStatus(message);
    });
  };

  const handleOAuthGitHub = () => {
    setOauthLoading('github');
    setOauthStatus('Connecting to GitHub identity provider...');
    initiateOAuthRedirect('github', ({ message }) => {
      setOauthStatus(message);
    });
  };

  return (
    <div
      className="login-page-root min-h-screen w-full relative text-slate-100 flex flex-col justify-between font-sans selection:bg-brand-crimson selection:text-white overflow-x-hidden bg-cover bg-center bg-no-repeat transition-all duration-300"
      style={{
        backgroundImage: "url('/login.jpg')",
      }}
    >
      <Navbar />

      {/* Background vignette & tint overlay */}
      <div className="login-overlay-1 absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/75 to-[#080808]/85 pointer-events-none" />
      <div className="login-overlay-2 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#080808]/50 to-[#050505]/95 pointer-events-none" />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 md:pt-32 pb-8 sm:pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 my-auto">
        
        {/* Left Side: Frosted Glass Auth Card */}
        <div className="login-auth-card w-full max-w-[430px] rounded-[28px] bg-[#0D0D0D]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 sm:p-7 text-slate-100 relative transition-all duration-300">
          {/* OAuth Connecting / Cold Start Screen */}
          {oauthLoading && (
            <div className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-xl rounded-[28px] z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200 border border-white/10">
              <div className="w-12 h-12 rounded-full border-2 border-brand-crimson border-t-transparent animate-spin mb-4 shadow-[0_0_15px_rgba(204,34,0,0.4)]" />
              <h3 className="text-base font-bold text-white mb-2 font-heading tracking-wide">
                {oauthLoading === 'google' ? 'Connecting with Google' : 'Connecting with GitHub'}
              </h3>
              <p className="text-xs text-slate-300 max-w-xs leading-relaxed font-mono">
                {oauthStatus || 'Initializing secure administrative handshake...'}
              </p>
              <div className="mt-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero-Trust Control Channel</span>
              </div>
            </div>
          )}

          {/* Card Header */}
          <div className="login-card-header mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-crimson/10 text-brand-amber border border-brand-crimson/30 text-[10px] font-mono font-bold uppercase mb-2">
              <Terminal size={12} /> Control Console
            </div>
            <h1 className="login-card-title text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              <span className="login-title-lead text-slate-900 dark:text-white">Admin</span>{' '}
              <span className="ais-signature-gradient">Authentication</span>
            </h1>
            <p className="login-card-subtitle text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Sign in with your administrative credentials to manage security operations, client triage, and threat intel.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form space-y-3">
            {/* Email or Identifier */}
            <div className="relative">
              <Mail
                className="login-input-icon absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@abhimanyuinfosec.com"
                className="w-full bg-[#111111] border border-white/10 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/40 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="login-input-icon absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Cryptographic key / password"
                className="w-full bg-[#111111] border border-white/10 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/40 rounded-xl pl-10 pr-11 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 transition"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Checkbox row */}
            <div className="login-remember-row flex items-center justify-between text-xs pt-0.5">
              <label className="login-remember-label flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox w-3.5 h-3.5 rounded bg-[#111111] border-white/10 text-brand-crimson focus:ring-brand-crimson/40 cursor-pointer accent-[#C1121F]"
                />
                <span className="login-remember-text">Remember session</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                RBAC Level 1
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn w-full py-3 px-4 bg-gradient-to-r from-[#CC2200] to-[#FF6600] hover:from-[#B31D00] hover:to-[#E55A00] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_22px_rgba(204,34,0,0.4)] hover:shadow-[0_6px_28px_rgba(255,102,0,0.45)] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer font-heading tracking-wide mt-1"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="login-submit-text">Authorize Session</span>
                  <ArrowRight size={15} className="login-submit-arrow" />
                </>
              )}
            </button>
          </form>

          {/* OR Divider */}
          <div className="login-or-divider relative flex items-center justify-center my-3">
            <div className="login-or-line border-t border-white/10 w-full" />
            <span className="login-or-text px-3 text-[10px] text-slate-400 font-semibold tracking-wider uppercase shrink-0 font-heading">
              OR
            </span>
            <div className="login-or-line border-t border-white/10 w-full" />
          </div>

          {/* Social Auth Buttons */}
          <div className="login-social-btns space-y-2">
            <button
              type="button"
              onClick={handleOAuthGitHub}
              className="login-social-btn login-github-btn w-full py-2.5 px-4 rounded-xl bg-[#111111] hover:bg-[#1a1a1a] border border-white/10 hover:border-brand-crimson/50 text-white text-xs font-medium transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="login-github-icon w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Authorize with GitHub</span>
            </button>

            <button
              type="button"
              onClick={handleOAuthGoogle}
              className="login-social-btn login-google-btn w-full py-2.5 px-4 rounded-xl bg-[#111111] hover:bg-[#1a1a1a] border border-white/10 hover:border-brand-crimson/50 text-white text-xs font-medium transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="login-google-icon w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
              <span>Authorize with Google</span>
            </button>
          </div>

          {/* Card Footer */}
          <div className="login-card-footer text-center text-[11px] sm:text-xs text-slate-400 mt-4 pt-3 border-t border-white/10">
            <Link
              to="/"
              className="text-brand-amber hover:text-brand-bright font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={12} /> Return to Public Website
            </Link>
          </div>
        </div>

        {/* Right Side: Security Telemetry & System Status */}
        <div className="login-right-content w-full lg:max-w-xl space-y-6 lg:pb-6 text-left self-center lg:self-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SOC COMMAND ONLINE</span>
            </div>
            <h2 className="login-hero-headline text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-heading">
              Operational Command.
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold ais-signature-gradient tracking-tight leading-tight font-heading">
              Autonomous Defense.
            </h2>
            <p className="login-hero-desc text-slate-700 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-md font-normal">
              High-assurance administrative environment for vulnerability intelligence, prospective client triage, and proprietary defense systems.
            </p>
          </div>

          {/* 4 Telemetry Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg">
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#0D0D0D]/70 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                ENCRYPTION PROTOCOL
              </span>
              <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold flex items-center gap-1.5">
                <Lock size={13} className="text-brand-crimson" /> AES-256-GCM
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#0D0D0D]/70 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                AUDIT LOGGING
              </span>
              <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold flex items-center gap-1.5">
                <Activity size={13} className="text-emerald-500" /> IMMUTABLE
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#0D0D0D]/70 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                SESSION GUARD
              </span>
              <span className="text-slate-900 dark:text-slate-200 font-mono font-semibold flex items-center gap-1.5">
                <KeyRound size={13} className="text-brand-amber" /> JWT ROTATION
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#0D0D0D]/70 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                SERVER TIME (UTC)
              </span>
              <span className="text-brand-crimson dark:text-brand-bright font-mono font-semibold text-[11px]">
                {time}
              </span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminLogin;
