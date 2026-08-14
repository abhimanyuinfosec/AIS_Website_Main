import React from 'react';
import FadeIn from './FadeIn';

const TrustStrip = () => {
  const capabilities = [
    "Security Assessment",
    "Threat Detection",
    "Vulnerability Management",
    "Security Engineering",
    "Incident Readiness"
  ];

  return (
    <section className="trust-strip theme-dark" style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-dark)', background: 'var(--bg-dark-elevated)' }}>
      <div className="wrap">
        <FadeIn yOffset={0}>
          <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            gap: '1.5rem',
            color: 'var(--text-light-muted)',
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            {capabilities.map((cap, i) => (
              <React.Fragment key={i}>
                <span style={{ whiteSpace: 'nowrap' }}>{cap}</span>
                {i < capabilities.length - 1 && (
                  <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TrustStrip;
