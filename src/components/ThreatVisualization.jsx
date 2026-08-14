import React from 'react';
import { Activity, Map, ShieldAlert, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const ThreatVisualization = () => {
  return (
    <section className="section-padding theme-dark" id="operations" style={{ background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>

      <div className="wrap relative" style={{ zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div className="mono-label" style={{ color: 'var(--accent-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Activity size={16} /> Security Operations
            </div>
            <h2>Absolute visibility into your threat landscape.</h2>
            <p className="muted" style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>
              Our modern security monitoring provides unparalleled insight. We track advanced threat activity, correlate security events, and analyze network anomalies in real-time to neutralize attacks before they impact your business.
            </p>
          </div>
        </FadeIn>

        <FadeIn yOffset={40} delay={0.2}>
          <div style={{ 
            position: 'relative', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden',
            border: '1px solid var(--border-dark)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.15)',
            background: 'var(--bg-dark)'
          }}>
            {/* Fake window header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderBottom: '1px solid var(--border-dark)', background: 'var(--bg-dark-elevated)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              <div style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-light-muted)', fontFamily: 'var(--font-mono)' }}>soc-live-feed // active</div>
            </div>
            
            {/* The Video */}
            <video 
              id="soc-video"
              src="/video1.mp4" 
              preload="none"
              loop 
              muted 
              playsInline 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            {/* Play trigger via framer-motion */}
            <motion.div 
              onViewportEnter={() => {
                const vid = document.getElementById('soc-video');
                if (vid) vid.play().catch(() => {});
              }}
            />
          </div>
        </FadeIn>

        <FadeIn yOffset={20} delay={0.4}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(0, 229, 255, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <Map size={24} style={{ color: 'var(--accent-secondary)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Geographic Visualization</h4>
                <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Track global attack origins and target distribution mapping.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(0, 229, 255, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <ShieldAlert size={24} style={{ color: 'var(--accent-secondary)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Event Correlation</h4>
                <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Cross-reference security logs to identify coordinated attack attempts.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(0, 229, 255, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <Wifi size={24} style={{ color: 'var(--accent-secondary)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Network Forensics</h4>
                <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Deep visibility into traffic patterns and anomalous data transfers.</p>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default ThreatVisualization;
