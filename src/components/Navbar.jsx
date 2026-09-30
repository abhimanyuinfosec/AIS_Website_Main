import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, User, Shield, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';


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
    href: '/products',
  },
  {
    name: 'Insights',
    href: '/insights',
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

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const userDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Switch to slightly opaque after scrolling past top hero banner
      setIsScrolledPastHero(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    }, 180);
  };

  // Transparent ONLY over the Home Page Hero section; slightly opaque for all non-hero views
  const isTransparentHero = location.pathname === '/' && !isScrolledPastHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 pointer-events-auto ${
        isTransparentHero
          ? 'site-header-hero bg-transparent border-b border-transparent backdrop-blur-none'
          : 'site-header-opaque bg-[#080808]/90 border-b border-white/[0.08] backdrop-blur-md shadow-lg shadow-black/40'
      }`}
      data-purpose="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          aria-label="Abhimanyu Cyber Defense Home"
          className="nav-brand-logo-container flex items-center gap-3 group py-1"
          data-purpose="brand-logo"
        >
          <img
            src="/logo.png"
            alt="Abhimanyu InfoSec"
            className="nav-logo-img h-11 sm:h-13 md:h-15 w-auto max-w-[210px] sm:max-w-[250px] md:max-w-[280px] object-contain transition-opacity duration-200 group-hover:opacity-90"
          />
        </Link>

        {/* Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className={`primary-navbar-links hidden lg:flex items-center gap-1 text-xs font-heading font-medium tracking-wide uppercase transition-colors duration-300 px-3 py-1.5 rounded-lg border ${
            isTransparentHero
              ? 'text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-black/30 backdrop-blur-md border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-none'
              : 'text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-[#0E0E0E]/80 border-slate-200/90 dark:border-white/[0.08] shadow-sm dark:shadow-none'
          }`}
        >
          {navSections.map((section) => {
            const hasDropdown = Boolean(section.items && section.items.length > 0);
            const isSectionActive = section.href === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(section.href);
            const isNormalOpen = activeDropdown === section.name;

            return (
              <div
                key={section.name}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(section.name)}
                onMouseLeave={() => hasDropdown && handleMouseLeave()}
              >
                {/* Top-level Nav Link */}
                <Link
                  to={section.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-150 select-none ${
                    isSectionActive
                      ? 'text-[#C1121F] dark:text-white bg-slate-100 dark:bg-[#151515] border border-[#C1121F]/30 dark:border-[#C1121F]/40 shadow-xs dark:shadow-none font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#C1121F] dark:hover:text-[#FFB000] hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                  } ${isNormalOpen ? 'text-[#C1121F] dark:text-[#FFB000] bg-slate-100 dark:bg-[#151515]' : ''}`}
                >
                  <span className="nav-item-label">{section.name}</span>
                  {hasDropdown && (
                    <span className="text-[9px] text-slate-400 dark:text-slate-500">▾</span>
                  )}
                </Link>

                {/* Desktop Dropdown Flyout */}
                {hasDropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 transition-all duration-150 z-50 ${
                      isNormalOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                        : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                    }`}
                    style={{ minWidth: '240px' }}
                  >
                    <div className="absolute -top-3 left-0 right-0 h-3" />

                    <div className="nav-dropdown-menu p-2 rounded-xl bg-[#0B0B0B] border border-white/[0.08] shadow-2xl">
                      <div className="space-y-0.5">
                        {section.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                          >
                            <span className="text-xs font-normal normal-case text-slate-300 group-hover:text-white transition-colors">
                              {subItem.name}
                            </span>
                            <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF7A00] text-xs font-mono">
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

        {/* Right Actions: Auth & Assessment CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3" data-purpose="nav-actions">
          {isAuthenticated ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-[#C1121F]/30 text-white text-xs font-medium transition select-none shadow-sm"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#C1121F]/20 text-[#FFB000] flex items-center justify-center font-bold text-[10px]">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="max-w-[100px] truncate hidden sm:inline">{user?.name}</span>
                <ChevronDown size={12} className={`transition-transform ${userDropdownOpen ? 'rotate-180 text-[#FF7A00]' : 'text-slate-400'}`} />
              </button>

              {userDropdownOpen && (
                <div className="nav-user-dropdown absolute right-0 mt-2 w-48 rounded-xl bg-[#0B0B0B] border border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in-50 duration-150">
                  <div className="px-3 py-2 border-b border-white/[0.08] text-[11px]">
                    <p className="font-semibold text-white truncate">{user?.name}</p>
                    <p className="text-slate-400 font-mono text-[10px] truncate">{user?.email}</p>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-[#FFB000] hover:bg-white/[0.06] transition"
                    >
                      <Shield size={13} className="text-[#FF7A00]" />
                      <span>Admin Console</span>
                    </Link>
                  )}

                  <Link
                    to="/portal"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-[#FFB000] hover:bg-white/[0.06] transition"
                  >
                    <User size={13} className="text-[#FFB000]" />
                    <span>My Account</span>
                  </Link>

                  <button
                    type="button"
                    onClick={async () => {
                      setUserDropdownOpen(false);
                      await logout();
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition text-left"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="nav-signin-btn px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg border border-white/[0.1] transition-all"
            >
              Sign In
            </Link>
          )}

          {/* Small Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="nav-theme-toggle-btn w-8 h-8 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
            title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
            aria-label="Toggle theme mode"
          >
            {isDark ? (
              <Sun size={15} className="text-[#FFB000] hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={15} className="text-[#C1121F] hover:-rotate-12 transition-transform" />
            )}
          </button>

          <Link
            className="px-5 py-2 text-xs font-heading font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:opacity-95 active:scale-[0.98] rounded-lg shadow-md shadow-[#C1121F]/20 border border-white/10 transition-all hidden sm:inline-flex"
            to="/contact"
          >
            Start Here
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white bg-[#111111] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-black/95 px-5 py-5 space-y-3 max-h-[82vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {navSections.map((section) => {
              const hasDropdown = Boolean(section.items && section.items.length > 0);
              const isSectionActive = section.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(section.href);
              const isExpanded = mobileExpandedSection === section.name;

              return (
                <div key={section.name} className="rounded-lg border border-slate-800 overflow-hidden bg-slate-900/40">
                  <div className="flex items-center justify-between">
                    <Link
                      to={section.href}
                      onClick={() => !hasDropdown && setMobileMenuOpen(false)}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        isSectionActive ? 'text-white font-semibold' : 'text-slate-300'
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
                        className="px-4 py-2.5 text-slate-400 hover:text-white text-sm font-mono"
                        aria-label={`Expand ${section.name}`}
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    )}
                  </div>

                  {/* Subsections accordion */}
                  {hasDropdown && isExpanded && (
                    <div className="px-3 pb-3 pt-1 space-y-1 bg-black/40 border-t border-white/[0.08]">
                      {section.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <span>{subItem.name}</span>
                          <span className="text-[#FF7A00] font-mono text-[10px]">→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/[0.08] space-y-2">
            {isAuthenticated ? (
              <div className="space-y-1.5">
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#FFB000] bg-[#111111] border border-[#C1121F]/30 rounded-lg"
                >
                  My Account ({user?.name})
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#151515] border border-white/10 rounded-lg"
                  >
                    Admin Console
                  </Link>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                    navigate('/');
                  }}
                  className="block w-full py-2 text-center text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-200 bg-[#111111] border border-white/10 rounded-lg"
              >
                Sign In / Register
              </Link>
            )}
            {/* Mobile Theme Toggle Row */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#111111] border border-white/10 text-xs">
              <span className="text-slate-300 font-medium">Appearance</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun size={13} className="text-[#FFB000]" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-[#C1121F]" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-xs font-heading font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:opacity-90 rounded-lg shadow-md shadow-[#C1121F]/20"
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
