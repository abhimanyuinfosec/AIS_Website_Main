import React from 'react';
import FadeIn from './FadeIn';
import { Cpu, Terminal, Network, ShieldCog } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const SecurityEngineering = () => {
  const techData = [
    {
      icon: <Network size={28} strokeWidth={1.5} />,
      title: 'Hybrid IDS',
      tag: 'Internal Technology',
      desc: 'Intelligent intrusion detection combining multiple detection approaches and anomaly analysis.'
    },
    {
      icon: <Terminal size={28} strokeWidth={1.5} />,
      title: 'AutoRed APT',
      tag: 'Research & Development',
      desc: 'Automated penetration testing and security assessment orchestration for scalable security validation.'
    },
    {
      icon: <Cpu size={28} strokeWidth={1.5} />,
      title: 'IP Intelligence',
      tag: 'Internal Technology',
      desc: 'Advanced threat intelligence and IP reputation analysis capabilities powering our monitoring.'
    }
  ];

  return (
    <section className="section-padding theme-dark" id="technology" style={{ borderTop: '1px solid var(--border-dark)', borderBottom: '1px solid var(--border-dark)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <FadeIn xOffset={-30} yOffset={0}>
            <div style={{ maxWidth: '500px' }}>
              <div className="mono-label" style={{ color: 'var(--accent-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCog size={16} /> Technology & Research
              </div>
              <h2 style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}>Built with Security Engineering at the Core</h2>
              <p className="muted" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Unlike ordinary consulting firms that rely entirely on third-party tools, our <strong>Security Services</strong> are backed by our dedicated <strong>Security Technology & Research</strong> division.
              </p>
              <p className="muted" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                We actively build proprietary internal tools and conduct deep security research. This engineering-first approach allows us to deliver advanced capabilities, uncover novel threats, and provide a higher standard of protection for our clients.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {techData.map((tech, idx) => (
              <StaggerItem key={idx} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem 2rem', background: 'var(--bg-dark-elevated)' }}>
                <div style={{ 
                  color: 'var(--accent-secondary)', 
                  background: 'rgba(0, 229, 255, 0.1)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)',
                  flexShrink: 0
                }}>
                  {tech.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{tech.title}</h4>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '4px 8px', 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      border: '1px solid var(--border-dark)', 
                      borderRadius: '4px',
                      color: 'var(--text-light-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap'
                    }}>
                      {tech.tag}
                    </span>
                  </div>
                  <p className="muted" style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>{tech.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </div>
    </section>
  );
};

export default SecurityEngineering;
