import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    code: 'ACCESS',
    title: 'Connect Securely',
    desc: 'Establish secure access to your applications, devices, and network resources with controlled connectivity.',
  },
  {
    number: '02',
    code: 'IDENTIFY',
    title: 'Discover & Assess',
    desc: 'Identify exposed assets, vulnerabilities, suspicious activity, and potential security risks across your environment.',
  },
  {
    number: '03',
    code: 'SECURE',
    title: 'Protect & Remediate',
    desc: 'Strengthen your security posture by addressing vulnerabilities, enforcing security controls, and reducing attack surfaces.',
  },
  {
    number: '04',
    code: 'MONITOR',
    title: 'Detect & Respond',
    desc: 'Continuously monitor your environment for suspicious behavior and emerging threats so risks can be addressed early.',
  },
];

const HowItWorksArchitecture = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="py-12 lg:py-16 bg-transparent relative overflow-hidden"
      id="how-we-work"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Content */}
        <div data-no-anim className="text-center space-y-4 max-w-3xl mx-auto">
          <h2
            data-no-anim
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            How We <span className="ais-signature-gradient">Work</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Security starts with understanding your environment. Abhimanyu InfoSec follows a continuous four-step approach to connect, identify risks, strengthen your security, and monitor for emerging threats.
          </p>
        </div>

        {/* Desktop Horizontal 4-Step Journey */}
        <div data-no-anim className="mt-10 sm:mt-12 hidden md:block relative">
          <div className="grid grid-cols-4 gap-0">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.code}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group transition-all duration-300 px-3 lg:px-5 relative"
                >
                  {/* Step Number */}
                  <span
                    className={`text-xs font-mono font-bold tracking-wider transition-colors duration-200 ${
                      isActive ? 'text-[#C1121F]' : 'text-slate-500 group-hover:text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {step.number}
                  </span>

                  {/* Node & Connecting Line Row */}
                  <div className="w-full relative flex items-center justify-center my-3 h-10">
                    {/* Left Connector Line (connects from left column edge to node center) */}
                    {idx > 0 && (
                      <div
                        className={`absolute left-0 right-1/2 h-[2px] top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                          idx <= activeStep
                            ? 'bg-gradient-to-r from-[#FF7A00] to-[#C1121F]'
                            : 'bg-slate-200 dark:bg-white/[0.1]'
                        }`}
                      />
                    )}

                    {/* Right Connector Line (connects from node center to right column edge) */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-1/2 right-0 h-[2px] top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                          idx < activeStep
                            ? 'bg-gradient-to-r from-[#C1121F] to-[#FF7A00]'
                            : 'bg-slate-200 dark:bg-white/[0.1]'
                        }`}
                      />
                    )}

                    {/* Node Circle sitting cleanly on top with protective halo buffer so line never overlaps */}
                    <div className="relative z-10 p-2 bg-[#F8FAFC] dark:bg-[#080808] rounded-full transition-all duration-300">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 bg-white dark:bg-slate-900 ${
                          isActive
                            ? 'border-2 border-[#FF7A00] ring-4 ring-[#FF7A00]/20 shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                            : 'border border-slate-300 dark:border-slate-700 group-hover:border-[#C1121F]/40 shadow-xs'
                        }`}
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-[#FF7A00] scale-110 shadow-[0_0_8px_rgba(255,122,0,0.8)]'
                              : 'bg-slate-400 dark:bg-slate-600 group-hover:bg-[#C1121F]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step Title - Fixed high-contrast text color for light theme */}
                  <h3
                    className={`text-sm sm:text-base font-heading font-bold tracking-wider uppercase mt-1 transition-colors duration-200 ${
                      isActive ? 'text-[#C1121F]' : 'text-slate-900 dark:text-white group-hover:text-[#C1121F]'
                    }`}
                  >
                    {step.code}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className={`text-xs sm:text-sm font-semibold mt-1 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#FF7A00]'
                        : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  >
                    {step.title}
                  </p>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed mt-2 max-w-[240px] transition-colors duration-200 ${
                      isActive
                        ? 'text-slate-700 dark:text-slate-300'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical 4-Step Journey */}
        <div className="mt-8 md:hidden relative pl-6 space-y-6 border-l-2 border-slate-200 dark:border-white/[0.08] ml-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={step.code}
                onClick={() => setActiveStep(idx)}
                className="relative pl-6 cursor-pointer"
              >
                {/* Node point on the vertical line with protective halo */}
                <div className="absolute -left-[33px] top-0.5 p-1 bg-[#F8FAFC] dark:bg-[#080808] rounded-full z-10">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all bg-white dark:bg-slate-900 ${
                      isActive
                        ? 'border-2 border-[#FF7A00] ring-4 ring-[#FF7A00]/20 shadow-[0_0_10px_rgba(255,122,0,0.3)]'
                        : 'border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive ? 'bg-[#FF7A00]' : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#C1121F]">
                    {step.number} : {step.code}
                  </span>
                  <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Button */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            to="/about/approach"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-300 dark:border-white/10 hover:border-[#FF7A00]/50 bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#151515] text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-all shadow-sm"
          >
            <span>Explore Our Approach →</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksArchitecture;
