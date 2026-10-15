import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('pwa_prompt_dismissed');
    if (isDismissed) return;

    const handleBeforeInstallPrompt = (e) => {
      // Prevent browser's default mini-infobar
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      sessionStorage.setItem('pwa_installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="pwa-install-toast flex items-center gap-3.5 p-3 pr-4 rounded-2xl bg-white/95 dark:bg-[#0F0F11]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 shadow-[0_16px_36px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] text-slate-900 dark:text-white max-w-sm">
        <img
          src="/applogo.png"
          alt="Abhimanyu App Icon"
          className="w-12 h-12 rounded-xl object-contain shrink-0 p-1 bg-white border border-slate-200/80 shadow-xs"
        />
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-xs font-bold font-heading text-slate-900 dark:text-white tracking-tight truncate">
            Install Abhimanyu
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
            Fast, offline-ready security app
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C1121F] to-[#FF7A00] hover:brightness-105 active:scale-95 text-white font-medium text-xs shadow-md shadow-[#C1121F]/25 transition cursor-pointer"
          >
            <Download size={13} />
            <span>Install</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
            aria-label="Dismiss install prompt"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
