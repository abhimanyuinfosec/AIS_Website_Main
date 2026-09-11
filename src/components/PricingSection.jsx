import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: annual ? 49 : 59,
      period: '/ month',
      desc: 'Essential zero-trust firewall for distributed teams up to 25 seats.',
      features: [
        'Cloud-native DNS filtering',
        'End-to-end ChaCha20 encryption',
        'Automated zero-trust tunnel',
        'Email & community support',
        'Standard 99.9% uptime SLA'
      ],
      popular: false
    },
    {
      name: 'Enterprise Pro',
      price: annual ? 149 : 179,
      period: '/ month',
      desc: 'Advanced autonomous threat neutralization with AI sandboxing.',
      features: [
        'Everything in Starter',
        'Autonomous AI sandboxing',
        'Real-time behavioral heuristics',
        'Mobile & desktop biometric verify',
        'Granular individual user silos',
        'Priority 24/7 SecOps response'
      ],
      popular: true
    },
    {
      name: 'Global Scale',
      price: annual ? 399 : 499,
      period: '/ month',
      desc: 'Dedicated enterprise infrastructure with custom security pipelines.',
      features: [
        'Everything in Enterprise Pro',
        'Custom edge point-of-presence (PoP)',
        'Dedicated security architect',
        'Full SOC2 / ISO compliance auditing',
        'Custom zero-day rule engine',
        '99.999% uptime guarantee'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-24 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-cyan-400/30 text-xs font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
            Flexible Plans
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Predictable Pricing, Zero Hidden Fees
          </h2>
          <p className="text-slate-300 text-base">
            Protect your distributed enterprise today. Every plan includes a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!annual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-12 h-6 rounded-full bg-slate-800 border border-white/20 p-0.5 relative transition-colors"
              aria-label="Toggle annual or monthly pricing"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform ${annual ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${annual ? 'text-white' : 'text-slate-400'}`}>
              <span>Annual</span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-surface rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular 
                  ? 'border-cyan-400/50 shadow-glow-blue scale-105 z-10 bg-[#0c142b]/80' 
                  : 'hover:border-cyan-400/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 text-white shadow-glow-cyan border border-white/20">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-xl font-bold text-white mb-2">{plan.name}</div>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">${plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-300">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/contact"
                className={`w-full py-3 text-center text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                  plan.popular
                    ? 'btn-shimmer text-white bg-gradient-to-r from-blue-600 via-brand-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/25'
                    : 'glass-surface-interactive text-slate-200 hover:text-white border border-white/15 hover:border-cyan-400/40'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
