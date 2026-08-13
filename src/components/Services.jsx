import React from 'react';
import { Sword, Target, Activity, Cloud, FileCheck2, Radar } from 'lucide-react';

const Services = () => {
  const servicesData = [
    {
      icon: <Sword strokeWidth={1.5} size={28} />,
      title: 'Penetration Testing',
      desc: 'Manual, adversary-style testing of networks, web apps, APIs, and cloud environments — delivering actionable reports engineers can actually use.',
      tag: '01 / Offense'
    },
    {
      icon: <Target strokeWidth={1.5} size={28} />,
      title: 'Red Team Exercises',
      desc: 'Full-scope simulated intrusions that test people, processes, and technology together against a defined objective to map actual blast radius.',
      tag: '02 / Offense'
    },
    {
      icon: <Activity strokeWidth={1.5} size={28} />,
      title: 'Incident Response',
      desc: 'Rapid containment and forensic investigation when a breach occurs, plus a hardened path back to normal, secure operations.',
      tag: '03 / Response'
    },
    {
      icon: <Cloud strokeWidth={1.5} size={28} />,
      title: 'Cloud & Infra Security',
      desc: 'Configuration review and hardening across AWS, Azure, and GCP — covering IAM, network segmentation, and secrets management.',
      tag: '04 / Defense'
    },
    {
      icon: <FileCheck2 strokeWidth={1.5} size={28} />,
      title: 'Compliance Readiness',
      desc: 'Gap assessments and evidence collection mapped to SOC 2, ISO 27001, and HIPAA — built to survive the actual audit.',
      tag: '05 / Governance'
    },
    {
      icon: <Radar strokeWidth={1.5} size={28} />,
      title: 'Managed Detection',
      desc: "Continuous log and endpoint monitoring with human analysis behind every critical alert, ensuring your team isn't triaging noise alone.",
      tag: '06 / Defense'
    }
  ];

  return (
    <section className="services section-padding" id="services">
      <div className="wrap">
        <div className="sec-head fade-up">
          <div className="eyebrow">Capabilities</div>
          <h2>Security work that holds up under pressure</h2>
          <p>
            Each engagement is scoped around what an adversary would actually try — prioritizing real
            business risk over generic vulnerability checklists.
          </p>
        </div>

        <div className="service-grid fade-up">
          {servicesData.map((service, index) => (
            <article key={index} className="service-card glass">
              <div className="icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="tag">{service.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
