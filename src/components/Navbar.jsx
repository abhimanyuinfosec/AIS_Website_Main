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
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link 
          to="/" 
          aria-label="Abhimanyu Cyber Defense Home" 
          className="flex items-center gap-3 group" 
          data-purpose="brand-logo"
        >
          {/* Shield/Fortress Geometric SVG Icon with Glass Rim */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-brand-600 to-indigo-700 shadow-glow-blue border border-white/25 group-hover:scale-105 group-hover:shadow-glow-cyan transition-all duration-300">
            <svg 
              className="w-5 h-5 text-white filter drop-shadow" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2.2" 
              viewBox="0 0 24 24"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4" strokeWidth="2"></path>
            </svg>
            <span className="absolute inset-0 rounded-xl bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2 drop-shadow-sm">
            <span className="abhimanyu-gradient-animated">Abhimanyu</span>
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse"></span>
          </span>
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
