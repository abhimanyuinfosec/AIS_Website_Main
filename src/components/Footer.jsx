import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <footer className="border-t border-white/[0.08] bg-[#080808] text-slate-400 text-xs relative z-10" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <img
                src="/lightlogo.png"
                alt="Abhimanyu InfoSec"
                className="h-11 sm:h-12 w-auto max-w-[210px] sm:max-w-[240px] object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-normal">
              Next-generation autonomous cloud firewall &amp; zero-trust network perimeter. Engineered to defend distributed teams, enterprise systems, and remote endpoints.
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs">
              {/* LinkedIn — brand blue */}
              <a
                href="https://www.linkedin.com/company/abhimanyu-infosec/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-all duration-200"
                style={{ color: '#0A66C2' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0077B5'}
                onMouseLeave={e => e.currentTarget.style.color = '#0A66C2'}
              >
                LinkedIn
              </a>
              <span
                className="font-bold text-sm"
                style={{ background: 'linear-gradient(90deg,#C1121F,#FF7A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ·
              </span>
              {/* Instagram — brand magenta/rose */}
              <a
                href="https://www.instagram.com/abhimanyuinfosec2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-all duration-200"
                style={{ color: '#E1306C' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FD1D1D'}
                onMouseLeave={e => e.currentTarget.style.color = '#E1306C'}
              >
                Instagram
              </a>
              <span
                className="font-bold text-sm"
                style={{ background: 'linear-gradient(90deg,#C1121F,#FF7A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ·
              </span>
              {/* GitHub — brand purple */}
              <a
                href="https://github.com/abhimanyuinfosec"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-all duration-200"
                style={{ color: '#1d0943ff' }}
                onMouseEnter={e => e.currentTarget.style.color = '#A371F7'}
                onMouseLeave={e => e.currentTarget.style.color = '#8957E5'}
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="font-heading font-semibold text-white text-[11px] uppercase tracking-wider">Products</div>
            <ul className="space-y-2.5">
              <li>
                <Link className="hover:text-[#FFB000] transition-colors inline-flex items-center gap-1.5" to="/products">
                  <span>Products</span>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                    Coming Soon
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-heading font-semibold text-white text-[11px] uppercase tracking-wider">Services</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/services/vulnerability-assessment">Vulnerability Assessment</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/services/web-security">Web Security</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/services/network-security">Network Security</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/services/penetration-testing">Penetration Testing</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/services/security-hardening">Security Hardening</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-heading font-semibold text-white text-[11px] uppercase tracking-wider">Company</div>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/about/mission">Our Mission</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/about/approach">Our Approach</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/about/why-ais">Why AIS</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/about/team">Team</Link></li>
              <li><Link className="hover:text-[#FFB000] transition-colors" to="/contact">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px]">
            &copy; 2026 Abhimanyu InfoSec (AIS). All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-slate-500">
            <a className="hover:text-[#FFB000] transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-[#FFB000] transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-[#FFB000] transition-colors" href="#">Trust Center</a>
            <a className="hover:text-[#FFB000] transition-colors" href="#">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
