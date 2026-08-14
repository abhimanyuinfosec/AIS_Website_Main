import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import FadeIn from './FadeIn';

const CTABand = () => {
  return (
    <section className="cta-band section-padding">
      <FadeIn className="wrap text-center" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          Your business is already part of the digital battlefield.
        </h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.95 }}>
          Make sure you're prepared before the next threat arrives.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#services" className="btn cta-btn" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
            Secure Your Business <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn cta-btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
            Contact Abhimanyu InfoSec
          </a>
        </div>
      </FadeIn>
      <style dangerouslySetInnerHTML={{__html: `
        .cta-btn-outline {
          background-color: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.5);
          transition: all 0.2s ease;
        }
        .cta-btn-outline:hover {
          background-color: rgba(255,255,255,0.15);
          border-color: #fff;
          transform: translateY(-2px);
        }
      `}} />
    </section>
  );
};

export default CTABand;
