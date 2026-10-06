import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, ShieldCheck, Cpu, Users } from 'lucide-react';

const ABOUT_TABS = [
  {
    name: 'Our Mission',
    href: '/about/mission',
    icon: Target,
    matches: ['/about', '/about/mission'],
  },
  {
    name: 'Our Approach',
    href: '/about/approach',
    icon: ShieldCheck,
    matches: ['/about/approach'],
  },
  {
    name: 'Why AIS',
    href: '/about/why-ais',
    icon: Cpu,
    matches: ['/about/why-ais'],
  },
  {
    name: 'Team',
    href: '/about/team',
    icon: Users,
    matches: ['/about/team'],
  },
];

export const AboutSubnav = () => {
  const location = useLocation();

  return (
    <div className="border-b border-white/[0.08] pb-5">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {ABOUT_TABS.map((tab) => {
          const isActive = tab.matches.includes(location.pathname);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              to={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-heading font-medium tracking-wide transition-all duration-200 shrink-0 border select-none ${
                isActive
                  ? 'bg-gradient-to-r from-red-600/20 via-amber-500/10 to-red-600/10 text-white border-red-500/60 shadow-[0_0_20px_rgba(193,18,31,0.25)]'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]'
              }`}
            >
              <Icon
                size={15}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[#FFB000]' : 'text-slate-500 group-hover:text-slate-300'
                }`}
              />
              <span>{tab.name}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse shadow-[0_0_8px_#FF7A00]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AboutSubnav;
