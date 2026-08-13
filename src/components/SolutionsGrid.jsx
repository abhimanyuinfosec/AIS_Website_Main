import React from 'react';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { StaggerContainer, StaggerItem } from './StaggerContainer';
import GlowCard from './GlowCard';

const SolutionsGrid = () => {
  const solutions = [
    {
      title: 'Secure Cloud Workloads',
      desc: 'Achieve unified visibility and protection across AWS, Azure, and Google Cloud environments.',
      img: 'linear-gradient(135deg, #0f131a 0%, #1a1f2e 100%)'
    },
    {
      title: 'Stop Identity Attacks',
      desc: 'Detect compromised credentials and lateral movement before attackers access critical systems.',
      img: 'linear-gradient(135deg, #161922 0%, #202638 100%)'
    },
    {
      title: 'Secure AI Adoption',
      desc: 'Govern LLM access and prevent data leakage as your organization integrates generative AI.',
      img: 'linear-gradient(135deg, #11151d 0%, #1e2436 100%)'
    }
  ];

  return (
    <section className="section-padding theme-dark" id="solutions">
      <div className="wrap">
        <FadeIn style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="mono-label" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'inline-block' }}>Platform Capabilities</span>
          <h2>Security built for engineering outcomes</h2>
        </FadeIn>
        
        <StaggerContainer className="grid-3">
          {solutions.map((sol, i) => (
            <StaggerItem key={i} style={{ height: '100%' }}>
              <GlowCard className="card sol-card" style={{ height: '100%' }}>
                <div className="sol-img-wrap">
                  <div className="sol-img ken-burns" style={{ background: sol.img }}></div>
                </div>
                <h3>{sol.title}</h3>
                <p className="muted">{sol.desc}</p>
                <a href="#learn-more" className="sol-link">
                  Learn more <ArrowRight size={16} />
                </a>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default SolutionsGrid;
