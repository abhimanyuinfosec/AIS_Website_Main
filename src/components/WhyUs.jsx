import React from 'react';
import FadeIn from './FadeIn';
import { StaggerContainer, StaggerItem } from './StaggerContainer';
import { Search, Shield, Crosshair, AlertTriangle } from 'lucide-react';

const WhyUs = () => {
  const cards = [
    {
      icon: <Search size={32} className="pillar-icon" style={{ filter: 'none', color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />,
      title: 'Understand',
      desc: 'Identify vulnerabilities, risks, exposed assets, and weaknesses across your business.'
    },
    {
      icon: <Shield size={32} className="pillar-icon" style={{ filter: 'none', color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />,
      title: 'Protect',
      desc: 'Strengthen applications, infrastructure, networks, and business systems against sophisticated attacks.'
    },
    {
      icon: <Crosshair size={32} className="pillar-icon" style={{ filter: 'none', color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />,
      title: 'Detect',
      desc: 'Actively monitor environments to identify suspicious activity and emerging threats in real-time.'
    },
    {
      icon: <AlertTriangle size={32} className="pillar-icon" style={{ filter: 'none', color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />,
      title: 'Respond',
      desc: 'Help businesses prepare for, contain, and decisively respond to critical security incidents.'
    }
  ];

  return (
    <section className="section-padding theme-dark" id="why-us">
      <div className="wrap">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div className="mono-label" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              Why Abhimanyu InfoSec?
            </div>
            <h2>Security shouldn't be complicated.<br/>It should be dependable.</h2>
            <p className="muted" style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>
              Many businesses struggle to maintain strong cybersecurity because existing solutions are often expensive, complex, fragmented, or difficult to understand. We exist to change that. 
              We make practical, business-focused protection accessible to growing organizations through clear reporting, proactive detection, cost-conscious strategies, and continuous improvement.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {cards.map((card, idx) => (
            <StaggerItem key={idx} className="card pillar-card">
              <div style={{ display: 'flex' }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>{card.title}</h3>
              <p className="muted" style={{ fontSize: '0.95rem' }}>{card.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyUs;
