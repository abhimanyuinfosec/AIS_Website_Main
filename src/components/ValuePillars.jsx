import React from 'react';
import AnimatedShield from './AnimatedShield';
import AnimatedRadar from './AnimatedRadar';
import AnimatedLock from './AnimatedLock';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const ValuePillars = () => {
  const pillars = [
    {
      icon: <AnimatedShield className="pillar-icon" />,
      title: 'Proactive Threat Prevention',
      desc: 'Stop malware, ransomware, and fileless attacks before they execute with behavioral AI.'
    },
    {
      icon: <AnimatedRadar className="pillar-icon" />,
      title: 'Autonomous Response',
      desc: 'Instantly isolate compromised endpoints and kill malicious processes at machine speed.'
    },
    {
      icon: <AnimatedLock className="pillar-icon" />,
      title: 'Zero Trust Foundation',
      desc: 'Enforce least privilege access across your workforce and cloud infrastructure seamlessly.'
    }
  ];

  return (
    <section className="section-padding theme-dark" id="platform">
      <div className="wrap">
        <StaggerContainer className="grid-3">
          {pillars.map((pillar, idx) => (
            <StaggerItem key={idx} className="card pillar-card">
              <div style={{ display: 'flex' }}>
                {pillar.icon}
              </div>
              <h3>{pillar.title}</h3>
              <p className="muted">{pillar.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ValuePillars;
