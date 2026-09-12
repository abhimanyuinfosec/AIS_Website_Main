import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Product', href: isHome ? '#product' : '/#product' },
    { name: 'About', href: '/about' },
    { 
      name: 'Business', 
      href: '/solutions',
      badge: 'New' 
    },
    { name: 'How it works', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { name: 'Platform', href: isHome ? '#telemetry' : '/technology' },
    { name: 'FAQ', href: isHome ? '#faq' : '/#faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070b1e]/65 border-b border-white/[0.12] shadow-glass-nav transition-all" data-purpose="site-header">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link 
          to="/" 
          aria-label="Abhimanyu Cyber Defense Home" 
          className="flex items-center gap-3 group py-1" 
          data-purpose="brand-logo"
        >
          <img 
            src="/logo.png" 
            alt="Abhimanyu InfoSec" 
            className="h-14 sm:h-16 md:h-18 w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[340px] object-contain filter drop-shadow-[0_2px_18px_rgba(6,182,212,0.45)] group-hover:drop-shadow-[0_2px_26px_rgba(6,182,212,0.75)] group-hover:scale-[1.03] transition-all duration-300"
          />
        </Link>

        {/* Navigation Links with Glass Hover Pills */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((item) => (
            item.href.startsWith('#') || item.href.startsWith('/#') ? (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-all"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.3)]">
                    {item.badge}
                  </span>
                )}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-all"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.3)]">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          ))}
        </nav>

        {/* Right Actions: Pricing Pill & User Profile */}
        <div className="flex items-center gap-3.5" data-purpose="nav-actions">
          <a 
            className="btn-shimmer px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95" 
            href={isHome ? "#pricing" : "/#pricing"}
          >
            Pricing
          </a>
          <Link
            to="/admin/login"
            aria-label="Account sign in" 
            className="w-9 h-9 rounded-full border border-white/15 hover:border-cyan-400/60 flex items-center justify-center text-slate-300 hover:text-white bg-slate-900/60 hover:bg-white/[0.08] backdrop-blur-md transition-all shadow-inner"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-white/15 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-white/[0.08] transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.1] bg-[#070b1e]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              item.href.startsWith('#') || item.href.startsWith('/#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.08]">
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-glow-blue"
            >
              View Pricing
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
