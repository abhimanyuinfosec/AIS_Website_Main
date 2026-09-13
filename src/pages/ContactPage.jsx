import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Shield, CheckCircle2, AlertCircle, Clock, Lock } from 'lucide-react';
import api from '../services/api';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    service: 'Security Assessment',
    message: '',
    honeypot: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await api.post('/contact', formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          organization: '',
          phone: '',
          service: 'Security Assessment',
          message: '',
          honeypot: '',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to dispatch security inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            <Mail size={14} /> SECURE COMMUNICATIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Initiate Confidential <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Security Scoping</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            All inquiries are treated under strict confidentiality protocols. Our technical triage team responds within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & SLA Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#0b1120] border border-cyan-500/20 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield size={20} className="text-cyan-400" />
                <span>Operational Headquarters</span>
              </h2>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Direct Triage Channel</div>
                    <div className="font-semibold text-white font-mono mt-0.5">contact@abhimanyuinfosec.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Emergency Security Line</div>
                    <div className="font-semibold text-white font-mono mt-0.5">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Triage Response SLA</div>
                    <div className="font-semibold text-white mt-0.5">&lt; 4 Hours Response Window</div>
                  </div>
                </div>
              </div>
            </div>

            {/* NDA & Data Handling Notice */}
            <div className="p-6 rounded-2xl bg-[#070b14] border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold font-mono text-[11px]">
                <Lock size={14} className="text-emerald-400" />
                <span>CONFIDENTIALITY & NDA PROTOCOL</span>
              </div>
              <p className="leading-relaxed">
                We execute mutual non-disclosure agreements (NDAs) prior to scoping sensitive environments, source code reviews, or red team operations.
              </p>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Dispatched Successfully</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Abhimanyu InfoSec. Our senior technical team has received your briefing and will contact you via your specified communication channel shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {error && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Honeypot for bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@organization.com"
                      className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Organization / Entity</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Acme Corp / Independent"
                      className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Area of Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-white outline-none"
                  >
                    <option value="Security Assessment">Security Assessment & Vulnerability Audit</option>
                    <option value="Web Application Security">Web Application & API Security</option>
                    <option value="Network Security">Network & Perimeter Defense</option>
                    <option value="Penetration Testing">Offensive Penetration Testing / Red Team</option>
                    <option value="Threat Detection">Threat Detection (Hybrid IDS / SANJAY)</option>
                    <option value="Incident Readiness">Incident Readiness & Emergency Retainer</option>
                    <option value="Custom Engineering">Custom Security Engineering / R&D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Scope Details & Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your environment (number of endpoints/APIs, target timelines, specific compliance frameworks)..."
                    className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-white outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Transmit Scoping Request</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
