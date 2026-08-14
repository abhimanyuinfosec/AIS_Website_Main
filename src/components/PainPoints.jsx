import React from 'react';
import FadeIn from './FadeIn';
import { HelpCircle } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const PainPoints = () => {
  const questions = [
    "Is my website actually secure?",
    "What assets are exposed to the internet?",
    "Could an attacker exploit our application?",
    "Would we know if someone compromised our network?",
    "Are our employees and systems adequately protected?",
    "What happens if we suffer a cyber incident?"
  ];

  return (
    <section className="section-padding theme-dark" id="pain-points" style={{ background: 'var(--bg-dark)' }}>
      <div className="wrap">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              You don't need to be a large company to become a target.
            </h2>
            <p className="muted" style={{ fontSize: '1.15rem' }}>
              Every day, growing businesses face complex security challenges. As a business leader, you likely find yourself asking:
            </p>
          </div>
        </FadeIn>

        <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {questions.map((q, idx) => (
            <StaggerItem key={idx} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', background: 'var(--bg-dark-elevated)' }}>
              <div style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px', opacity: 0.8 }}>
                <HelpCircle size={24} strokeWidth={1.5} />
              </div>
              <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-light)' }}>
                "{q}"
              </h4>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn yOffset={20} delay={0.4}>
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 2rem', 
            background: 'var(--accent-gradient)', 
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--accent-primary)',
            boxShadow: '0 10px 30px var(--accent-primary-alpha)'
          }}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: '0', color: 'white' }}>
              We help you find the answers before an attacker does.
            </h3>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default PainPoints;
