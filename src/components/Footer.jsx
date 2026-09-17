import React from 'react';
import { Link } from 'react-router-dom';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#020409] text-slate-400 text-xs relative z-10" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="Abhimanyu InfoSec"
                className="h-12 w-auto max-w-[240px] object-contain mix-blend-screen filter drop-shadow-[0_2px_14px_rgba(0,240,255,0.3)] group-hover:drop-shadow-[0_2px_22px_rgba(0,240,255,0.6)] transition-all duration-300"
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-normal">
              Next-generation autonomous cloud firewall &amp; zero-trust network perimeter. Engineered to defend distributed teams, enterprise systems, and remote endpoints.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-white/10 text-[10px] bg-white/[0.025] text-slate-300 font-medium tracking-wide">SOC2 Type II</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-white/10 text-[10px] bg-white/[0.025] text-slate-300 font-medium tracking-wide">ISO 27001</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-white/10 text-[10px] bg-white/[0.025] text-slate-300 font-medium tracking-wide">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"><LinkedInIcon /></a>
              <a href="#" aria-label="X (Twitter)" className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"><TwitterIcon /></a>
              <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"><GitHubIcon /></a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-white text-[11px] uppercase tracking-widest">Product</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-cyan-300 transition-colors" to="/products/hybrid-ids">Hybrid IDS Engine</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/products/autored-apt">AutoRed APT</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/products/ip-intelligence">IP Intelligence</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/services/threat-detection">Threat Detection</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/contact">Security Assessment</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-white text-[11px] uppercase tracking-widest">Services</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-cyan-300 transition-colors" to="/services/vulnerability-assessment">Vulnerability Assessment</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/services/web-security">Web Security</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/services/network-security">Network Security</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/services/penetration-testing">Penetration Testing</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/services/security-hardening">Security Hardening</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-white text-[11px] uppercase tracking-widest">Company</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-cyan-300 transition-colors" to="/about/mission">Our Mission</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/about/approach">Our Approach</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/about/why-ais">Why AIS</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/about/team">Team</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/contact">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px]">
            &copy; 2025 Abhimanyu Cyber Defense Intelligence Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-slate-500">
            <a className="hover:text-slate-300 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Trust Center</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
