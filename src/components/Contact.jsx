import React from 'react';
import { CheckCircle, Send } from 'lucide-react';

const Contact = () => {
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
          <form action="#" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (Frontend Demo)'); }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <input type="email" id="email" name="email" required placeholder="john@company.com" />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" required placeholder="Acme Corp" />
            </div>
            <button type="submit" className="btn-primary">
              Request Assessment
              <Send strokeWidth={2.5} size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
