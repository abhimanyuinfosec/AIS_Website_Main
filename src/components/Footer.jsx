import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.1] bg-[#02040b] text-slate-400 text-xs py-14 relative z-10" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <img 
                src="/logo.png" 
                alt="Abhimanyu InfoSec" 
                className="h-16 sm:h-20 w-auto max-w-[300px] sm:max-w-[360px] object-contain mix-blend-screen filter drop-shadow-[0_2px_18px_rgba(0,240,255,0.35)] group-hover:drop-shadow-[0_2px_26px_rgba(0,240,255,0.65)] transition-all duration-300"
              />
            </Link>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm font-normal">
              Next-generation autonomous cloud firewall &amp; zero-trust network perimeter. Engineered to defend distributed teams, enterprise systems, and remote endpoints.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="inline-block px-2 py-0.5 rounded border border-white/10 text-[10px] bg-white/[0.02]">SOC2 Type II</span>
              <span className="inline-block px-2 py-0.5 rounded border border-white/10 text-[10px] bg-white/[0.02]">ISO 27001</span>
              <span className="inline-block px-2 py-0.5 rounded border border-white/10 text-[10px] bg-white/[0.02]">GDPR Compliant</span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">Product</div>
            <ul className="space-y-2">
              <li><Link className="hover:text-cyan-300 transition-colors" to="/technology">Cloud Firewall</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/solutions">Zero-Trust Network</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/services">Endpoint Sandboxing</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/technology">AI Threat Detection</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/contact">Security Assessment</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">Solutions</div>
            <ul className="space-y-2">
              <li><Link className="hover:text-cyan-300 transition-colors" to="/solutions">Distributed Teams</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/solutions">Work From Home</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/solutions">FinTech Security</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/solutions">HealthTech Compliance</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/solutions">Enterprise Migration</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">Company</div>
            <ul className="space-y-2">
              <li><Link className="hover:text-cyan-300 transition-colors" to="/about">About Abhimanyu</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/about">Careers <span className="text-[10px] text-cyan-400 font-bold ml-1">HIRING</span></Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/insights">Security Research</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/insights">Press &amp; Media</Link></li>
              <li><Link className="hover:text-cyan-300 transition-colors" to="/contact">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            © 2025 Abhimanyu Cyber Defense Intelligence Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-white transition-colors" href="#">Trust Center</a>
            <a className="hover:text-white transition-colors" href="#">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
