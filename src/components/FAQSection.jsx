import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How does Abhimanyu operate without on-premise hardware?', a: 'Abhimanyu deploys an autonomous cloud-native zero-trust perimeter. Traffic is routed through nearest PoPs where proprietary machine intelligence sanitizes payloads at wire speed with sub-millisecond overhead.' },
  { q: "Does it slow down my team's connection?", a: 'No. Abhimanyu operates with a verified global latency of under 1.2ms. Our software-defined overlay network optimizes route selection, often resulting in faster connections than traditional VPN gateways.' },
  { q: 'Can we install it on remote employee personal devices (BYOD)?', a: 'Yes. With individual user cryptographic silos, employee personal files and company assets remain strictly air-gapped. Only enterprise-designated traffic traverses the zero-trust tunnel.' },
  { q: 'Is Abhimanyu compliant with SOC2 and ISO standards?', a: 'Yes. Abhimanyu is SOC2 Type II, ISO 27001, and GDPR certified. Encryption keys are rotated per session with zero persistent telemetry footprint.' },
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (bodyRef.current) setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);
  return (
    <div className={"glass-faq-item rounded-2xl overflow-hidden " + (isOpen ? "is-open" : "")}>
      <button onClick={onClick} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group" aria-expanded={isOpen}>
        <span className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">{faq.q}</span>
        <div className={"flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 " + (isOpen ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-400 rotate-180" : "bg-white/5 border-white/10 text-slate-400")}>
          <ChevronDown size={16} />
        </div>
      </button>
      <div style={{ height: height, transition: "height 0.38s cubic-bezier(0.16,1,0.3,1)" }} className="overflow-hidden">
        <div ref={bodyRef} className="px-6 pb-6 pt-0">
          <div className="border-t border-white/[0.08] pt-4 text-sm text-slate-300 leading-relaxed">{faq.a}</div>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="py-24 relative" id="faq">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-3 mb-14">
          <div data-anim="fade" className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-cyan-400/30 text-xs font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md">Knowledge Base</div>
          <h2 data-anim="up" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
          <p data-anim="up" data-anim-delay="100" className="text-slate-400 text-sm max-w-lg mx-auto">Everything you need to know about autonomous cloud defense and enterprise rollout.</p>
        </div>
        <div data-anim-child className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
