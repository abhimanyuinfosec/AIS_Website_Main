import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const defaultServicesData = [
  {
    title: 'Vulnerability Assessment & Penetration Testing',
    slug: 'penetration-testing',
    link: '/services/penetration-testing',
    description:
      'Rigorous black-box and grey-box adversary simulation to discover, exploit, and remediate zero-day vulnerabilities across your entire ecosystem before attackers do.',
    tags: ['OWASP Top 10', 'Red Teaming', 'Exploitation Analysis'],
  },
  {
    title: 'Network Security',
    slug: 'network-security',
    link: '/services/network-security',
    description:
      'Architectural zero-trust defense, deep packet inspection, encrypted perimeter gateways, and lateral movement segmentation shielding high-value network assets.',
    tags: ['Zero-Trust', 'Firewall Audits', 'Segment Isolation'],
  },
  {
    title: 'Web Application Security',
    slug: 'web-security',
    link: '/services/web-security',
    description:
      'Deep architectural API fuzzing, business-logic validation, authorization flaw discovery, and runtime protection for modern distributed web applications.',
    tags: ['API Hardening', 'SSRF/XSS/SQLi', 'Token Security'],
  },
  {
    title: 'Security Monitoring',
    slug: 'threat-detection',
    link: '/services/threat-detection',
    description:
      'Continuous 24/7 telemetry monitoring, real-time threat intelligence correlation, anomaly detection, and rapid automated incident containment.',
    tags: ['24/7 Telemetry', 'AI Anomaly Detection', 'SIEM & SOAR'],
  },
];

const DetailedProtectionGrid = () => {
  const [services, setServices] = useState(defaultServicesData);

  useEffect(() => {
    let isMounted = true;
    api.get('/services')
      .then((res) => {
        if (!isMounted || !res.success || !Array.isArray(res.data) || res.data.length === 0) return;
        const liveItems = res.data.map((item, idx) => ({
          title: item.name,
          shortName: item.slug?.toUpperCase() || `0${idx + 1}`,
          slug: item.slug,
          link: `/services/${item.slug}`,
          description: item.shortDesc || item.detailedDesc,
          tags: item.features && item.features.length > 0 ? item.features.slice(0, 3) : ['Zero-Trust', 'Hardening', 'Continuous Defense'],
        }));
        setServices(liveItems);
      })
      .catch(() => {
        // Graceful fallback to defaultServicesData
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-10 lg:py-12 bg-[#05080D] relative" id="services" data-purpose="security-matrix">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Abhimanyu can protect my data?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Comprehensive offensive and defensive security capabilities engineered to safeguard mission-critical digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 p-7 rounded-xl flex flex-col justify-between group transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-slate-800/60 text-blue-400 border border-slate-700/60">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2.5 leading-snug group-hover:text-slate-100 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/60">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/40 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={service.link}
                  className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Explore Capability →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedProtectionGrid;
