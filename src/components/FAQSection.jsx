import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does Abhimanyu operate without on-premise hardware?',
    a: 'Abhimanyu deploys an autonomous cloud-native zero-trust perimeter. Traffic is routed through nearest edge points-of-presence (PoPs) where proprietary machine intelligence sanitizes and decrypts payloads at wire speed with sub-millisecond overhead.'
  },
  {
    q: 'Does it slow down my team\'s Internet connection or VPN?',
    a: 'No. Abhimanyu operates with a verified global latency of under 1.2ms. Our software-defined overlay network optimizes route selection, often resulting in faster connections than traditional congested VPN gateways.'
  },
  {
    q: 'Can we install it on remote employee personal devices (BYOD)?',
    a: 'Yes. With individual user cryptographic silos, employee personal files and company assets remain strictly air-gapped. Only enterprise-designated traffic traverses the zero-trust tunnel.'
  },
  {
    q: 'Is Abhimanyu compliant with SOC2 and ISO standards?',
    a: 'Yes. Abhimanyu is SOC2 Type II, ISO 27001, and GDPR certified. All ephemeral data encryption keys are rotated per session and discarded with zero persistent telemetry footprint.'
  }
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-24 relative" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-14">
          <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Knowledge Base</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm">
            Everything you need to know about autonomous cloud defense and enterprise rollout.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i}
                className={`glass-faq-item rounded-2xl overflow-hidden ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-500/20 border-cyan-400/30' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/[0.08]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
