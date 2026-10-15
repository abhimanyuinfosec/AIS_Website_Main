import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Terminal, Shield, FileCode, Cpu, Search, ArrowRight } from 'lucide-react';

export const DocsPage = () => {
  const docSections = [
    {
      title: 'Getting Started',
      icon: Terminal,
      description: 'Quick start guides, deployment blueprints, and environment prerequisites.',
      articles: [
        'Architecture Overview & Core Concepts',
        'Deploying the eBPF Telemetry Agent',
        'Configuring Perimeter Cloud Firewalls',
        'Agentless Multi-Cloud Ingestion',
      ],
    },
    {
      title: 'Vulnerability Assessment',
      icon: Shield,
      description: 'Protocols and scanning methodologies for offensive resilience validation.',
      articles: [
        'Running Continuous Surface Scans',
        'Interpreting CVSS v3.1 Impact Ratings',
        'Remediation Playbooks & Patch Prioritization',
        'Automated CI/CD Security Gate Integration',
      ],
    },
    {
      title: 'Products & Platforms',
      icon: Cpu,
      description: 'Technical manuals for Hybrid IDS Engine, AutoRed APT, and IP Intelligence.',
      articles: [
        'Hybrid IDS Rule Configurations',
        'AutoRed Emulation Scenario Catalog',
        'IP Intelligence REST API Reference',
        'Log Forwarding to Splunk, Datadog & Sentinel',
      ],
    },
    {
      title: 'API & Developer SDK',
      icon: FileCode,
      description: 'Programmatic interfaces, webhooks, and authentication tokens for automation.',
      articles: [
        'Authentication & API Key Management',
        'Webhooks & Real-time Threat Callbacks',
        'Rate Limits, Headers, and Paging',
        'Python & Go Client SDK Documentation',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Search Bar */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-[#FF7A00]/25 text-[#E65100] text-xs font-semibold mb-4">
            <BookOpen size={14} />
            <span>Developer & Security Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Abhimanyu <span className="ais-signature-gradient">Platform Docs.</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Technical guides, security standards, and API references to deploy and configure our zero-trust defenses.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documentation, guides, and API endpoints..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/15 transition"
            />
          </div>
        </div>

        {/* Doc Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#C1121F]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-slate-900">{section.title}</h3>
                      <p className="text-xs text-slate-500">{section.description}</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {section.articles.map((art) => (
                      <li key={art}>
                        <Link
                          to="/contact"
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs text-slate-700 hover:text-[#C1121F] transition group"
                        >
                          <span className="truncate">{art}</span>
                          <ArrowRight
                            size={12}
                            className="text-slate-400 group-hover:text-[#C1121F] transition-transform group-hover:translate-x-0.5 shrink-0 ml-2"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Version 2.4.0 (Latest)</span>
                  <Link
                    to="/contact"
                    className="font-semibold text-[#FF7A00] hover:text-[#C1121F] transition-colors"
                  >
                    View Section Guides →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
