import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SecurityStackWorkflowVisualizer from './SecurityStackWorkflowVisualizer';

const workflowSteps = [
  {
    stepIndex: 0,
    number: '01',
    code: 'ACCESS',
    title: 'Connect Securely',
    description:
      'Establish secure access to your applications, devices, and network resources with controlled connectivity.',
    color: '#38bdf8',
    glowClass: 'rgba(56, 189, 248, 0.35)',
    activeBorder: 'border-cyan-400/80',
    activeBg: 'bg-[rgba(10,32,60,0.85)]',
  },
  {
    stepIndex: 1,
    number: '02',
    code: 'IDENTIFY',
    title: 'Discover & Assess',
    description:
      'Identify exposed assets, vulnerabilities, suspicious activity, and potential security risks across your environment.',
    color: '#60a5fa',
    glowClass: 'rgba(96, 165, 250, 0.35)',
    activeBorder: 'border-blue-400/80',
    activeBg: 'bg-[rgba(12,30,65,0.85)]',
  },
  {
    stepIndex: 2,
    number: '03',
    code: 'SECURE',
    title: 'Protect & Remediate',
    description:
      'Strengthen your security posture by addressing vulnerabilities, enforcing security controls, and reducing attack surfaces.',
    color: '#00f0ff',
    glowClass: 'rgba(0, 240, 255, 0.45)',
    activeBorder: 'border-[#00f0ff]',
    activeBg: 'bg-[rgba(8,38,72,0.9)]',
  },
  {
    stepIndex: 3,
    number: '04',
    code: 'MONITOR',
    title: 'Detect & Respond',
    description:
      'Continuously monitor your environment for suspicious behavior and emerging threats so risks can be addressed early.',
    color: '#34d399',
    glowClass: 'rgba(52, 211, 153, 0.4)',
    activeBorder: 'border-emerald-400/80',
    activeBg: 'bg-[rgba(6,36,55,0.85)]',
  },
];

const HowItWorksArchitecture = () => {
  // Sync state between the 3D Animation and the compact workflow cards
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="py-20 lg:py-24 bg-gradient-to-b from-[#070b1e]/40 to-[#040714]/70 border-t border-white/[0.08] relative overflow-hidden"
      data-purpose="how-it-works-diagram"
      id="how-we-work"
    >
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: 3D Stack Animation (Untouched, primary visual element) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <SecurityStackWorkflowVisualizer
              externalActiveStep={activeStep}
              onStepChange={(step) => setActiveStep(step)}
            />
          </div>

          {/* Right Column: Section Header, 4 Compact Synchronized Cards, and CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Header Content */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">
                OUR SECURITY APPROACH
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                How We Work
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-xl">
                Security starts with understanding your environment. Abhimanyu InfoSec follows a continuous four-step approach to connect, identify risks, strengthen your security, and monitor for emerging threats.
              </p>
            </div>

            {/* Workflow Cards Grid (Desktop 2x2 compact grid / Mobile vertical list) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {workflowSteps.map((item) => {
                const isActive = activeStep === item.stepIndex || activeStep === 4;

                return (
                  <div
                    key={item.code}
                    onClick={() => setActiveStep(item.stepIndex)}
                    style={{
                      boxShadow: isActive
                        ? `0 0 20px -3px ${item.glowClass}, inset 0 1px 1px rgba(255, 255, 255, 0.22)`
                        : '0 8px 24px -8px rgba(0, 0, 0, 0.55)',
                    }}
                    className={`p-4 sm:p-4.5 rounded-xl transition-all duration-300 cursor-pointer select-none backdrop-blur-md border ${
                      isActive
                        ? `${item.activeBorder} ${item.activeBg} -translate-y-0.5`
                        : 'bg-[rgba(8,24,45,0.55)] border-[rgba(100,190,255,0.14)] hover:border-cyan-400/40 hover:bg-[rgba(10,28,52,0.65)]'
                    }`}
                  >
                    {/* Step label indicator */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                        {item.number} — {item.code}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'scale-110 shadow-[0_0_8px_currentColor]'
                            : 'opacity-30'
                        }`}
                        style={{ backgroundColor: item.color, color: item.color }}
                      />
                    </div>

                    {/* Primary card heading */}
                    <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                      {item.title}
                    </h3>

                    {/* Compact description */}
                    <p className="text-[12px] sm:text-[12.5px] text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Subtle CTA Link */}
            <div className="pt-2">
              <Link
                to="/technology"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                <span>Explore our security approach</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksArchitecture;
