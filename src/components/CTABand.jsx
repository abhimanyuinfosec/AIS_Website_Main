import React from 'react';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const CTABand = () => {
  return (
    <section className="cta-band section-padding">
      <FadeIn className="wrap text-center">
        <h2 style={{ marginBottom: '3rem' }}>Ready to modernize your defense?</h2>
        <a href="#demo" className="btn cta-btn" style={{ backgroundColor: '#fff', color: 'var(--accent-primary)', padding: '1rem 2.5rem' }}>
          Request a Demo <ArrowRight size={18} />
        </a>
      </FadeIn>
    </section>
  );
};

export default CTABand;
