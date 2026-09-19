import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
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
  CheckCircle2,
  Cpu,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../services/api';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

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

  const handleFillDemo = () => {
    setEmail('admin@abhimanyuinfosec.com');
    setPassword('AdminSecurePassword2026!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Cyber Ambient Lights & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25"></div>
      </div>

      {/* Main Split Grid Card */}
      <div className="w-full max-w-5xl rounded-3xl bg-[#0B1120]/80 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.15)] relative z-10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Security Telemetry & Brand Showcase */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-gradient-to-br from-[#070B14] via-[#0C121D] to-[#070B14] border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between relative">
          <div className="space-y-8">
            {/* Logo and Security Portal Badge */}
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Abhimanyu InfoSec"
                  className="h-20 sm:h-24 w-auto max-w-[320px] sm:max-w-[380px] object-contain mix-blend-screen filter drop-shadow-[0_2px_22px_rgba(0,240,255,0.55)] hover:drop-shadow-[0_2px_32px_rgba(0,240,255,0.85)] hover:scale-[1.02] transition-all duration-300"
                />
              </Link>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SOC ONLINE</span>
              </div>
            </div>

            {/* Portal Headline */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                <Terminal size={13} /> SECURE COMMAND INTERFACE
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug font-display">
                Abhimanyu InfoSec <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  Control Console
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                High-assurance administrative environment for vulnerability intelligence, prospective client triage, and proprietary defense systems.
              </p>
            </div>

            {/* Live Security Specifications */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">ENCRYPTION PROTOCOL</span>
                <span className="text-slate-200 font-mono font-semibold flex items-center gap-1.5">
                  <Lock size={12} className="text-cyan-400" /> AES-256-GCM
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">AUDIT LOGGING</span>
                <span className="text-slate-200 font-mono font-semibold flex items-center gap-1.5">
                  <Activity size={12} className="text-emerald-400" /> IMMUTABLE
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">SESSION GUARD</span>
                <span className="text-slate-200 font-mono font-semibold flex items-center gap-1.5">
                  <KeyRound size={12} className="text-blue-400" /> JWT ROTATION
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">SERVER TIME (UTC)</span>
                <span className="text-cyan-300 font-mono font-semibold text-[11px]">
                  {time}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Security Notice */}
          <div className="pt-8 mt-8 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>STRICT ROLE-BASED ACCESS</span>
            <Link to="/" className="text-cyan-400 hover:underline flex items-center gap-1">
              <ArrowLeft size={12} /> Public Site
            </Link>
          </div>
        </div>

        {/* Right Side: Authentication Terminal */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-[#0B1120]/90">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase mb-2">
                <Fingerprint size={12} /> Operator Authentication
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Verify Identity Credentials
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your administrative keypair to access the security command node.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs animate-shake">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">{error}</div>
              </div>
            )}

            {/* OAuth Quick Auth */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => { window.location.href = `${API_BASE_URL}/auth/google`; }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 text-white text-xs font-medium transition flex items-center justify-center gap-3 shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => { window.location.href = `${API_BASE_URL}/auth/github`; }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 text-white text-xs font-medium transition flex items-center justify-center gap-3 shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-[#0B1120] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
                Or with operator credentials
              </span>
              <div className="border-t border-slate-800 w-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider font-mono text-[11px]">
                  Administrative Identifier (Email)
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    size={16}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@abhimanyuinfosec.com"
                    className="w-full bg-[#070B14] border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 outline-none transition text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider font-mono text-[11px]">
                    Cryptographic Key / Password
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    size={16}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-[#070B14] border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-10 pr-11 py-3 text-white placeholder-slate-600 outline-none transition text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-200 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Authorize Session</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Helper */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-[11px] font-mono transition flex items-center justify-center gap-2"
              >
                <KeyRound size={13} />
                <span>Auto-Fill Super Admin Credentials</span>
              </button>
              <span className="text-[10px] text-slate-500 text-center font-mono">
                Unauthorized access attempts are monitored and recorded to the immutable audit ledger.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
