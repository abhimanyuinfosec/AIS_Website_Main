import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Server, Globe, Cpu, Lock, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const solutionsData = [
  {
    slug: 'website-security',
    title: 'Website & CMS Security',
    subtitle: 'End-to-end protection for customer-facing web assets and brand reputation.',
    overview: 'Websites are the primary target for automated bots, brute-force exploits, defacement campaigns, and formjacking attacks. Our website security architecture creates a multi-tiered barrier against unauthorized entry.',
    threatsPrevented: ['SQL Injection & XSS', 'Credential stuffing & brute force', 'DDoS volumetric spikes', 'Supply chain JavaScript tampering'],
    capabilities: [
      'Zero-Trust Cloud WAF integration',
      'Real-time SSL/TLS certificate & cipher monitoring',
      'Continuous malware & backdoor scanning',
      'Automated sanitization & CSP policy enforcement'
    ],
    architecture: 'Edge CDN Layer → Reverse Proxy WAF → Rate Limiter → Core Application Hardening'
  },
  {
    slug: 'web-application-security',
    title: 'Web Application Security',
    subtitle: 'Comprehensive API, backend, and business logic defense.',
    overview: 'Modern web applications and REST/GraphQL APIs power enterprise operations. We audit API contracts, authentication lifecycles, and authorization logic to eliminate deep-seated vulnerabilities.',
    threatsPrevented: ['Broken Object Level Authorization (BOLA)', 'Server-Side Request Forgery (SSRF)', 'JWT algorithm confusion & forgery', 'Business logic manipulation'],
    capabilities: [
      'OWASP Top 10 automated & manual penetration testing',
      'API gateway rate-limiting and authorization validation',
      'Microservice mutual TLS (mTLS) enforcement',
      'Automated static and dynamic code security testing (SAST/DAST)'
    ],
    architecture: 'API Gateway → Identity Provider (OIDC/OAuth2) → Policy Enforcement Point → Hardened Microservices'
  },
  {
    slug: 'network-protection',
    title: 'Network & Perimeter Defense',
    subtitle: 'Securing physical, cloud, and hybrid enterprise network boundaries.',
    overview: 'Eliminate lateral movement, unauthorized egress, and exposed internal management ports through granular network segmentation and hybrid intrusion detection.',
    threatsPrevented: ['Port scanning & service enumeration', 'Lateral network movement & pivoting', 'DNS tunneling & rogue egress', 'Ransomware propagation'],
    capabilities: [
      'Next-Gen Firewall (NGFW) rule optimization',
      'VLAN & Zero-Trust micro-segmentation',
      'Continuous egress traffic monitoring',
      'Wireless & VPN secure access hardening'
    ],
    architecture: 'Stateful Perimeter Firewall → Egress Filter → IDS Sensor → DMZ Segmentation'
  },
  {
    slug: 'attack-surface-visibility',
    title: 'Attack Surface Visibility & EASM',
    subtitle: 'See your digital assets through the eyes of an active threat actor.',
    overview: 'Discover unmapped subdomains, shadow cloud buckets, exposed staging servers, and leaked employee credentials across the entire external internet before hackers exploit them.',
    threatsPrevented: ['Subdomain takeovers', 'Unauthenticated staging environments', 'Leaked developer API keys', 'Exposed admin interfaces'],
    capabilities: [
      'Continuous external asset discovery & mapping',
      'Dark web & breach database credential monitoring',
      'SSL certificate expiry & misconfiguration alerts',
      'Automated risk scoring matrix'
    ],
    architecture: 'Automated Crawler Engine → Passive DNS Analyzer → Vulnerability Matcher → Real-Time Telemetry Alert'
  },
  {
    slug: 'threat-detection',
    title: 'Threat Detection & Incident Response',
    subtitle: '24/7 telemetry analysis and automated threat neutralization.',
    overview: 'Catch sophisticated stealth attacks using behavioral machine learning models, rule-based heuristics, and log correlation engines.',
    threatsPrevented: ['Advanced Persistent Threats (APTs)', 'Living-off-the-land (LotL) binaries', 'Rogue insider exfiltration', 'Zero-day exploit attempts'],
    capabilities: [
      'Hybrid IDS intrusion monitoring (SANJAY + Suricata)',
      'Security Operations Center (SOC) alert triage',
      'Automated containment & IP blacklisting',
      'Detailed forensic analysis & timeline reconstruction'
    ],
    architecture: 'Log Forwarders (eBPF/Syslog) → SIEM Correlation Engine → ML Anomaly Detector → Containment Action'
  },
  {
    slug: 'incident-readiness',
    title: 'Incident Readiness & Crisis Resilience',
    subtitle: 'Prepare your leadership and technical staff to survive critical breaches.',
    overview: 'Having an incident response plan is not enough — it must be tested under stress. We develop custom IR playbooks, conduct realistic tabletop simulations, and provide 24/7 retainer support.',
    threatsPrevented: ['Prolonged operational downtime', 'Evidence spoliation', 'Regulatory compliance penalties', 'Public relations catastrophes'],
    capabilities: [
      'Customized Incident Response Playbooks',
      'Executive & technical Tabletop Simulations',
      'Digital forensics & malware reverse engineering',
      'Emergency 24/7 Security Escalation Retainer'
    ],
    architecture: 'Threat Confirmation → Triage & Isolation → Forensic Preservation → Remediation → Post-Mortem Hardening'
  },
  {
    slug: 'sme-msme-security',
    title: 'SME & MSME Cyber Defense',
    subtitle: 'Cost-effective, high-impact cybersecurity tailored for growing businesses.',
    overview: 'Small and medium businesses are the prime targets of automated ransomware and credential phishing. We provide a consolidated security suite without enterprise price inflation.',
    threatsPrevented: ['Employee email phishing', 'Ransomware extortion', 'Payment invoice fraud (BEC)', 'Unencrypted client data loss'],
    capabilities: [
      'Complete baseline security assessment',
      'Employee cybersecurity hygiene training',
      'Endpoint detection & response (EDR) rollout',
      'Automated daily encrypted cloud backups'
    ],
    architecture: 'Endpoint Agent → Phishing Filter → Secure Backup Vault → Monthly Health Scorecard'
  },
];

export const SolutionsPage = ({ defaultSlug }) => {
  const params = useParams();
  const currentSlug = params.slug || defaultSlug;
  const [selectedSolution, setSelectedSolution] = useState(
    solutionsData.find((s) => s.slug === currentSlug) || solutionsData[0]
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            <ShieldCheck size={14} /> TACTICAL SOLUTIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Uncompromising Resilience</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Purpose-built security architectures addressing specific organizational threat vectors and compliance demands.
          </p>
        </div>

        {/* Grid Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mb-12">
          {solutionsData.map((sol) => {
            const isSelected = selectedSolution.slug === sol.slug;
            return (
              <button
                key={sol.slug}
                onClick={() => setSelectedSolution(sol)}
                className={`p-3 rounded-xl text-center transition border flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-[#0b1120] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="text-xs">{sol.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Solution Deep Dive */}
        <div className="bg-[#0b1120] border border-cyan-500/20 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">TACTICAL BLUEPRINT</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">{selectedSolution.title}</h2>
            <p className="text-cyan-300/90 text-sm mt-1 font-mono">{selectedSolution.subtitle}</p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
              {selectedSolution.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-800">
            {/* Threats Prevented */}
            <div className="p-5 rounded-xl bg-[#070b14] border border-red-500/20">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle size={14} /> Threat Vectors Neutralized
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedSolution.threatsPrevented.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Capabilities */}
            <div className="p-5 rounded-xl bg-[#070b14] border border-cyan-500/20">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <CheckCircle size={14} /> Defense Capabilities
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedSolution.capabilities.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-cyan-400 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architecture flow */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">DEFENSE ARCHITECTURE PIPELINE</span>
            <div className="text-xs font-mono text-cyan-300 mt-1 font-semibold overflow-x-auto">
              {selectedSolution.architecture}
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              Want to deploy {selectedSolution.title} for your infrastructure?
            </div>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
            >
              Discuss Implementation Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
