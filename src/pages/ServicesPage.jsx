import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert, Globe, Network, Bug, Activity,
  Settings, Search, ShieldCheck, CheckCircle, Send, AlertCircle,
} from 'lucide-react';
import api from '../services/api';

const servicesCatalog = [
  { slug: 'security-assessment',         icon: ShieldAlert,  name: 'Security Assessment' },
  { slug: 'web-application-security',    icon: Globe,        name: 'Web Application Security' },
  { slug: 'network-security',            icon: Network,      name: 'Network Security' },
  { slug: 'penetration-testing',         icon: Bug,          name: 'Penetration Testing' },
  { slug: 'threat-detection',            icon: Activity,     name: 'Threat Detection & Monitoring' },
  { slug: 'security-hardening',          icon: Settings,     name: 'Security Hardening' },
  { slug: 'attack-surface-intelligence', icon: Search,       name: 'Attack Surface Intelligence' },
  { slug: 'incident-readiness',          icon: ShieldCheck,  name: 'Incident Readiness' },
  { slug: 'security-engineering',        icon: Settings,     name: 'Security Engineering' },
];

const ServicesPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const activeService = slug
    ? servicesCatalog.find(s => s.slug === slug) || servicesCatalog[0]
    : servicesCatalog[0];

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', timeline: 'Within 2 Weeks', notes: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError]         = useState('');

  useEffect(() => {
    setFormSubmitted(false);
    setFormError('');
    window.scrollTo(0, 0);
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitting(true);
    try {
      const res = await api.post('/contact', {
        name:         formData.name,
        email:        formData.email,
        organization: formData.company,
        service:      activeService.name,
        message: `Scoping request for ${activeService.name}. Timeline: ${formData.timeline}.${formData.notes ? ' Details: ' + formData.notes : ''}`,
      });
      if (res.success) setFormSubmitted(true);
    } catch (err) {
      setFormError(err.message || 'Failed to send. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', color: '#fff',
    fontFamily: 'Inter, sans-serif', fontSize: '0.875rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const labelStyle = {
    display: 'block', fontFamily: 'Inter, sans-serif',
    fontSize: '0.78rem', color: '#94A3B8',
    marginBottom: '6px', fontWeight: 500,
  };

  return (
    <div style={{ background: '#050914', minHeight: '100vh', color: '#F8FAFC' }}>
      <section style={{ padding: '80px 0 100px' }}>
        <div className="wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '72px',
            alignItems: 'flex-start',
          }}>

            {/* ── LEFT — pitch copy ── */}
            <div>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
                letterSpacing: '0.14em', color: '#1a7dc4',
                textTransform: 'uppercase', marginBottom: '18px',
              }}>
                GET STARTED
              </p>

              {/* Service selector pills */}
              <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {servicesCatalog.map(s => (
                  <button
                    key={s.slug}
                    onClick={() => navigate(`/services/${s.slug}`)}
                    style={{
                      padding: '5px 12px', borderRadius: '20px', cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500,
                      background: s.slug === activeService.slug ? '#1a7dc4' : 'rgba(255,255,255,0.04)',
                      color:      s.slug === activeService.slug ? '#fff'    : '#94A3B8',
                      border:     s.slug === activeService.slug ? '1px solid #1a7dc4' : '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              <h1 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '18px',
              }}>
                Request a {activeService.name} Scoping Briefing
              </h1>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                color: '#94A3B8', lineHeight: 1.8, marginBottom: '32px',
              }}>
                Provide your target environment outline. Our lead security analysts will
                review the scope and provide a formal proposal with exact timelines and
                CVSS metrics within 4 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Mutual Non-Disclosure Agreement (NDA) executed',
                  'Free 30-Day Vulnerability Patch Re-Test included',
                  'Board-level Executive Summary & Attestation Letter',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle size={18} style={{ color: '#1a7dc4', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#CBD5E1' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — form ── */}
            <div style={{
              background: '#0a1020',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '36px',
            }}>
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <CheckCircle size={48} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                  <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', marginBottom: '10px', fontSize: '1.4rem' }}>
                    Request Received
                  </h2>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#94A3B8', marginBottom: '24px' }}>
                    Our security team will review your scope and contact you within 4 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    style={{
                      padding: '8px 22px', background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px',
                      color: '#94A3B8', cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                    }}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {formError && (
                    <div style={{
                      padding: '10px 14px', borderRadius: '6px',
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                      color: '#f87171', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif',
                      display: 'flex', gap: '8px', alignItems: 'center',
                    }}>
                      <AlertCircle size={14} /> {formError}
                    </div>
                  )}

                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text" required placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Work Email Address *</label>
                    <input
                      type="email" required placeholder="john@organization.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Company / Organization *</label>
                    <input
                      type="text" required placeholder="Acme Security Corp"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="Urgent (Within 48h)">Urgent (Within 48 Hours)</option>
                      <option value="Within 2 Weeks">Within 2 Weeks</option>
                      <option value="Next Month">Next Month</option>
                      <option value="Compliance Audit Window">Compliance Audit Window</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Environment Details / Target Scope</label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      placeholder="e.g. 15 REST API endpoints, 2 AWS VPC accounts, web application..."
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    style={{
                      width: '100%', padding: '13px',
                      background: '#1a7dc4', color: '#fff',
                      border: 'none', borderRadius: '6px',
                      fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                      cursor: formSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      opacity: formSubmitting ? 0.7 : 1,
                      transition: 'background 0.2s, opacity 0.2s',
                    }}
                  >
                    {formSubmitting ? (
                      <>
                        <div style={{
                          width: '16px', height: '16px',
                          border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff',
                          borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                        }} />
                        Submitting…
                      </>
                    ) : (
                      <><Send size={16} /> Submit Scoping Briefing</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, textarea:focus, select:focus {
          border-color: rgba(26,125,196,0.5) !important;
          box-shadow: 0 0 0 3px rgba(26,125,196,0.08);
        }
        select option { background: #0a1020; color: #fff; }
        @media (max-width: 768px) {
          .wrap > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      ` }} />
    </div>
  );
};

export default ServicesPage;
