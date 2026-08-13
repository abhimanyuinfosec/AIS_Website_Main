import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const TrustStrip = () => {
  const logos = ['ACME CORP', 'GLOBEX', 'SOYLENT', 'INITECH', 'UMBRELLA', 'STARK IND', 'WAYNE ENT'];
  
  // Double the logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="trust-strip theme-dark" style={{ overflow: 'hidden' }}>
      <div className="wrap">
        <FadeIn style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Trusted by security-first enterprises globally
        </FadeIn>
      </div>
      
      {/* Marquee container */}
      <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
        <FadeIn yOffset={0}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            style={{ display: 'flex', gap: '4rem', paddingLeft: '4rem', alignItems: 'center' }}
          >
            {duplicatedLogos.map((logo, i) => (
              <div key={i} className="trust-logo" style={{ flexShrink: 0, opacity: 0.5 }}>
                {logo}
              </div>
            ))}
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TrustStrip;
