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
  Share2,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';
import { API_BASE_URL, prewarmBackend, initiateOAuthRedirect } from '../services/api';

export const LoginPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Detect mode based on path or query param
  const isRegisterRoute =
    location.pathname === '/register' ||
    location.pathname === '/signup' ||
    searchParams.get('mode') === 'register';

  const [mode, setMode] = useState(isRegisterRoute ? 'register' : 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // 'google' | 'github' | null
  const [oauthStatus, setOauthStatus] = useState('');

  const { login, register, isAuthenticated, isAdmin } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Pre-warm backend immediately when visiting the login page
  useEffect(() => {
    prewarmBackend();
  }, []);

  // Sync mode if user navigates via browser history
  useEffect(() => {
    if (location.pathname === '/register' || location.pathname === '/signup') {
      setMode('register');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  // Redirect if authenticated - always redirect to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMessage('');
    // Update path without full page reload
    window.history.replaceState(null, '', newMode === 'register' ? '/signup' : '/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (mode === 'register') {
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setError('Please agree to the Terms of Service & Privacy Policy.');
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/', { replace: true });
      } else {
        await register(name, email, password);
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
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
        <div className="login-auth-card w-full max-w-[420px] rounded-[24px] bg-[#0D0D0D]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 sm:p-7 text-slate-100 relative transition-all duration-300">
          {/* OAuth Connecting / Cold Start Screen */}
          {oauthLoading && (
            <div className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-xl rounded-[24px] z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200 border border-white/10">
              <div className="w-12 h-12 rounded-full border-2 border-brand-crimson border-t-transparent animate-spin mb-4 shadow-[0_0_15px_rgba(204,34,0,0.4)]" />
              <h3 className="text-base font-bold text-white mb-2 font-heading tracking-wide">
                {oauthLoading === 'google' ? 'Connecting with Google' : 'Connecting with GitHub'}
              </h3>
              <p className="text-xs text-slate-300 max-w-xs leading-relaxed font-mono">
                {oauthStatus || 'Initializing secure cryptographic handshake...'}
              </p>
              <div className="mt-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero-Trust Session Handshake</span>
              </div>
            </div>
          )}

          {/* Card Title */}
          <div className="login-card-header">
            <h1 className="login-card-title text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
              {mode === 'login' ? (
                <>
                  <span className="login-title-lead text-slate-900 dark:text-white">Welcome</span>{' '}
                  <span className="ais-signature-gradient">Back</span>
                </>
              ) : (
                <>
                  <span className="login-title-lead text-slate-900 dark:text-white">Create</span>{' '}
                  <span className="ais-signature-gradient">Account</span>
                </>
              )}
            </h1>
            <p className="login-card-subtitle text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              {mode === 'login'
                ? 'Sign in to your AIS Security Platform account to continue to a safer digital world.'
                : 'Sign up for your AIS Security Platform account to enter a safer digital world.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
              <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form mt-4 space-y-2.5 sm:space-y-3">
            {/* Full Name (Sign Up only) */}
            {mode === 'register' && (
              <div className="relative">
                <UserIcon
                  className="login-input-icon absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-[#111111] border border-white/10 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/40 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
                />
              </div>
            )}

            {/* Email or Username */}
            <div className="relative">
              <Mail
                className="login-input-icon absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === 'login' ? 'Email or username' : 'Work email address'}
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
                placeholder={mode === 'register' ? 'Password (min. 8 characters)' : 'Password'}
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

            {/* Confirm Password (Sign Up only) */}
            {mode === 'register' && (
              <div className="relative">
                <Lock
                  className="login-input-icon absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-[#111111] border border-white/10 focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson/40 rounded-xl pl-10 pr-11 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="login-password-toggle absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 transition"
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            )}

            {/* Checkbox row */}
            {mode === 'login' ? (
              <div className="login-remember-row flex items-center justify-between text-xs pt-0.5">
                <label className="login-remember-label flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="login-checkbox w-3.5 h-3.5 rounded bg-[#111111] border-white/10 text-brand-crimson focus:ring-brand-crimson/40 cursor-pointer accent-[#C1121F]"
                  />
                  <span className="login-remember-text">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setError(
                      'Password reset link will be sent to your registered email address.'
                    )
                  }
                  className="login-forgot-btn text-brand-amber hover:text-brand-bright font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <div className="pt-0.5">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-[#111111] border-white/10 text-brand-crimson focus:ring-brand-crimson/40 cursor-pointer accent-[#C1121F] shrink-0"
                  />
                  <span className="leading-snug text-slate-400 text-[11px] sm:text-xs">
                    I agree to the{' '}
                    <Link to="/about/mission" className="text-brand-amber hover:underline">
                      Terms
                    </Link>{' '}
                    &amp;{' '}
                    <Link to="/about/mission" className="text-brand-amber hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn w-full py-3 px-4 bg-gradient-to-r from-[#CC2200] to-[#FF6600] hover:from-[#B31D00] hover:to-[#E55A00] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_22px_rgba(204,34,0,0.4)] hover:shadow-[0_6px_28px_rgba(255,102,0,0.45)] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer font-heading tracking-wide"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="login-submit-text">{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
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
              <span>Continue with GitHub</span>
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
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Card Footer Mode Switch */}
          <div className="login-card-footer text-center text-[11px] sm:text-xs text-slate-400 mt-4">
            {mode === 'login' ? (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="text-brand-amber hover:text-brand-bright font-medium transition-colors cursor-pointer"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-brand-amber hover:text-brand-bright font-medium transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Value Proposition & Feature Pillars */}
        <div className="login-right-content w-full lg:max-w-xl space-y-6 lg:pb-6 text-left self-center lg:self-end">
          <div>
            <h2 className="login-hero-headline text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-heading">
              Stronger Security.
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold ais-signature-gradient tracking-tight leading-tight font-heading">
              Smarter Business.
            </h2>
            <p className="login-hero-desc text-slate-700 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-md font-normal">
              We build secure, scalable cybersecurity solutions to protect your digital assets and keep
              your business moving forward.
            </p>
          </div>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {/* 1. Detect */}
            <div className="flex items-start gap-2.5">
              <div className="text-brand-crimson mt-0.5 shrink-0">
                <Shield size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="login-pillar-title text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight font-heading">Detect</div>
                <div className="login-pillar-subtitle text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">Threats early</div>
              </div>
            </div>

            {/* 2. Prevent */}
            <div className="flex items-start gap-2.5">
              <div className="text-brand-bright mt-0.5 shrink-0">
                <Lock size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="login-pillar-title text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight font-heading">Prevent</div>
                <div className="login-pillar-subtitle text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">Attacks &amp; breaches</div>
              </div>
            </div>

            {/* 3. Respond */}
            <div className="flex items-start gap-2.5">
              <div className="text-brand-amber mt-0.5 shrink-0">
                <Share2 size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="login-pillar-title text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight font-heading">Respond</div>
                <div className="login-pillar-subtitle text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">Faster</div>
              </div>
            </div>

            {/* 4. Secure */}
            <div className="flex items-start gap-2.5">
              <div className="text-brand-crimson mt-0.5 shrink-0">
                <ShieldCheck size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="login-pillar-title text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight font-heading">Secure</div>
                <div className="login-pillar-subtitle text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">Your future</div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default LoginPage;
