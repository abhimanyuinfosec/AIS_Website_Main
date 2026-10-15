import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, Minus, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export const PricingPage = () => {
  const topPlans = [
    {
      name: 'Starter',
      badge: 'Startups & Small Business',
      highlight: false,
      bestFor: 'Individuals, freelancers, startups, and small businesses seeking targeted protection.',
      scope: 'One website or app',
      packages: 'Quick Check, Standard Security Test, Security Care, Secure Start Bundle',
      turnaround: '2-3 days (Quick), 4-6 days (Standard)',
      pricingModel: 'Fixed per package',
      ctaText: 'Book a Free Call',
      ctaLink: '/contact',
    },
    {
      name: 'Enterprise (Partners)',
      badge: 'Recommended for Agencies',
      highlight: true,
      bestFor: 'Software development companies and agencies needing white-label security tests.',
      scope: 'One app or API, per project',
      packages: 'Starter Check, Standard VAPT, Security Care',
      turnaround: 'Built around your delivery schedule',
      pricingModel: 'Partner rates',
      ctaText: 'Become a Partner',
      ctaLink: '/contact',
    },
    {
      name: 'Custom',
      badge: 'Turnkey Build & Audit',
      highlight: false,
      bestFor: 'Clients who need a brand-new website or bespoke software built securely from scratch.',
      scope: 'Whole project, based on your requirements',
      packages: 'Secure Development + Security',
      turnaround: 'Tailored to project scope',
      pricingModel: 'Fixed written quote after scope is signed',
      ctaText: 'Request a Quote',
      ctaLink: '/contact',
    },
  ];

  const comparisonSections = [
    {
      sectionTitle: 'General Scope & Focus',
      rows: [
        {
          label: 'Best for',
          starter: 'Individuals, freelancers, startups, small businesses',
          enterprise: 'Software development companies and agencies',
          custom: 'Clients who need a new website or software built securely',
        },
        {
          label: 'Packages',
          starter: 'Quick Check, Standard Security Test, Security Care, Secure Start Bundle',
          enterprise: 'Starter Check, Standard VAPT, Security Care',
          custom: 'Secure Development + Security',
        },
        {
          label: 'Scope',
          starter: 'One website or app',
          enterprise: 'One app or API, per project',
          custom: 'Whole project, based on your requirements',
        },
      ],
    },
    {
      sectionTitle: 'Testing & Vulnerability Coverage',
      rows: [
        {
          label: 'OWASP Top 10 check',
          starter: '✓ Quick Check (agreed pages)',
          enterprise: '✓ Starter Check (agreed pages/endpoints)',
          custom: '✓ Part of the full test',
        },
        {
          label: 'Deeper manual testing',
          starter: '✓ Standard Security Test',
          enterprise: '✓ Standard VAPT',
          custom: '✓ Full security test before launch',
        },
        {
          label: 'AI / LLM testing (prompt injection, data leaks)',
          starter: 'On request',
          enterprise: '✓ Included',
          custom: 'On request',
        },
      ],
    },
    {
      sectionTitle: 'Reporting & Remediation Guidance',
      rows: [
        {
          label: 'Report format',
          starter: 'Plain language, priority fixes',
          enterprise: 'Severity-ranked, developer-ready steps',
          custom: 'Full report with risk ratings',
        },
        {
          label: 'Risk ratings & step-by-step fix guidance',
          starter: '✓ Standard Test',
          enterprise: '✓ Standard VAPT',
          custom: '✓ Included',
        },
        {
          label: 'Free retest after fixes',
          starter: '✓ Standard Test',
          enterprise: '✓ Standard VAPT & Security Care',
          custom: '✓ One retest',
        },
      ],
    },
    {
      sectionTitle: 'Ongoing Protection & Care',
      rows: [
        {
          label: 'Monthly automated scan',
          starter: '✓ Security Care (min. 3 months)',
          enterprise: '✓ Security Care (per app)',
          custom: '1 month after launch',
        },
        {
          label: 'Retest of earlier fixes',
          starter: '✓ Included',
          enterprise: '✓ Included',
          custom: '✓ Included',
        },
        {
          label: 'Outdated software & exposed-password checks',
          starter: '✓ Included',
          enterprise: '✓ (dependency and exposed-secret checks)',
          custom: '✓ Included',
        },
        {
          label: 'Review of major release changes',
          starter: '–',
          enterprise: '✓ Included',
          custom: '–',
        },
        {
          label: 'Monthly summary',
          starter: '✓ Short summary',
          enterprise: '✓ Full summary',
          custom: '–',
        },
      ],
    },
    {
      sectionTitle: 'Build & Partnership Benefits',
      rows: [
        {
          label: 'Secure development (new site or software)',
          starter: '–',
          enterprise: '–',
          custom: '✓ Included',
        },
        {
          label: 'Written requirement list',
          starter: '–',
          enterprise: '–',
          custom: '✓ Included',
        },
        {
          label: 'Secure coding (safe login, input checks, access control)',
          starter: '–',
          enterprise: '–',
          custom: '✓ Included',
        },
        {
          label: 'Resell or white-label to your clients',
          starter: '–',
          enterprise: '✓ Included',
          custom: '–',
        },
        {
          label: 'Volume benefit',
          starter: 'Bundle saving',
          enterprise: '✓ 3+ projects or 3-month minimum',
          custom: '–',
        },
        {
          label: 'Pilot offer (first project at reduced rate)',
          starter: '–',
          enterprise: '✓ Available',
          custom: '–',
        },
      ],
    },
    {
      sectionTitle: 'Process, Schedule & Payment Terms',
      rows: [
        {
          label: 'Intro call',
          starter: '15 minutes',
          enterprise: '15-20 minutes',
          custom: 'After requirement discussion',
        },
        {
          label: 'Written scope',
          starter: '✓ Scope document',
          enterprise: '✓ Scope document plus NDA',
          custom: '✓ Scope document plus NDA',
        },
        {
          label: 'Typical turnaround',
          starter: '2-3 days (Quick), 4-6 days (Standard)',
          enterprise: 'Built around your delivery schedule',
          custom: 'Depends on scope',
        },
        {
          label: 'Payment',
          starter: '50% advance, 50% on report. Care and Bundle paid upfront',
          enterprise: '50% advance, balance on report. Monthly plans invoiced monthly',
          custom: 'Milestones: start, working demo, delivery',
        },
        {
          label: 'Pricing model',
          starter: 'Fixed per package',
          enterprise: 'Partner rates',
          custom: 'Fixed written quote after scope is signed',
        },
      ],
    },
  ];

  const renderCellContent = (val) => {
    if (!val || val === '–') {
      return (
        <span className="inline-flex items-center text-slate-300 font-bold">
          <Minus size={14} />
        </span>
      );
    }
    if (val.startsWith('✓')) {
      const rest = val.replace('✓', '').trim();
      return (
        <span className="inline-flex items-center gap-1.5 text-slate-800 font-medium leading-snug">
          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Check size={11} strokeWidth={3} />
          </span>
          <span>{rest || 'Included'}</span>
        </span>
      );
    }
    return <span className="text-slate-700 leading-snug">{val}</span>;
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Security packages{' '}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From targeted security tests to continuous agency partnerships and secure custom development with transparent scopes, zero lock-in, and battle-tested methodologies.
          </p>
        </div>

        {/* 3 Overview Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch mb-20">
          {topPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 ${plan.highlight
                ? 'bg-white border-2 border-[#C1121F] shadow-[0_20px_50px_-10px_rgba(193,18,31,0.15)] ring-4 ring-[#C1121F]/10'
                : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs ${plan.highlight
                    ? 'bg-gradient-to-r from-[#C1121F] to-[#FF7A00] text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                >
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 min-h-[38px] leading-relaxed">
                  {plan.bestFor}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3.5 text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-400 block font-semibold">
                      Scope Coverage
                    </span>
                    <span className="font-semibold text-slate-800">{plan.scope}</span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-400 block font-semibold">
                      Included Packages
                    </span>
                    <span className="text-slate-700 leading-snug">{plan.packages}</span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-400 block font-semibold">
                      Typical Turnaround
                    </span>
                    <span className="text-slate-700 font-medium">{plan.turnaround}</span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-400 block font-semibold">
                      Pricing Model
                    </span>
                    <span className="text-[#C1121F] font-bold">{plan.pricingModel}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to={plan.ctaLink}
                  className={`block w-full py-3.5 text-center rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${plan.highlight
                    ? 'bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] text-white shadow-md shadow-[#C1121F]/25 hover:brightness-105 active:scale-95'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Full Comprehensive Comparison Table */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Full Package &amp; Capability Comparison
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Detailed breakdown of testing rigor, reporting formats, ongoing protection, and engagement terms.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                {/* Table Head */}
                <thead>
                  <tr className="border-b border-slate-200/90 bg-slate-50/70">
                    <th className="py-5 px-6 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 w-[30%]">
                      Capability &amp; Terms
                    </th>
                    <th className="py-5 px-5 text-sm font-heading font-bold text-slate-900 w-[23%]">
                      Starter
                    </th>
                    <th className="py-5 px-5 text-sm font-heading font-bold text-[#C1121F] bg-rose-50/40 border-x border-[#C1121F]/15 w-[24%]">
                      Enterprise (Partners)
                    </th>
                    <th className="py-5 px-5 text-sm font-heading font-bold text-slate-900 w-[23%]">
                      Custom
                    </th>
                  </tr>
                </thead>

                {/* Table Body by Section */}
                <tbody className="divide-y divide-slate-100 text-xs">
                  {comparisonSections.map((section) => (
                    <React.Fragment key={section.sectionTitle}>
                      {/* Section Header */}
                      <tr className="bg-slate-100/60 border-t border-slate-200/80">
                        <td
                          colSpan={4}
                          className="py-3 px-6 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700"
                        >
                          {section.sectionTitle}
                        </td>
                      </tr>

                      {/* Section Rows */}
                      {section.rows.map((row) => (
                        <tr
                          key={row.label}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-3.5 px-6 font-medium text-slate-800">
                            {row.label}
                          </td>
                          <td className="py-3.5 px-5 text-slate-600">
                            {renderCellContent(row.starter)}
                          </td>
                          <td className="py-3.5 px-5 text-slate-800 bg-rose-50/20 border-x border-[#C1121F]/10">
                            {renderCellContent(row.enterprise)}
                          </td>
                          <td className="py-3.5 px-5 text-slate-600">
                            {renderCellContent(row.custom)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* Bottom Action CTA Row */}
                  <tr className="bg-slate-50/80 border-t-2 border-slate-200">
                    <td className="py-6 px-6 font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Ready to get started?
                    </td>
                    <td className="py-6 px-5">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
                      >
                        Book a Free Call
                      </Link>
                    </td>
                    <td className="py-6 px-5 bg-rose-50/40 border-x border-[#C1121F]/15">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] text-white transition-all shadow-md shadow-[#C1121F]/20 hover:brightness-105"
                      >
                        Become a Partner
                      </Link>
                    </td>
                    <td className="py-6 px-5">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
                      >
                        Request a Quote
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Assurance Card */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C1121F] flex items-center justify-center mx-auto mb-3">
            <HelpCircle size={20} />
          </div>
          <h3 className="text-lg font-heading font-bold text-slate-900">
            Unsure which package aligns with your security goals?
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Every engagement starts with a confidential, zero-obligation scoping session. We will evaluate your attack surface and recommend the exact testing parameters you need.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
          >
            <span>Schedule 15-Minute Scoping Call</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
