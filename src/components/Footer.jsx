import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#05080D] text-slate-400 text-xs relative z-10" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="Abhimanyu InfoSec"
                className="h-12 w-auto max-w-[240px] object-contain mix-blend-screen transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-normal">
              Next-generation autonomous cloud firewall &amp; zero-trust network perimeter. Engineered to defend distributed teams, enterprise systems, and remote endpoints.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-slate-800 text-[10px] bg-slate-900 text-slate-300 font-medium tracking-wide">SOC2 Type II</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-slate-800 text-[10px] bg-slate-900 text-slate-300 font-medium tracking-wide">ISO 27001</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-slate-800 text-[10px] bg-slate-900 text-slate-300 font-medium tracking-wide">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-4 pt-1 text-xs">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
              <span className="text-slate-700">·</span>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">X (Twitter)</a>
              <span className="text-slate-700">·</span>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-white text-[11px] uppercase tracking-widest">Product</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-white transition-colors" to="/products/hybrid-ids">Hybrid IDS Engine</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/products/autored-apt">AutoRed APT</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/products/ip-intelligence">IP Intelligence</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/services/threat-detection">Threat Detection</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/contact">Security Assessment</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-white text-[11px] uppercase tracking-widest">Services</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-white transition-colors" to="/services/vulnerability-assessment">Vulnerability Assessment</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/services/web-security">Web Security</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/services/network-security">Network Security</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/services/penetration-testing">Penetration Testing</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/services/security-hardening">Security Hardening</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-white text-[11px] uppercase tracking-widest">Company</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-white transition-colors" to="/about/mission">Our Mission</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/about/approach">Our Approach</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/about/why-ais">Why AIS</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/about/team">Team</Link></li>
              <li><Link className="hover:text-white transition-colors" to="/contact">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
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
