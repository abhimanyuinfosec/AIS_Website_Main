import React from 'react';
import { 
  ShieldAlert, 
  Globe, 
  Network, 
  Bug, 
  Activity, 
  Settings, 
  Search, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import FadeIn from './FadeIn';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const Services = () => {
  const servicesData = [
    {
      icon: <ShieldAlert size={32} strokeWidth={1.5} />,
      title: 'Security Assessment',
      desc: 'Identify vulnerabilities and security weaknesses across systems and applications.'
    },
    {
      icon: <Globe size={32} strokeWidth={1.5} />,
      title: 'Web Application Security',
      desc: 'Security testing, vulnerability assessment, OWASP-focused testing, and remediation guidance.'
    },
    {
      icon: <Network size={32} strokeWidth={1.5} />,
      title: 'Network Security',
      desc: 'Network assessment, exposed service analysis, configuration review, and security hardening.'
    },
    {
      icon: <Bug size={32} strokeWidth={1.5} />,
      title: 'Vulnerability Assessment & Pen Testing',
      desc: 'Identify exploitable weaknesses before attackers do.'
    },
    {
      icon: <Activity size={32} strokeWidth={1.5} />,
      title: 'Threat Detection & Monitoring',
      desc: 'Monitor security events and identify suspicious activity.'
    },
    {
      icon: <Search size={32} strokeWidth={1.5} />,
      title: 'OSINT & Attack Surface Intelligence',
      desc: 'Identify publicly exposed assets, domains, subdomains, services, credentials exposure, and external attack surface.'
    }
  ];

  return (
    <section className="section-padding theme-dark" id="services" style={{ background: 'var(--bg-dark)' }}>
      <div className="wrap">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div className="mono-label" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              Cybersecurity Services
            </div>
            <h2>Comprehensive protection tailored to your business</h2>
            <p className="muted" style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>
              We offer a wide range of specialized services to help you understand your risks, harden your infrastructure, and maintain a resilient security posture.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {servicesData.map((service, index) => (
            <StaggerItem key={index} className="card service-interactive-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                color: 'var(--accent-primary)', 
                marginBottom: '1.5rem', 
                background: 'var(--accent-primary-alpha)',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)'
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p className="muted" style={{ fontSize: '0.95rem', flexGrow: 1, marginBottom: '2rem' }}>{service.desc}</p>
              
              <div className="service-link" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'var(--accent-primary)', 
                fontWeight: 600, 
                fontSize: '0.9rem',
                marginTop: 'auto',
                transition: 'var(--transition-fast)'
              }}>
                Learn More <ArrowRight size={16} className="link-arrow" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .service-interactive-card {
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
        }
        .service-interactive-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(2, 132, 199, 0.15);
        }
        .service-interactive-card .service-link {
          opacity: 0.8;
        }
        .service-interactive-card:hover .service-link {
          opacity: 1;
        }
        .service-interactive-card .link-arrow {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-interactive-card:hover .link-arrow {
          transform: translateX(6px);
        }
      `}} />
    </section>
  );
};

export default Services;
