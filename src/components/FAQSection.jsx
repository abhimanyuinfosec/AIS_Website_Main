import React, { useState } from 'react';

const faqs = [
  {
    number: '01',
    q: 'How does Abhimanyu protect our company?',
    a: 'Abhimanyu InfoSec provides multi-layered defenses spanning attack surface reduction, automated adversary emulation, real-time threat telemetry, and continuous zero-trust policy enforcement across distributed endpoints, cloud infrastructure, and internal networks.',
    category: 'CONTINUOUS PROTECTION',
  },
  {
    number: '02',
    q: 'Will this slow down our internet or work?',
    a: 'No. Our lightweight security architecture operates with sub-millisecond edge inspection latency. Encrypted traffic optimization ensures remote and distributed teams experience zero noticeable performance degradation or lag.',
    category: 'NETWORK PERFORMANCE',
  },
  {
    number: '03',
    q: 'What kind of threats do you defend against?',
    a: 'We shield your organization from zero-day exploits, phishing and credential harvesting campaigns, ransomware outbreaks, container/API supply-chain attacks, internal lateral movement, and unauthorized cloud data exfiltration.',
    category: 'THREAT INTELLIGENCE',
  },
  {
    number: '04',
    q: 'How long does deployment take?',
    a: 'Standard integration takes under 15 minutes. Our cloud-native configuration requires zero on-premise appliances, automatically syncing with your cloud workloads, identity providers, and SaaS platforms seamlessly.',
    category: 'DEPLOYMENT & ONBOARDING',
  },
  {
    number: '05',
    q: 'Do you help with SOC2 & ISO 27001 compliance?',
    a: 'Yes. Abhimanyu automatically generates audit-ready compliance evidence, immutable activity logs, and technical control mappings required for SOC 2 Type II, ISO 27001, HIPAA, and GDPR certifications.',
    category: 'REGULATORY COMPLIANCE',
  },
  {
    number: '06',
    q: 'Can you work with existing infrastructure?',
    a: 'Absolutely. Abhimanyu seamlessly integrates with your existing cloud environments (AWS, Azure, GCP), hybrid networks, and third-party SaaS tooling with zero hardware installation required and zero disruption to active business workflows.',
    category: 'INTEGRATION',
  },
];

const FAQSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileOpenIdx, setMobileOpenIdx] = useState(0);

  const currentFaq = faqs[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : faqs.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < faqs.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-12 lg:py-16 relative bg-transparent" id="faq">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Frequently Asked <span className="ais-signature-gradient">Questions</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal">
            Security, services, and everything you need to know.
          </p>
        </div>

        {/* Desktop 2-Column Layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: ~45% (col-span-5) */}
          <div className="md:col-span-5 md:pr-4 lg:pr-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/[0.08] pb-8 md:pb-0">
            <div className="space-y-0">
              {faqs.map((faq, idx) => {
                const isActive = activeIdx === idx;

                return (
                  <button
                    key={faq.number}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left py-4 sm:py-4.5 flex items-center justify-between border-b transition-all duration-200 group cursor-pointer ${
                      isActive
                        ? 'border-[#C1121F]'
                        : 'border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 pr-3">
                      <span
                        className={`text-xs sm:text-sm font-mono transition-colors duration-200 ${
                          isActive ? 'text-[#C1121F] font-bold' : 'text-slate-500 font-semibold'
                        }`}
                      >
                        {faq.number}
                      </span>
                      <span
                        className={`text-xs sm:text-sm leading-snug transition-colors duration-200 ${
                          isActive
                            ? 'text-slate-900 dark:text-white font-bold'
                            : 'text-slate-600 dark:text-slate-400 font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200'
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <span
                      className={`text-sm font-mono transition-colors duration-200 shrink-0 ${
                        isActive ? 'text-[#C1121F]' : 'text-slate-400 group-hover:text-slate-700 dark:text-slate-600 dark:group-hover:text-slate-400'
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Left Subtle Accent Text */}
            <div className="pt-8 mt-4 border-t border-slate-200 dark:border-white/[0.06]">
              <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                TRUSTED SECURITY PARTNER FOR A SAFER TOMORROW.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: ~55% (col-span-7) */}
          <div className="md:col-span-7 md:pl-4 lg:pl-8 flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Category & Counter Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="font-mono text-sm">
                  <span className="text-[#C1121F] font-bold">{currentFaq.number}</span>
                  <span className="text-slate-500 ml-1">/ 0{faqs.length}</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D97706] dark:text-[#FFB000] uppercase font-semibold">
                  {currentFaq.category}
                </span>
              </div>

              {/* Big Question Heading */}
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight leading-snug mt-6 mb-5 transition-opacity duration-200">
                {currentFaq.q}
              </h3>

              {/* Answer Body */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal transition-opacity duration-200">
                {currentFaq.a}
              </p>

              {/* 3 Text Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-200 dark:border-white/[0.08]">
                <div>
                  <span className="block text-xs font-mono font-bold text-slate-900 dark:text-slate-200">
                    Identify Risks
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5 font-normal">
                    Continuous discovery
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-mono font-bold text-slate-900 dark:text-slate-200">
                    Strengthen Security
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5 font-normal">
                    Hardening controls
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-mono font-bold text-slate-900 dark:text-slate-200">
                    Stay Resilient
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5 font-normal">
                    Zero disruption
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Controls / Pagination */}
            <div className="flex items-center justify-end gap-3 pt-8 mt-6">
              <button
                onClick={handlePrev}
                aria-label="Previous FAQ"
                className="text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors duration-150 text-sm font-mono flex items-center gap-1.5 cursor-pointer select-none"
              >
                <span>←</span>
              </button>
              <span className="text-[#C1121F]/60 font-mono text-xs select-none">···</span>
              <button
                onClick={handleNext}
                aria-label="Next FAQ"
                className="text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors duration-150 text-sm font-mono flex items-center gap-1.5 cursor-pointer select-none"
              >
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Single-Column Accordion Layout */}
        <div className="md:hidden divide-y divide-slate-200 dark:divide-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = mobileOpenIdx === idx;

            return (
              <div key={faq.number} className="py-3.5">
                <button
                  onClick={() => setMobileOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left flex items-start justify-between gap-3 py-1 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-[#C1121F] font-bold shrink-0 pt-0.5">
                      {faq.number}
                    </span>
                    <span
                      className={`text-sm leading-snug transition-colors duration-150 ${
                        isOpen ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-300 font-medium'
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-bold shrink-0 pt-0.5 select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="pl-7 pr-2 pt-2.5 pb-2 transition-all duration-200">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {faq.a}
                    </p>
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
