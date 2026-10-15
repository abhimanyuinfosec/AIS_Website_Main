import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, User, Shield, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PlatformMegaMenu from './PlatformMegaMenu';
import { platformCategories } from '../config/platformMenuData';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePlatformExpanded, setMobilePlatformExpanded] = useState(true);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState('assessment');
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const platformTimeoutRef = useRef(null);
  const platformWrapperRef = useRef(null);
  const userDropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const firstName = user?.name ? user.name.trim().split(/\s+/)[0] : '';

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (platformWrapperRef.current && !platformWrapperRef.current.contains(event.target)) {
        setIsPlatformOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsPlatformOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname, location.hash, location.search]);

  // Platform Mega Menu hover handlers
  const handlePlatformMouseEnter = () => {
    if (platformTimeoutRef.current) clearTimeout(platformTimeoutRef.current);
    setIsPlatformOpen(true);
  };

  const handlePlatformMouseLeave = () => {
    platformTimeoutRef.current = setTimeout(() => {
      setIsPlatformOpen(false);
    }, 200);
  };

  const handlePlatformClick = () => {
    if (platformTimeoutRef.current) clearTimeout(platformTimeoutRef.current);
    setIsPlatformOpen((prev) => !prev);
  };

  // Active route helpers
  const isHomeActive = location.pathname === '/';
  const isPlatformActive =
    isPlatformOpen ||
    ['/services', '/products', '/insights', '/about'].some((path) =>
      location.pathname.startsWith(path)
    );
  const isPricingActive = location.pathname === '/pricing';
  const isDocsActive = location.pathname === '/docs';

  const getNavLinkClasses = (isActive) =>
    `flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-heading text-xs font-semibold tracking-wide uppercase transition-all duration-150 select-none cursor-pointer ${
      isActive
        ? 'text-[#C1121F] bg-white border border-[#C1121F]/25 shadow-xs font-bold'
        : 'text-black hover:text-[#C1121F] hover:bg-red-50/40'
    }`;

  return (
    <header
      className="site-header-hero fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 pointer-events-auto"
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
      }}
      data-purpose="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link
          to="/"
          aria-label="Abhimanyu Cyber Defense Home"
          className="nav-brand-logo-container flex items-center gap-3 group py-1"
          data-purpose="brand-logo"
        >
          <img
            src="/lightlogo.png"
            alt="Abhimanyu InfoSec"
            className="nav-logo-img h-11 sm:h-13 md:h-15 w-auto max-w-[210px] sm:max-w-[250px] md:max-w-[280px] object-contain transition-opacity duration-200 group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Primary Navigation Bar (4 Links: Home, Platform, Pricing, Docs with generous gap and identical font) */}
        <nav
          aria-label="Primary Navigation"
          className="primary-navbar-links hidden lg:flex items-center gap-2.5 lg:gap-3.5 text-xs font-heading font-semibold tracking-wide uppercase transition-colors duration-300 px-4 py-1.5 rounded-xl border text-slate-700 bg-white/60 backdrop-blur-sm border-slate-200/70 shadow-sm relative"
        >
          {/* 1. Home */}
          <Link to="/" className={getNavLinkClasses(isHomeActive)}>
            <span className="nav-item-label">Home</span>
          </Link>

          {/* 2. Platform (Mega Menu Trigger) */}
          <div
            ref={platformWrapperRef}
            className="relative"
            onMouseEnter={handlePlatformMouseEnter}
            onMouseLeave={handlePlatformMouseLeave}
          >
            <button
              type="button"
              aria-expanded={isPlatformOpen}
              aria-haspopup="menu"
              onClick={handlePlatformClick}
              className={getNavLinkClasses(isPlatformActive)}
            >
              <span className="nav-item-label">Platform</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${
                  isPlatformOpen ? 'rotate-180 text-[#C1121F]' : 'text-black'
                }`}
              />
            </button>

            {/* Invisible hover bridge to keep menu active while moving mouse */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-4" />

            {/* Mega Menu Dropdown */}
            <PlatformMegaMenu
              isOpen={isPlatformOpen}
              onClose={() => setIsPlatformOpen(false)}
            />
          </div>

          {/* 3. Pricing */}
          <Link to="/pricing" className={getNavLinkClasses(isPricingActive)}>
            <span className="nav-item-label">Pricing</span>
          </Link>

          {/* 4. Docs */}
          <Link to="/docs" className={getNavLinkClasses(isDocsActive)}>
            <span className="nav-item-label">Docs</span>
          </Link>
        </nav>

        {/* Right Actions: Auth, User Avatar & Assessment CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3" data-purpose="nav-actions">
          {isAuthenticated ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={user?.name || 'My Account'}
                className="nav-user-pill flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white border border-[#C1121F]/25 text-slate-800 text-xs font-medium transition select-none shadow-xs"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#FDE2E4] text-[#E65100] flex items-center justify-center font-bold text-[10px]">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="max-w-[100px] truncate hidden sm:inline text-slate-800 font-semibold">
                  {firstName || user?.name}
                </span>
                <ChevronDown
                  size={12}
                  className={`transition-transform text-slate-500 ${
                    userDropdownOpen ? 'rotate-180 text-[#FF7A00]' : ''
                  }`}
                />
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
              className="nav-signin-btn px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#C1121F] bg-white/85 hover:bg-white rounded-lg border border-slate-200/90 shadow-xs transition-all"
            >
              Sign In
            </Link>
          )}

          <Link
            className="nav-cta-btn px-5 py-2 text-xs font-heading font-semibold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:opacity-95 active:scale-[0.98] rounded-xl shadow-md shadow-[#C1121F]/20 border border-white/20 transition-all hidden sm:inline-flex"
            to="/contact"
          >
            Start Here
          </Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 bg-white/90 shadow-xs transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Accordion Style) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-xl px-5 py-5 space-y-3.5 max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {/* 1. Mobile Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isHomeActive
                  ? 'bg-rose-50 text-[#C1121F] border border-[#C1121F]/20'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* 2. Mobile Platform Accordion */}
            <div className="rounded-xl border border-slate-200/90 overflow-hidden bg-slate-50/70">
              <button
                type="button"
                onClick={() => setMobilePlatformExpanded(!mobilePlatformExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 bg-slate-100/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-[#C1121F] font-bold">Platform</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition-transform duration-200 ${
                    mobilePlatformExpanded ? 'rotate-180 text-[#C1121F]' : ''
                  }`}
                />
              </button>

              {mobilePlatformExpanded && (
                <div className="p-2.5 space-y-2 bg-white">
                  {platformCategories.map((cat) => {
                    const isCatOpen = mobileExpandedCategory === cat.id;
                    const CatIcon = cat.sidebarIcon;

                    return (
                      <div
                        key={cat.id}
                        className="rounded-lg border border-slate-200/70 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpandedCategory(isCatOpen ? null : cat.id)
                          }
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <span>{cat.name}</span>
                          <ChevronDown
                            size={13}
                            className={`text-slate-400 transition-transform ${
                              isCatOpen ? 'rotate-180 text-[#FF7A00]' : ''
                            }`}
                          />
                        </button>

                        {isCatOpen && (
                          <div className="p-2 space-y-1 bg-white">
                            {cat.groups.flatMap((g) => g.items).map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                              >
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#C1121F] transition-colors">
                                  {item.name}
                                </span>
                                <span className="text-[#C1121F] font-mono text-xs font-bold">
                                  →
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Mobile Price */}
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isPricingActive
                  ? 'bg-rose-50 text-[#C1121F] border border-[#C1121F]/20'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Price
            </Link>

            {/* 4. Mobile Docs */}
            <Link
              to="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isDocsActive
                  ? 'bg-rose-50 text-[#C1121F] border border-[#C1121F]/20'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Docs
            </Link>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="pt-3 border-t border-slate-200/80 space-y-2">
            {isAuthenticated ? (
              <div className="space-y-1.5">
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200 rounded-xl"
                >
                  My Account ({user?.name})
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-xl"
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
                  className="block w-full py-2 text-center text-xs text-rose-500 hover:bg-rose-50 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Sign In / Register
              </Link>
            )}

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center text-xs font-heading font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:opacity-95 rounded-xl shadow-md shadow-[#C1121F]/20"
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
