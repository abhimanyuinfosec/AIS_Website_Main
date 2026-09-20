import React, { useState, useEffect, useRef } from 'react';
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
  KeyRound,
  HelpCircle,
  ChevronDown,
  Share2,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../services/api';

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
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const langRef = useRef(null);
  const { login, register, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Sync mode if user navigates via browser history
  useEffect(() => {
    if (location.pathname === '/register' || location.pathname === '/signup') {
      setMode('register');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? '/admin' : '/portal', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

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
        const loggedUser = await login(email, password);
        const destination = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'].includes(loggedUser.role)
          ? '/admin'
          : '/portal';
        navigate(destination, { replace: true });
      } else {
        await register(name, email, password);
        navigate('/portal', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
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
    switchMode('login');
    setEmail('admin@abhimanyuinfosec.com');
    setPassword('AdminSecurePassword2026!');
    setError('');
  };

  return (
    <div
      className="min-h-screen w-full relative text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login.jpg')",
      }}
    >
      {/* Background vignette & dark tint overlay to highlight MikroTik router, LEDs, and cables */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/92 via-[#030712]/65 to-[#030712]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/40 to-[#02050A]/90 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-5 pb-2 flex items-center justify-between">
        {/* Left: AIS Logo, Divider, Security Gateway */}
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="flex items-center">
            <span className="text-3xl sm:text-4xl font-black italic tracking-tighter bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent select-none drop-shadow-[0_2px_14px_rgba(56,189,248,0.45)] group-hover:brightness-110 transition-all">
              AIS
            </span>
          </div>

          <div className="h-6 sm:h-7 w-[1.5px] bg-slate-600/70" />

          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-slate-200 uppercase leading-tight font-sans">
              SECURITY GATEWAY
            </span>
            <span className="text-[9.5px] sm:text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
              Secure Access • Safer Tomorrow
            </span>
          </div>
        </Link>

        {/* Right: Help & Language Dropdown */}
        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            to="/contact"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <HelpCircle size={15} className="text-slate-400" />
            <span>Need help?</span>
          </Link>

          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>{selectedLang}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-xl bg-[#091122]/95 backdrop-blur-xl border border-white/10 shadow-2xl py-1 z-30 text-xs text-slate-300 animate-in fade-in zoom-in-95 duration-100">
                {['EN', 'FR', 'DE', 'ES', 'JA'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-blue-600/20 hover:text-white transition ${
                      selectedLang === lang ? 'text-blue-400 font-semibold' : ''
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-3 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 my-auto">
        {/* Left Side: Frosted Glass Auth Card */}
        <div className="w-full max-w-[420px] rounded-[24px] bg-[#0A1224]/65 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 sm:p-7 text-slate-100 relative transition-all duration-300">
          {/* Card Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {mode === 'login' ? (
                <>
                  Welcome <span className="text-blue-500">Back</span>
                </>
              ) : (
                <>
                  Create <span className="text-blue-500">Account</span>
                </>
              )}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
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
          <form onSubmit={handleSubmit} className="mt-4 space-y-2.5 sm:space-y-3">
            {/* Full Name (Sign Up only) */}
            {mode === 'register' && (
              <div className="relative">
                <UserIcon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-[#0B1528]/80 border border-slate-700/60 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
                />
              </div>
            )}

            {/* Email or Username */}
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === 'login' ? 'Email or username' : 'Work email address'}
                className="w-full bg-[#0B1528]/80 border border-slate-700/60 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Password (min. 8 characters)' : 'Password'}
                className="w-full bg-[#0B1528]/80 border border-slate-700/60 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 rounded-xl pl-10 pr-11 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 transition"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {mode === 'register' && (
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-[#0B1528]/80 border border-slate-700/60 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 rounded-xl pl-10 pr-11 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 transition"
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            )}

            {/* Checkbox row */}
            {mode === 'login' ? (
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-[#0B1528] border-slate-700 text-blue-600 focus:ring-blue-500/40 cursor-pointer accent-blue-600"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setError(
                      'Password reset link will be sent to your registered email address.'
                    )
                  }
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
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
                    className="w-3.5 h-3.5 rounded bg-[#0B1528] border-slate-700 text-blue-600 focus:ring-blue-500/40 cursor-pointer accent-blue-600 shrink-0"
                  />
                  <span className="leading-snug text-slate-400 text-[11px] sm:text-xs">
                    I agree to the{' '}
                    <Link to="/about/mission" className="text-blue-400 hover:underline">
                      Terms
                    </Link>{' '}
                    &amp;{' '}
                    <Link to="/about/mission" className="text-blue-400 hover:underline">
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
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_22px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.6)] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-700/60 w-full" />
            <span className="px-3 text-[10px] text-slate-400 font-semibold tracking-wider uppercase shrink-0">
              OR
            </span>
            <div className="border-t border-slate-700/60 w-full" />
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleOAuthGitHub}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0B1528]/60 hover:bg-[#111f38] border border-slate-700/60 hover:border-slate-500/80 text-white text-xs font-medium transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>

            <button
              type="button"
              onClick={handleOAuthGoogle}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0B1528]/60 hover:bg-[#111f38] border border-slate-700/60 hover:border-slate-500/80 text-white text-xs font-medium transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
          <div className="text-center text-[11px] sm:text-xs text-slate-400 mt-4">
            {mode === 'login' ? (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
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
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Value Proposition & Feature Pillars */}
        <div className="w-full lg:max-w-xl space-y-6 lg:pb-6 text-left self-center lg:self-end">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight">
              Stronger Security.
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-blue-500 tracking-tight leading-tight">
              Smarter Business.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-md font-normal">
              We build secure, scalable cybersecurity solutions to protect your digital assets and keep
              your business moving forward.
            </p>
          </div>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {/* 1. Detect */}
            <div className="flex items-start gap-2.5">
              <div className="text-blue-400 mt-0.5 shrink-0">
                <Shield size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">Detect</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Threats early</div>
              </div>
            </div>

            {/* 2. Prevent */}
            <div className="flex items-start gap-2.5">
              <div className="text-blue-400 mt-0.5 shrink-0">
                <Lock size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">Prevent</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Attacks &amp; breaches</div>
              </div>
            </div>

            {/* 3. Respond */}
            <div className="flex items-start gap-2.5">
              <div className="text-blue-400 mt-0.5 shrink-0">
                <Share2 size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">Respond</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Faster</div>
              </div>
            </div>

            {/* 4. Secure */}
            <div className="flex items-start gap-2.5">
              <div className="text-blue-400 mt-0.5 shrink-0">
                <ShieldCheck size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">Secure</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Your future</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Discrete Super Admin Credentials Demo Trigger */}
      <div className="relative z-20 pb-3 pr-4 flex justify-end">
        <button
          type="button"
          onClick={handleFillDemo}
          title="Auto-fill admin demo credentials"
          className="text-[10px] font-mono text-slate-500 hover:text-slate-300 bg-slate-900/50 hover:bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/5 transition flex items-center gap-1.5 opacity-60 hover:opacity-100 cursor-pointer"
        >
          <KeyRound size={11} className="text-blue-400" />
          <span>Demo Admin Credentials</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
