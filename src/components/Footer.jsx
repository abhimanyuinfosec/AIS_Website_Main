import React from 'react';

const Footer = () => {
  return (
    <footer className="theme-dark" style={{ padding: '80px 0 40px', borderTop: '1px solid var(--border-dark)' }}>
      <div className="wrap footer-grid">
        <div>
          <a href="#" className="nav-brand" style={{ marginBottom: '1.5rem', display: 'flex' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '64px' }} />
          </a>
          <p className="muted" style={{ fontSize: '0.9rem' }}>
            AI-native cybersecurity for the modern enterprise. Defend your cloud, identity, and endpoints at machine speed.
          </p>
        </div>

        <div className="fcol">
          <h5>Platform</h5>
          <a href="#">Endpoint Security</a>
          <a href="#">Cloud Security</a>
          <a href="#">Identity Protection</a>
          <a href="#">Threat Intelligence</a>
        </div>

        <div className="fcol">
          <h5>Company</h5>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Newsroom</a>
          <a href="#">Contact</a>
        </div>

        <div className="fcol">
          <h5>Legal & Compliance</h5>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Trust Center</a>
          <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
            <div style={{ padding: '4px 8px', border: '1px solid var(--border-dark)', fontSize: '0.75rem', borderRadius: '4px' }}>SOC 2</div>
            <div style={{ padding: '4px 8px', border: '1px solid var(--border-dark)', fontSize: '0.75rem', borderRadius: '4px' }}>ISO 27001</div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ borderTop: '1px solid var(--border-dark)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
        <div className="muted">&copy; {new Date().getFullYear()} Abhimanyu InfoSec. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span className="muted">EN-US</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
