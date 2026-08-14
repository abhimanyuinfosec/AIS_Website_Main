import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="theme-dark" style={{ borderTop: '1px solid var(--border-dark)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="wrap">
        <div className="footer-grid">
          <div className="fcol" style={{ paddingRight: '2rem' }}>
            <img src="/logo.png" alt="Abhimanyu InfoSec" style={{ height: '56px' }} />
            <p className="muted" style={{ marginTop: '1.5rem', maxWidth: '300px', fontSize: '0.95rem' }}>
              Cybersecurity for businesses that cannot afford to be vulnerable.
            </p>
          </div>
          <div className="fcol">
            <h5>Navigation</h5>
            <Link to="/">Home</Link>
            <Link to="/about/why-abhimanyu">About</Link>
            <Link to="/services/security-assessment">Services</Link>
            <Link to="/technology/security-engineering">Technology</Link>
            <Link to="/insights/cybersecurity">Security Insights</Link>
            <a href="#contact">Contact</a>
          </div>
          <div className="fcol">
            <h5>Services</h5>
            <Link to="/services/security-assessment">Security Assessment</Link>
            <Link to="/services/web-application-security">Web Security</Link>
            <Link to="/services/network-security">Network Security</Link>
            <Link to="/services/penetration-testing">Penetration Testing</Link>
            <Link to="/services/threat-detection">Threat Detection</Link>
            <Link to="/services/security-engineering">Security Engineering</Link>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-dark)', color: 'var(--text-light-muted)', fontSize: '0.85rem' }}>
          <div>&copy; 2026 Abhimanyu InfoSec. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {/* Social links placeholder if accounts exist later */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
