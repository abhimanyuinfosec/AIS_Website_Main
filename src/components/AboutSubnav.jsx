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
    <div className="border-b border-slate-200 dark:border-white/[0.08] pb-5">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {ABOUT_TABS.map((tab) => {
          const isActive = tab.matches.includes(location.pathname);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              to={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-heading tracking-wide transition-all duration-200 shrink-0 border select-none bg-white dark:bg-[#0D0D0D] shadow-xs ${
                isActive
                  ? 'border-slate-300 dark:border-white/20 text-[#C1121F] dark:text-[#FFB000] font-semibold ring-1 ring-slate-200 dark:ring-white/10'
                  : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
              }`}
            >
              <Icon
                size={15}
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-[#C1121F] dark:text-[#FFB000]'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                }`}
              />
              <span>{tab.name}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse shadow-[0_0_6px_#FF7A00]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AboutSubnav;
