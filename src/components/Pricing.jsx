import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import FadeIn from './FadeIn';
import { StaggerContainer, StaggerItem } from './StaggerContainer';
import GlowCard from './GlowCard';

const AnimatedNumber = ({ value }) => {
  const [current, setCurrent] = useState(value);
  const rafRef = useRef(null);
  
  useEffect(() => {
    let start = current;
    let startTime = null;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / 300, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(start + (value - start) * ease);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);
  
  return <>{Math.round(current)}</>;
};

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    { name: "Starter", price: annual ? 49 : 59, desc: "Essential security for small teams", features: ["24/7 AI Monitoring", "Basic Threat Intel", "Community Support", "10GB Log Storage"] },
    { name: "Professional", price: annual ? 149 : 179, desc: "Advanced autonomous response", popular: true, features: ["Everything in Starter", "Autonomous Remediation", "Advanced API Access", "Priority Support", "100GB Log Storage"] },
    { name: "Enterprise", price: annual ? 399 : 499, desc: "Full-scale organizational security", features: ["Everything in Pro", "Custom Playbooks", "Dedicated Success Manager", "SLA Guarantee", "Unlimited Storage"] }
  ];

  return (
    <section className="section-padding theme-dark" id="pricing">
      <div className="wrap">
        <FadeIn className="text-center" style={{ marginBottom: '4rem' }}>
          <h2>Transparent pricing, <span style={{ color: 'var(--accent-primary)' }}>no surprises</span></h2>
          <p className="hero-desc">Choose the right level of autonomous security for your organization.</p>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginTop: '2rem', background: 'var(--bg-dark-muted)', padding: '0.5rem 1rem', borderRadius: '30px' }}>
            <span className={annual ? '' : 'muted'}>Annual (Save 20%)</span>
            <button 
              onClick={() => setAnnual(!annual)}
              style={{ width: '48px', height: '24px', borderRadius: '12px', background: 'var(--accent-gradient)', position: 'relative', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', top: '2px', left: annual ? '2px' : '26px', transition: '0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
            </button>
            <span className={annual ? 'muted' : ''}>Monthly</span>
          </div>
        </FadeIn>

        <StaggerContainer className="pricing-grid">
          {plans.map((plan, i) => (
            <StaggerItem 
              key={i} 
              style={{ height: '100%' }}
            >
              <GlowCard className={`card price-card ${plan.popular ? 'popular' : ''}`} style={{ height: '100%' }}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <p className="muted" style={{ minHeight: '48px' }}>{plan.desc}</p>
                <div className="price">
                  $<AnimatedNumber value={plan.price} /> <span className="muted" style={{ fontSize: '1rem', fontWeight: 400 }}>/mo</span>
                </div>
                <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%', marginBottom: '2rem' }}>
                  Get Started
                </button>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="draw-line" style={{ display: 'flex' }}>
                        <Check size={20} style={{ color: 'var(--accent-primary)' }} strokeWidth={2.5} />
                      </div>
                      <span style={{ fontSize: '0.95rem' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Pricing;
