import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsService from '../services/projectsService';

export const FeaturedProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    projectsService.getAll(false).then((data) => {
      if (isMounted) {
        setProjects(data || []);
        setLoading(false);
      }
    });

    const unsubscribe = projectsService.subscribe((updated) => {
      if (isMounted) {
        setProjects(updated.filter((p) => p.status === 'PUBLISHED'));
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (!loading && projects.length === 0) return null;

  return (
    <section className="py-24 bg-[#05080D] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.06),rgba(0,0,0,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise Security Projects &<br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                Hardening Case Studies
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore how Abhimanyu InfoSec engineers replicate advanced adversaries, eliminate container supply chain risks, and isolate critical infrastructure networks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-200 hover:text-white transition"
            >
              <span>Scope Your Project</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Project Cards - Title Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-7 sm:p-8 rounded-2xl bg-[#080d1a]/85 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-center group shadow-xl hover:shadow-2xl relative min-h-[140px]"
            >
              {/* Project Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-slate-200 transition-colors leading-snug">
                {project.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
