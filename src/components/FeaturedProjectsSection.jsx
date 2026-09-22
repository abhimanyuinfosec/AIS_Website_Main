import React, { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, ExternalLink, Terminal, ArrowRight, ShieldCheck, Code2 } from 'lucide-react';
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.08),rgba(0,0,0,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider uppercase">
              <Terminal size={14} />
              <span>Proven Field Engagements</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise Security Projects & <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
            >
              <span>Scope Your Project</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-7 sm:p-8 rounded-3xl bg-[#080d1a]/85 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative"
            >
              <div className="space-y-5">
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-mono font-medium">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {project.name}
                </h3>

                {/* Problem & Solution */}
                <div className="space-y-3 text-xs leading-relaxed">
                  {project.problem && (
                    <div className="p-3.5 rounded-xl bg-[#05080d] border border-red-500/20 text-slate-300">
                      <span className="text-[10px] font-mono font-bold text-red-400 block mb-1 uppercase tracking-wider">
                        Threat Scenario / Challenge
                      </span>
                      {project.problem}
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-3.5 rounded-xl bg-[#05080d] border border-emerald-500/20 text-slate-300">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1 uppercase tracking-wider">
                        Engineered Defense
                      </span>
                      {project.solution}
                    </div>
                  )}

                  {!project.problem && !project.solution && (
                    <p className="text-slate-400">
                      {project.shortDesc || project.detailedDesc}
                    </p>
                  )}
                </div>

                {/* Key Deliverables */}
                {Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer Tech Stack & Links */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
                {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] text-slate-500 font-mono self-center">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                    >
                      <Code2 size={13} className="text-cyan-400" />
                      <span>Defense Repo</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">Confidential Engagement</span>
                  )}

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>Request Debrief</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
