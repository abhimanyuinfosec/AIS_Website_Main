import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navSections = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Services',
    href: '/services/vulnerability-assessment',
    items: [
      { name: 'Vulnerability Assessment', href: '/services/vulnerability-assessment' },
      { name: 'Web Security', href: '/services/web-security' },
      { name: 'Network Security', href: '/services/network-security' },
      { name: 'Penetration Testing', href: '/services/penetration-testing' },
      { name: 'Threat Detection', href: '/services/threat-detection' },
      { name: 'Security Hardening', href: '/services/security-hardening' },
    ],
  },
  {
    name: 'Products',
    href: '/products/autored-apt',
    items: [
      { name: 'AutoRed APT', href: '/products/autored-apt' },
      { name: 'IP Intelligence', href: '/products/ip-intelligence' },
      { name: 'Hybrid IDS', href: '/products/hybrid-ids' },
    ],
  },
  {
    name: 'Insights',
    href: '/insights/web-security',
    items: [
      { name: 'Web Security', href: '/insights/web-security' },
      { name: 'Network Security', href: '/insights/network-security' },
      { name: 'Cyber Security', href: '/insights/cyber-security' },
      { name: 'Threat Intelligence', href: '/insights/threat-intelligence' },
      { name: 'SME / MSME Security', href: '/insights/sme-security' },
    ],
  },
  {
    name: 'About Us',
    href: '/about/mission',
    items: [
      { name: 'Our Mission', href: '/about/mission' },
      { name: 'Our Approach', href: '/about/approach' },
      { name: 'Why AIS', href: '/about/why-ais' },
      { name: 'Team', href: '/about/team' },
    ],
  },
  {
    name: 'How to Buy',
    href: '/contact',
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  // Close mobile drawer and dropdowns on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash, location.search]);

  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 glass-navbar transition-all" data-purpose="site-header">
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
            className="h-16 sm:h-20 md:h-22 w-auto max-w-[270px] sm:max-w-[340px] md:max-w-[380px] object-contain mix-blend-screen filter drop-shadow-[0_2px_20px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_2px_30px_rgba(0,240,255,0.7)] group-hover:scale-[1.03] transition-all duration-300"
          />
        </Link>

        {/* Navigation Links with Glass Hover Pills & Dropdowns */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-300 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
          {navSections.map((section) => {
            const hasDropdown = Boolean(section.items && section.items.length > 0);
            const isSectionActive = section.href === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(section.href);
            const isOpen = activeDropdown === section.name;

            return (
              <div
                key={section.name}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(section.name)}
                onMouseLeave={() => hasDropdown && handleMouseLeave()}
              >
                {/* Top-level Nav Button or Link */}
                <Link
                  to={section.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 select-none ${
                    isSectionActive
                      ? 'text-white bg-white/[0.12] shadow-sm border border-cyan-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  } ${isOpen ? 'text-cyan-300 bg-white/[0.08]' : ''}`}
                >
                  <span>{section.name}</span>
                  {hasDropdown && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 text-slate-400 ${
                        isOpen ? 'rotate-180 text-cyan-300' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Desktop Glass Dropdown Flyout */}
                {hasDropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 transition-all duration-200 z-50 ${
                      isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                        : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                    }`}
                    style={{ minWidth: '230px' }}
                  >
                    {/* Invisible bridge to prevent mouse gap stutter */}
                    <div className="absolute -top-3 left-0 right-0 h-3" />

                    <div className="p-2 rounded-2xl bg-[rgba(6,16,34,0.96)] border border-cyan-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(0,240,255,0.12)] backdrop-blur-2xl">
                      <div className="space-y-0.5">
                        {section.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/[0.08] hover:border hover:border-cyan-400/25 border border-transparent transition-all group"
                          >
                            <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {subItem.name}
                            </span>
                            <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400 text-xs font-mono">
                              →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions: Assessment CTA */}
        <div className="flex items-center gap-3.5" data-purpose="nav-actions">
          <Link
            className="btn-shimmer px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            to="/contact"
          >
            Start Here
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
        <div className="lg:hidden border-t border-white/[0.1] bg-[#070b1e]/98 backdrop-blur-2xl px-5 py-5 space-y-3 max-h-[82vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {navSections.map((section) => {
              const hasDropdown = Boolean(section.items && section.items.length > 0);
              const isSectionActive = section.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(section.href);
              const isExpanded = mobileExpandedSection === section.name;

              return (
                <div key={section.name} className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <Link
                      to={section.href}
                      onClick={() => !hasDropdown && setMobileMenuOpen(false)}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        isSectionActive ? 'text-cyan-300 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {section.name}
                    </Link>

                    {hasDropdown && (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedSection(isExpanded ? null : section.name)
                        }
                        className="px-4 py-2.5 text-slate-400 hover:text-cyan-300 transition-colors"
                        aria-label={`Expand ${section.name}`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-cyan-300' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Subsections accordion */}
                  {hasDropdown && isExpanded && (
                    <div className="px-3 pb-3 pt-1 space-y-1 bg-black/30 border-t border-white/[0.05]">
                      {section.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors"
                        >
                          <span>{subItem.name}</span>
                          <span className="text-cyan-400 font-mono text-[10px]">→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/[0.08]">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 rounded-full shadow-glow-blue"
            >
              Start Here
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
