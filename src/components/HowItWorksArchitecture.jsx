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
      className="py-10 lg:py-12 bg-transparent relative overflow-hidden"
      id="how-we-work"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Content */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-slate-500 uppercase">
            <span>—</span>
            <span>OUR APPROACH</span>
            <span>—</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            How We <span className="text-blue-500">Work</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Security starts with understanding your environment. Abhimanyu InfoSec follows a continuous four-step approach to connect, identify risks, strengthen your security, and monitor for emerging threats.
          </p>
        </div>

        {/* Desktop Horizontal 4-Step Journey */}
        <div className="mt-8 sm:mt-10 hidden md:block relative">
          {/* Continuous Connector Line running through the 4 points */}
          <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-[1px] bg-slate-800 pointer-events-none" />

          <div className="grid grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.code}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group transition-all duration-300"
                >
                  {/* Step Number */}
                  <span
                    className={`text-xs font-mono font-bold transition-colors duration-200 ${
                      isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    {step.number}
                  </span>

                  {/* Node point sitting on the connector line */}
                  <div className="h-10 flex items-center justify-center my-1.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-500/15 border border-blue-400/40 ring-4 ring-blue-500/10'
                          : 'bg-[#020508] border border-slate-700/80 group-hover:border-slate-500'
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                          isActive
                            ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                            : 'bg-slate-600 group-hover:bg-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`text-sm sm:text-base font-bold tracking-wider uppercase mt-2 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {step.code}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className={`text-xs sm:text-sm font-medium mt-1 transition-colors duration-200 ${
                      isActive ? 'text-blue-400' : 'text-slate-300 group-hover:text-slate-200'
                    }`}
                  >
                    {step.title}
                  </p>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed mt-3 max-w-[240px] transition-colors duration-200 ${
                      isActive ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300'
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
        <div className="mt-8 md:hidden relative pl-6 space-y-6 border-l border-slate-800 ml-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={step.code}
                onClick={() => setActiveStep(idx)}
                className="relative pl-6 cursor-pointer"
              >
                {/* Node point on the vertical line */}
                <div
                  className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-blue-500/20 border border-blue-400'
                      : 'bg-[#020508] border border-slate-700'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-blue-400' : 'bg-slate-600'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-blue-400">
                    {step.number} — {step.code}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link
            to="/technology"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900 text-sm font-medium text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <span>Explore Our Approach →</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksArchitecture;
