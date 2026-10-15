import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { platformCategories } from '../config/platformMenuData';

export const PlatformMegaMenu = ({ isOpen, onClose }) => {
  const [activeTabId, setActiveTabId] = useState(platformCategories[0].id);
  const menuRef = useRef(null);

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

  const activeCategory =
    platformCategories.find((cat) => cat.id === activeTabId) || platformCategories[0];

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Platform Mega Menu"
      aria-hidden={!isOpen}
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[920px] max-w-[calc(100vw-2.5rem)] rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.06)] border border-slate-200/90 bg-white transition-all duration-200 ease-out z-50 ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
      }`}
    >
      <div className="flex flex-row min-h-[420px]">
        {/* LEFT SIDEBAR: Clean White / Soft-Slate with Category Tabs (No Icons) */}
        <div className="w-[260px] bg-slate-50/80 p-5 flex flex-col justify-between shrink-0 select-none border-r border-slate-200/80">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3 px-2 font-semibold">
              Platform Categories
            </div>

            <nav className="space-y-1" aria-label="Mega menu category tabs">
              {platformCategories.map((category) => {
                const isActive = activeTabId === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveTabId(category.id)}
                    onClick={() => setActiveTabId(category.id)}
                    className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-left text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#C1121F] font-bold shadow-xs border border-slate-200/90'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent font-medium'
                    }`}
                  >
                    <span className="truncate">{category.name}</span>
                    {isActive && (
                      <span className="text-[#C1121F] font-mono text-xs font-bold shrink-0 ml-1.5">
                        →
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Divider & Explore Platform Link */}
          <div className="pt-4 border-t border-slate-200/80 mt-auto">
            <Link
              to={activeCategory.exploreLink || '/products'}
              onClick={onClose}
              className="flex items-center justify-between px-2 text-xs font-semibold text-slate-700 hover:text-[#C1121F] transition-colors group"
            >
              <span>Explore the platform</span>
              <span className="text-[#C1121F] font-mono transition-transform duration-150 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT CONTENT PANEL: White with Category Header and Service Items (No Icons) */}
        <div className="flex-1 bg-white p-6 sm:p-7 flex flex-col justify-between">
          <div>
            {/* Header: Title & Subtitle */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-heading font-bold text-slate-900 tracking-tight">
                {activeCategory.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {activeCategory.subtitle}
              </p>
            </div>

            {/* Links Grid without icons */}
            <div className="mt-5 space-y-4">
              {activeCategory.groups.map((group) => (
                <div key={group.groupTitle}>
                  {group.groupTitle && (
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-semibold">
                      {group.groupTitle}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-slate-50/90 border border-transparent hover:border-slate-200/80 transition-all group"
                      >
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#C1121F] transition-colors leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-[#C1121F] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-mono text-xs font-bold">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtle bottom contextual hint */}
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Enterprise-grade autonomous defense</span>
            <Link
              to="/contact"
              onClick={onClose}
              className="text-[#C1121F] hover:text-[#FF7A00] font-medium transition-colors"
            >
              Request Custom Audit →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformMegaMenu;
