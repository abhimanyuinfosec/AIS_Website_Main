import React from 'react';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="hero theme-dark">
      <div className="wrap hero-inner" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          
          <FadeIn yOffset={30}>
            <div className="mono-label" style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
              Autonomous Cybersecurity Platform
            </div>
            <h1>Defending Today's Businesses<br />Against Tomorrow's Threats.</h1>
            <p className="hero-desc" style={{ margin: '1.5rem 0 3rem 0', maxWidth: '600px' }}>
              From proactive threat detection to rapid incident response, we help organizations stay one step ahead of evolving cyber threats.
            </p>
            <div className="hero-ctas" style={{ justifyContent: 'flex-start' }}>
              <a href="#demo" className="btn btn-primary">
                Start free trial <ArrowRight size={18} />
              </a>
              <a href="#platform" className="btn btn-ghost">
                Explore the Platform
              </a>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default Hero;
