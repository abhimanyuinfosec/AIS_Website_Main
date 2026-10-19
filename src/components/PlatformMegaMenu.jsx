import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { platformCategories } from '../config/platformMenuData';

export const PlatformMegaMenu = ({ isOpen, onClose }) => {
  const [activeTabId, setActiveTabId] = useState(platformCategories[0].id);
  const menuRef = useRef(null);
  const tabRefs = useRef([]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle arrow key navigation across category tabs
  const handleTabKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % platformCategories.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + platformCategories.length) % platformCategories.length;
    }

    if (nextIndex !== null) {
      const nextCategory = platformCategories[nextIndex];
      setActiveTabId(nextCategory.id);
      if (tabRefs.current[nextIndex]) {
        tabRefs.current[nextIndex].focus();
      }
    }
  };

  const activeCategory =
    platformCategories.find((cat) => cat.id === activeTabId) || platformCategories[0];
  const featured = activeCategory.featured || platformCategories[0].featured;

  return (
    <div
      ref={menuRef}
      role="region"
      aria-label="Platform Mega Menu"
      aria-hidden={!isOpen}
      className={`w-full rounded-[22px] overflow-hidden transition-all duration-200 ease-out z-50 motion-reduce:transition-none motion-reduce:transform-none select-none text-[#0F172A] normal-case font-sans ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
      }`}
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(226, 232, 240, 0.95)',
        boxShadow:
          '0 25px 60px -15px rgba(15, 23, 42, 0.15), 0 10px 25px -5px rgba(15, 23, 42, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      <div className="grid grid-cols-12 min-h-[440px]">
        {/* ============================================================ */}
        {/* LEFT COLUMN — PLATFORM NAVIGATION (25%)                      */}
        {/* ============================================================ */}
        <div className="col-span-12 lg:col-span-3 bg-[#F8FAFC] p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3 px-3 font-semibold">
              Platform Navigation
            </div>

            <nav
              role="tablist"
              aria-label="Platform Categories"
              className="space-y-1"
            >
              {platformCategories.map((category, index) => {
                const isActive = activeTabId === category.id;

                return (
                  <button
                    key={category.id}
                    ref={(el) => (tabRefs.current[index] = el)}
                    type="button"
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${category.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onMouseEnter={() => setActiveTabId(category.id)}
                    onClick={() => setActiveTabId(category.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
                    className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-left text-xs font-heading transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]/40 normal-case ${
                      isActive
                        ? 'bg-[#FEF2F2] text-[#C1121F] font-bold border-l-2 border-[#C1121F]'
                        : 'text-slate-700 hover:text-[#0F172A] hover:bg-slate-200/60 border-l-2 border-transparent font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="truncate">{category.name}</span>
                      {category.badge && (
                        <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/80 font-semibold shrink-0">
                          {category.badge}
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <span className="text-[#C1121F] font-mono text-xs font-bold shrink-0 ml-1.5" aria-hidden="true">
                        →
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Link: Explore Platform */}
          <div className="pt-4 border-t border-slate-200/80 mt-5">
            <Link
              to={activeCategory.exploreLink || '/products'}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#C1121F] transition-colors duration-150 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]/40 normal-case"
            >
              <span>Explore Platform</span>
              <span
                className="text-[#C1121F] font-mono text-xs font-bold transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MIDDLE COLUMN — DYNAMIC CONTENT (50%)                        */}
        {/* ============================================================ */}
        <div
          id={`panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
          className="col-span-12 lg:col-span-6 p-6 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-white"
        >
          <div>
            {/* Header: Title and Concise Subtitle */}
            <div className="border-b border-slate-200/70 pb-4 mb-5">
              <h3 className="text-base font-heading font-bold text-[#0F172A] tracking-tight normal-case">
                {activeCategory.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans font-normal normal-case">
                {activeCategory.subtitle}
              </p>
            </div>

            {/* Dynamic Content: Coming Soon state or 2-column cards grid */}
            {activeCategory.isComingSoon ? (
              <div className="py-12 px-6 text-center rounded-2xl bg-[#F8FAFC] border border-slate-200/80 my-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px] font-mono font-semibold uppercase tracking-wider mb-3">
                  Coming Soon
                </span>
                <h4 className="text-base font-heading font-bold text-[#0F172A] mb-2 normal-case">
                  Security Products Coming Soon
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-sans font-normal mb-6 normal-case">
                  {activeCategory.comingSoonText || 'Our proprietary cybersecurity software products are currently under development and will be launching soon.'}
                </p>
                <Link
                  to="/services/vulnerability-assessment"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#8B0D18] transition-colors shadow-xs"
                >
                  <span>Explore Active Services</span>
                  <span className="font-mono text-xs" aria-hidden="true">→</span>
                </Link>
              </div>
            ) : (
              /* 2-Column Grid of Text-Based Cards */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCategory.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className="group flex flex-col justify-between p-3.5 rounded-xl bg-transparent hover:bg-[#F8FAFC] border border-transparent hover:border-slate-200/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-heading font-semibold text-[#0F172A] group-hover:text-[#C1121F] transition-colors duration-150 leading-snug normal-case">
                          {item.name}
                        </h4>
                        {item.badge && (
                          <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span
                        className="text-[#C1121F] font-mono text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 group-hover:text-slate-600 mt-1 leading-relaxed line-clamp-2 font-sans font-normal normal-case">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contextual Bottom Hint */}
          <div className="pt-4 mt-5 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-400 font-sans normal-case">
            <span>Enterprise-grade autonomous defense architecture</span>
            <Link
              to="/contact"
              onClick={onClose}
              className="text-[#C1121F] hover:text-[#8B0D18] font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]/40 normal-case"
            >
              Request Custom Audit →
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN — FEATURED CONTENT (25%)                        */}
        {/* ============================================================ */}
        <div className="col-span-12 lg:col-span-3 p-6 flex flex-col justify-between bg-[#F8FAFC]">
          <div className="h-full flex flex-col justify-between bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div>
              {/* Small Uppercase Label */}
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#C1121F] font-semibold mb-2">
                {featured.label}
              </div>

              {/* Clear Heading */}
              <h4 className="text-sm font-heading font-bold text-[#0F172A] tracking-tight leading-snug mb-2 normal-case">
                {featured.title}
              </h4>

              {/* Short Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal normal-case">
                {featured.description}
              </p>
            </div>

            {/* Actions: Text Link + Primary Assessment CTA */}
            <div className="pt-5 mt-5 border-t border-slate-200/70 space-y-3">
              <Link
                to={featured.exploreLink}
                onClick={onClose}
                className="flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-[#C1121F] transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]/40 normal-case px-1"
              >
                <span>{featured.exploreText}</span>
                <span
                  className="text-[#C1121F] font-mono text-xs font-bold transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <Link
                to={featured.ctaLink}
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-heading font-semibold uppercase tracking-wider text-white bg-[#C1121F] hover:bg-[#8B0D18] active:bg-[#6D0811] rounded-xl shadow-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]/40"
              >
                <span>{featured.ctaText}</span>
                <span className="font-mono text-xs" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformMegaMenu;
