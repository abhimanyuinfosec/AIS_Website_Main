import React, { useState } from 'react';
import { CheckCircle, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('General Assessment');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/contact', {
        name,
        email,
        organization: company,
        service: 'Security Assessment Scoping',
        message: message || `Quick scoping request from homepage by ${name} (${company}).`,
      });

      if (res.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cta-band section-padding" id="contact">
      <div className="wrap cta-inner fade-up">
        <div>
          <h2>Ready to test your defenses?</h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '1rem', fontSize: '1.125rem' }}>
            Secure your perimeter, assess your infrastructure, or prepare for compliance. Our team is ready to deploy.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
              <CheckCircle color="var(--gold-1)" size={20} /> Detailed scoping within 24 hours
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
              <CheckCircle color="var(--gold-1)" size={20} /> Executive and engineering-level reporting
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
              <CheckCircle color="var(--gold-1)" size={20} /> Dedicated remediation support
            </li>
          </ul>
        </div>

        <div className="lead-form glass">
          {submitted ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#10b981' }}>
              <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Scoping Request Received</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>
                Thank you. Our security analysts will review your environment and contact you within 4 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-primary"
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ padding: '0.75rem', marginBottom: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.75rem' }}>
                  {error}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Work Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Transmitting Request...' : 'Request Assessment'}
                <Send strokeWidth={2.5} size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
