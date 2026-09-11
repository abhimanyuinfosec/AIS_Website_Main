import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, RefreshCw } from 'lucide-react';
import api from '../../services/api';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    'site.name': 'Abhimanyu InfoSec',
    'site.tagline': 'Cybersecurity for businesses that cannot afford to be vulnerable.',
    'site.email': 'contact@abhimanyuinfosec.com',
    'site.phone': '+91 98765 43210',
    'hero.title': 'Break Through Any Formation.',
    'hero.subtitle': 'Cybersecurity built for businesses that cannot afford to be vulnerable.',
    'hero.desc': 'Abhimanyu InfoSec helps businesses identify vulnerabilities, detect threats, strengthen security, and build resilient digital infrastructure.',
    'stats.projectsCompleted': '50+',
    'stats.researchInitiatives': '12+',
    'stats.toolsDeveloped': '8+',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/settings');
      if (res.success && res.data) {
        setSettings((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await api.post('/settings/bulk', { settings });
      if (res.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      alert(err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Settings size={20} className="text-cyan-400" />
            <span>Site Content Management (CMS)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure global website headlines, telemetry metrics, and contact routing.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : savedSuccess ? (
            <CheckCircle size={14} className="text-black" />
          ) : (
            <Save size={14} />
          )}
          <span>{saving ? 'Syncing...' : savedSuccess ? 'Saved & Live!' : 'Save CMS Settings'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
          <CheckCircle size={14} />
          <span>Site settings successfully synchronized with PostgreSQL database.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Hero Section Copy */}
        <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 text-cyan-400">
            Landing Hero Section
          </h2>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Hero Main Headline</label>
            <input
              type="text"
              value={settings['hero.title'] || ''}
              onChange={(e) => handleChange('hero.title', e.target.value)}
              className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Hero Sub-headline / Tagline</label>
            <input
              type="text"
              value={settings['hero.subtitle'] || ''}
              onChange={(e) => handleChange('hero.subtitle', e.target.value)}
              className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Hero Body Narrative</label>
            <textarea
              rows={3}
              value={settings['hero.desc'] || ''}
              onChange={(e) => handleChange('hero.desc', e.target.value)}
              className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Live Metrics / Counters */}
        <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 text-cyan-400">
            Live Trust Strip & Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Projects Completed Metric</label>
              <input
                type="text"
                value={settings['stats.projectsCompleted'] || ''}
                onChange={(e) => handleChange('stats.projectsCompleted', e.target.value)}
                className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-center text-sm font-bold text-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Research Papers Metric</label>
              <input
                type="text"
                value={settings['stats.researchInitiatives'] || ''}
                onChange={(e) => handleChange('stats.researchInitiatives', e.target.value)}
                className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-center text-sm font-bold text-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tools Developed Metric</label>
              <input
                type="text"
                value={settings['stats.toolsDeveloped'] || ''}
                onChange={(e) => handleChange('stats.toolsDeveloped', e.target.value)}
                className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-center text-sm font-bold text-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Global Contact & Identity */}
        <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 text-cyan-400">
            Contact & Identity Channels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Primary Triage Email</label>
              <input
                type="email"
                value={settings['site.email'] || ''}
                onChange={(e) => handleChange('site.email', e.target.value)}
                className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Direct Secure Line / Phone</label>
              <input
                type="text"
                value={settings['site.phone'] || ''}
                onChange={(e) => handleChange('site.phone', e.target.value)}
                className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
