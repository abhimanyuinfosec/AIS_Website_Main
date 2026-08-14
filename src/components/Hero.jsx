import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="hero theme-dark">
      <div className="wrap hero-inner" style={{ width: '100%', position: 'relative', zIndex: 1, maxWidth: '100%', margin: 0 }}>
        <div className="hero-content" style={{ maxWidth: '60%' }}>
          
          <FadeIn yOffset={30}>
            <div className="mono-label" style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
              Autonomous Cybersecurity Platform
            </div>
            <h1>Break Through<br />Any Formation.</h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-light)', marginTop: '1rem', maxWidth: '600px' }}>
              Cybersecurity built for businesses that cannot afford to be vulnerable.
            </h2>
            <p className="hero-desc" style={{ margin: '1.5rem 0 2.5rem 0', maxWidth: '600px', fontSize: '1.1rem' }}>
              Abhimanyu InfoSec helps businesses identify vulnerabilities, detect threats, strengthen security, and build resilient digital infrastructure.
            </p>
            
            <div className="hero-ctas" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
              <a href="#services" className="btn btn-primary">
                Secure Your Business <ArrowRight size={18} />
              </a>
              <a href="#platform" className="btn btn-ghost">
                Explore Our Services
              </a>
            </div>

            <div className="trust-line" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-light-muted)' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Cybersecurity &bull; Threat Detection &bull; Security Assessment &bull; Continuous Protection</span>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default Hero;
