import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bug, Network, Globe, Activity, ArrowUpRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import api from '../services/api';

const defaultServicesData = [
  {
    title: 'Vulnerability Assessment and Penetration Testing',
    shortName: 'VAPT',
    slug: 'penetration-testing',
    link: '/services/penetration-testing',
    description:
      'Rigorous black-box and grey-box adversary simulation to discover, exploit, and remediate zero-day vulnerabilities across your entire ecosystem before attackers do.',
    icon: Bug,
    accentColor: 'rose',
    iconBg: 'bg-rose-500/20 text-rose-400 border-rose-400/30 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
    hoverBorder: 'hover:border-rose-500/40',
    tags: ['OWASP Top 10', 'Red Teaming', 'Exploitation Analysis'],
  },
  {
    title: 'Network Security',
    shortName: 'NetSec',
    slug: 'network-security',
    link: '/services/network-security',
    description:
      'Architectural zero-trust defense, deep packet inspection, encrypted perimeter gateways, and lateral movement segmentation shielding high-value network assets.',
    icon: Network,
    accentColor: 'cyan',
    iconBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.25)]',
    hoverBorder: 'hover:border-cyan-500/40',
    tags: ['Zero-Trust', 'Firewall Audits', 'Segment Isolation'],
  },
  {
    title: 'Web Application Security',
    shortName: 'AppSec',
    slug: 'web-security',
    link: '/services/web-security',
    description:
      'Deep architectural API fuzzing, business-logic validation, authorization flaw discovery, and runtime protection for modern distributed web applications.',
    icon: Globe,
    accentColor: 'blue',
    iconBg: 'bg-blue-500/20 text-blue-400 border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.25)]',
    hoverBorder: 'hover:border-blue-500/40',
    tags: ['API Hardening', 'SSRF/XSS/SQLi', 'Token Security'],
  },
  {
    title: 'Security Monitoring',
    shortName: 'SOC / SecOps',
    slug: 'threat-detection',
    link: '/services/threat-detection',
    description:
      'Continuous 24/7 telemetry monitoring, real-time threat intelligence correlation, anomaly detection, and rapid automated incident containment.',
    icon: Activity,
    accentColor: 'emerald',
    iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    hoverBorder: 'hover:border-emerald-500/40',
    tags: ['24/7 Telemetry', 'AI Anomaly Detection', 'SIEM & SOAR'],
  },
];

const iconMap = {
  ShieldAlert,
  Bug,
  Network,
  Globe,
  Activity,
  ShieldCheck,
};

const styleMap = [
  {
    iconBg: 'bg-rose-500/20 text-rose-400 border-rose-400/30 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
    hoverBorder: 'hover:border-rose-500/40',
    defaultIcon: Bug,
  },
  {
    iconBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.25)]',
    hoverBorder: 'hover:border-cyan-500/40',
    defaultIcon: Network,
  },
  {
    iconBg: 'bg-blue-500/20 text-blue-400 border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.25)]',
    hoverBorder: 'hover:border-blue-500/40',
    defaultIcon: Globe,
  },
  {
    iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    hoverBorder: 'hover:border-emerald-500/40',
    defaultIcon: Activity,
  },
];

const DetailedProtectionGrid = () => {
  const [services, setServices] = useState(defaultServicesData);

  useEffect(() => {
    let isMounted = true;
    api.get('/services')
      .then((res) => {
        if (!isMounted || !res.success || !Array.isArray(res.data) || res.data.length === 0) return;
        const liveItems = res.data.map((item, idx) => {
          const style = styleMap[idx % styleMap.length];
          const IconComponent = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : style.defaultIcon;
          return {
            title: item.name,
            shortName: item.slug,
            slug: item.slug,
            link: `/services/${item.slug}`,
            description: item.shortDesc || item.detailedDesc,
            icon: IconComponent,
            iconBg: style.iconBg,
            hoverBorder: style.hoverBorder,
            tags: item.features && item.features.length > 0 ? item.features.slice(0, 3) : ['Zero-Trust', 'Hardening', 'Continuous Defense'],
          };
        });
        setServices(liveItems);
      })
      .catch(() => {
        // Graceful fallback to defaultServicesData on network blip
      });
    return () => { isMounted = false; };
  }, []);
  return (
    <section className="py-24 bg-[#030611] relative" id="services" data-purpose="security-matrix">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div data-anim="fade" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3 tracking-wider uppercase">
            <ShieldCheck size={13} />
            Services & Data Protection
          </div>
          <h2 data-anim="up" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Abhimanyu can protect my data?
          </h2>
          <p data-anim="up" data-anim-delay="100" className="mt-3 text-sm sm:text-base text-slate-400">
            Comprehensive offensive and defensive security capabilities engineered to safeguard mission-critical digital infrastructure.
          </p>
        </div>

        <div data-anim-child className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`glass-feature-card p-7 rounded-2xl flex flex-col justify-between group transition-all duration-300 ${service.hoverBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${service.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2.5 leading-snug group-hover:text-cyan-200 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/70">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all gap-1"
                  >
                    <span>Explore Capability</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DetailedProtectionGrid;
