import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield, Zap, Sparkles } from 'lucide-react';

export const PricingPage = () => {
  const plans = [
    {
      name: 'Starter Defense',
      tagline: 'Ideal for early-stage teams & startups safeguarding modern web surfaces.',
      price: '$999',
      period: '/month',
      badge: null,
      highlight: false,
      features: [
        'Automated monthly vulnerability scanning',
        'OWASP Top 10 web application audits',
        'Continuous perimeter port monitoring',
        'Standard email & Slack security alerts',
        'Quarterly security summary reports',
        'Standard 48-hour incident SLA',
      ],
      ctaText: 'Get Started',
      ctaLink: '/contact',
    },
    {
      name: 'Enterprise Shield',
      tagline: 'Comprehensive autonomous zero-trust defense for scaling organizations.',
      price: '$2,499',
      period: '/month',
      badge: 'Most Popular',
      highlight: true,
      features: [
        'Everything in Starter Defense',
        'Continuous 24/7 telemetry & threat detection',
        'Semi-annual full penetration testing',
        'Zero-trust network architecture validation',
        'Automated adversary emulation & red teaming',
        'Dedicated security engineer & priority SLA (4hr)',
        'Compliance readiness reports (ISO, SOC 2)',
      ],
      ctaText: 'Start Enterprise Trial',
      ctaLink: '/contact',
    },
    {
      name: 'Custom / Sovereign',
      tagline: 'Bespoke offensive resilience and cloud-firewall defense for critical infrastructure.',
      price: 'Custom',
      period: '',
      badge: 'Government & Regulated',
      highlight: false,
      features: [
        'Dedicated on-prem & hybrid kernel defense',
        'Custom zero-day exploit analysis & reverse engineering',
        'Continuous bespoke red teaming exercises',
        'Executive board & regulatory compliance auditing',
        '24/7 Dedicated War Room & 15-minute SLA',
        'Full custom integrations & bespoke SIEM connectors',
      ],
      ctaText: 'Speak with Architects',
      ctaLink: '/contact',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-[#C1121F]/20 text-[#C1121F] text-xs font-semibold mb-4">
            <Shield size={14} />
            <span>Transparent Security Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Predictable security investment for{' '}
            <span className="ais-signature-gradient">uncompromising defense.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate surprise vendor contracts. Choose an autonomous cybersecurity subscription engineered to scale alongside your infrastructure.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'bg-white border-2 border-[#C1121F] shadow-[0_20px_50px_-10px_rgba(193,18,31,0.15)] ring-4 ring-[#C1121F]/10'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#C1121F] to-[#FF7A00] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-2 min-h-[36px]">{plan.tagline}</p>

                <div className="mt-6 pb-6 border-b border-slate-100 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-xs text-slate-500">{plan.period}</span>}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    WHAT'S INCLUDED
                  </div>
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to={plan.ctaLink}
                  className={`block w-full py-3 text-center rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                    plan.highlight
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

        {/* Bottom Assurance */}
        <div className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <h4 className="text-sm font-heading font-bold text-slate-900">Need custom scope scoping?</h4>
          <p className="text-xs text-slate-500 mt-1">
            We offer bespoke scoping for regulated medical, fintech, and critical infrastructure networks.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-3 text-xs font-semibold text-[#C1121F] hover:text-[#FF7A00] transition-colors"
          >
            Schedule a scoping call with an engineer →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
