import React, { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import FadeIn from './FadeIn';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const CountUp = ({ target, decimals = 0, suffix = '', duration = 1500 }) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let rafId;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
      setCurrent(target * ease);
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {decimals ? current.toFixed(decimals) : Math.round(current)}{suffix}
    </span>
  );
};

const LiveData = () => {
  const [tickerTime, setTickerTime] = useState(0.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerTime((prev) => parseFloat((prev + Math.random() * 0.5).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding theme-dark" style={{ background: 'var(--bg-dark-muted)', position: 'relative', overflow: 'hidden' }}>
      {/* Heartbeat Background */}
      <div className="heartbeat-bg" style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'linear-gradient(90deg, transparent 0%, var(--accent-primary) 50%, transparent 100%)', filter: 'blur(100px)' }}></div>


      <div className="wrap relative" style={{ zIndex: 1 }}>
        <FadeIn style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
          <Activity size={18} />
          LIVE NETWORK TELEMETRY
        </FadeIn>
        
        <StaggerContainer className="grid-3">
          <StaggerItem className="card">
            <div style={{ fontSize: '3.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '0.5rem', color: 'var(--accent-secondary)' }}>
              <CountUp target={0.4} decimals={1} suffix="s" />
            </div>
            <div className="muted" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Avg Detection Time
            </div>
          </StaggerItem>

          <StaggerItem className="card">
            <div style={{ fontSize: '3.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '0.5rem', color: 'var(--accent-secondary)' }}>
              <CountUp target={99.9} decimals={1} suffix="%" />
            </div>
            <div className="muted" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Autonomous Remediation
            </div>
          </StaggerItem>

          <StaggerItem className="card">
            <div style={{ fontSize: '3.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '0.5rem', color: 'var(--accent-secondary)' }}>
              <CountUp target={12} decimals={0} suffix="B+" />
            </div>
            <div className="muted" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Daily Events Processed
            </div>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn delay={0.4} style={{ marginTop: '2rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', opacity: 0.8 }}>
          &gt; Threat blocked: Ransomware payload intercepted — {tickerTime}s ago
        </FadeIn>
      </div>
    </section>
  );
};

export default LiveData;
