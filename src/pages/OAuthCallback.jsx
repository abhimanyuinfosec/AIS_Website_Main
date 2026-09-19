import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage(decodeURIComponent(error));
        return;
      }

      if (!token) {
        setStatus('error');
        setErrorMessage('Authentication handshake failed: No cryptographic token returned.');
        return;
      }

      try {
        const user = await setAuthToken(token);
        setStatus('success');

        // Clean URL params for security
        window.history.replaceState({}, document.title, window.location.pathname);

        // Redirect based on role
        setTimeout(() => {
          if (user && ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'].includes(user.role)) {
            navigate('/admin', { replace: true });
          } else {
            navigate('/portal', { replace: true });
          }
        }, 800);
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.message || 'Failed to initialize authenticated session.');
      }
    };

    handleAuth();
  }, [searchParams, setAuthToken, navigate]);

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25"></div>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-[#0B1120]/90 border border-slate-800 backdrop-blur-xl p-8 relative z-10 text-center shadow-[0_0_50px_rgba(6,182,212,0.12)]">
        {status === 'processing' && (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Loader2 size={28} className="animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">Authenticating Handshake</h2>
            <p className="text-xs text-slate-400 font-mono">
              Verifying cryptographic OAuth credentials with identity provider...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">Session Verified</h2>
            <p className="text-xs text-emerald-400/90 font-mono">
              Identity established. Redirecting to your secure console...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">Authentication Failed</h2>
              <p className="text-xs text-rose-400/90 mt-2 font-mono bg-rose-950/40 p-3 rounded-lg border border-rose-800/40">
                {errorMessage}
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              <span>Return to Sign In</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
