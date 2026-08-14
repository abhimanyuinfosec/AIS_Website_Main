import React from 'react';
import FadeIn from './FadeIn';
import { Search, ClipboardList, Shield, Activity, AlertTriangle, RefreshCw, ArrowRight, ArrowDown } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const Lifecycle = () => {
  const steps = [
    { name: 'Discover', icon: <Search size={28} strokeWidth={1.5} />, desc: 'Map your complete digital footprint and exposed assets.' },
    { name: 'Assess', icon: <ClipboardList size={28} strokeWidth={1.5} />, desc: 'Identify vulnerabilities and prioritize business risks.' },
    { name: 'Protect', icon: <Shield size={28} strokeWidth={1.5} />, desc: 'Harden infrastructure and implement robust defenses.' },
    { name: 'Detect', icon: <Activity size={28} strokeWidth={1.5} />, desc: 'Monitor continuously for suspicious activities and threats.' },
    { name: 'Respond', icon: <AlertTriangle size={28} strokeWidth={1.5} />, desc: 'Contain incidents rapidly and effectively.' },
    { name: 'Improve', icon: <RefreshCw size={28} strokeWidth={1.5} />, desc: 'Learn, adapt, and refine your security posture.' }
  ];

  return (
    <section className="section-padding theme-dark" id="lifecycle" style={{ background: 'var(--bg-dark-elevated)' }}>
      <div className="wrap">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div className="mono-label" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              How We Secure Your Business
            </div>
            <h2>Cybersecurity is a continuous process.</h2>
            <p className="muted" style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>
              We don’t just perform a one-time scan and walk away. Our methodology is built on a continuous lifecycle of vigilance to ensure your business stays resilient against evolving threats.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="lifecycle-container">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <StaggerItem className="lifecycle-step card">
                <div className="step-number">0{idx + 1}</div>
                <div className="step-icon">
                  {step.icon}
                </div>
                <h4>{step.name}</h4>
                <p className="muted">{step.desc}</p>
              </StaggerItem>
              
              {idx < steps.length - 1 && (
                <StaggerItem className="lifecycle-arrow">
                  <ArrowRight size={24} className="desktop-arrow" />
                  <ArrowDown size={24} className="mobile-arrow" />
                </StaggerItem>
              )}
            </React.Fragment>
          ))}
        </StaggerContainer>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .lifecycle-container {
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .lifecycle-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1.25rem;
          position: relative;
        }
        .step-number {
          position: absolute;
          top: -15px;
          background: var(--accent-gradient);
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: bold;
          box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
        }
        .step-icon {
          color: var(--accent-primary);
          margin-bottom: 1.25rem;
          background: var(--accent-primary-alpha);
          padding: 1rem;
          border-radius: 50%;
        }
        .lifecycle-step h4 {
          font-size: 1.05rem;
          margin-bottom: 0.75rem;
        }
        .lifecycle-step p {
          font-size: 0.85rem;
          line-height: 1.5;
        }
        .lifecycle-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--border-dark);
          flex-shrink: 0;
        }
        .mobile-arrow {
          display: none;
        }
        
        @media (max-width: 1200px) {
          .lifecycle-container {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }
          .lifecycle-step {
            flex: 0 0 calc(33.333% - 2rem);
            min-width: 250px;
          }
          .lifecycle-arrow {
            display: none; /* Hide arrows on wrap to keep it clean */
          }
        }
        
        @media (max-width: 600px) {
          .lifecycle-step {
            flex: 0 0 100%;
          }
          .lifecycle-arrow {
            display: flex;
            padding: 1rem 0;
          }
          .desktop-arrow {
            display: none;
          }
          .mobile-arrow {
            display: block;
          }
        }
      `}} />
    </section>
  );
};

export default Lifecycle;
