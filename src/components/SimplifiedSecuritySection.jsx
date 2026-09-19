import React from 'react';

const SimplifiedSecuritySection = () => {
  return (
    <section className="relative py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800/40 bg-transparent">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Security shouldn't be complicated.
        </h2>

        {/* Subtitle / Problem Statement */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
          Small and mid-sized businesses often don't have dedicated security teams, continuous visibility, or the resources to manage complex security tooling.
        </p>

        {/* Highlight Solution */}
        <div className="pt-2">
          <span className="inline-block text-xl sm:text-2xl font-semibold text-blue-400 tracking-tight">
            We simplify that.
          </span>
        </div>

      </div>
    </section>
  );
};

export default SimplifiedSecuritySection;
