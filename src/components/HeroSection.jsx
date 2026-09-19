import React from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';

const HeroSection = () => {
  return (
    <section className="relative pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16 mb-8 sm:mb-12 overflow-hidden" data-purpose="hero-section">
      {/* Background Images: Side by side across full hero width with entrance settle animations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        <div className="absolute inset-0 flex flex-col md:flex-row w-full h-full opacity-20">
          {/* Left image: comes from up and settles */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden animate-hero-from-top">
            <img
              src={bg1}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Right image: comes from down and settles */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden animate-hero-from-bottom">
            <img
              src={bg2}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-5 sm:space-y-6 relative z-10">
        {/* Main Brand Heading */}
        <h1 className="hero-title font-bold tracking-[-0.035em] leading-[1.08] max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-200 to-white">
          Abhimanyu InfoSec
        </h1>

        {/* Core Subtitle */}
        <h2 className="hero-subtitle font-semibold tracking-[-0.025em] max-w-3xl">
          <span className="block text-slate-100">
            Cybersecurity built for businesses that
          </span>
          <span className="inline-block mt-2 px-3 py-0.5 sm:py-1 bg-[#38bdf8] text-[#030611] font-bold">
            cannot afford to be vulnerable.
          </span>
        </h2>

        {/* Description Body */}
        <p className="hero-body text-slate-400 font-normal leading-relaxed max-w-2xl">
          We help you identify vulnerabilities, detect threats, harden your security posture, and build resilient digital infrastructure without enterprise complexity or cost.
        </p>

        {/* Enterprise CTAs */}
        <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm border border-blue-500/30 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#05080D]"
          >
            <span>Get Free Assessment</span>
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-[#05080D]"
          >
            <span>See How It Works</span>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-slate-400 font-medium">
          <span>350+ Clients Protected</span>
          <span className="hidden sm:block text-slate-700">|</span>
          <span>SOC2 &amp; ISO 27001</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
