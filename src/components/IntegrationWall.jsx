import React from 'react';
import FadeIn from './FadeIn';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const IntegrationWall = () => {
  const logos = [
    'AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Okta', 'Slack', 'Splunk', 'Datadog'
  ];

  return (
    <section className="section-padding theme-dark" style={{ borderTop: '1px solid var(--border-dark)' }}>
      <div className="wrap text-center">
        <FadeIn style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3>Works with your existing stack</h3>
        </FadeIn>
        <StaggerContainer className="integration-grid">
          {logos.map((logo, i) => (
            <StaggerItem key={i}>
              <div className="integration-logo">
                <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-light-muted)' }}>{logo}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default IntegrationWall;
