import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, GitBranch, Globe, FileText, Tag, Layers,
  Shield, Code2, ChevronRight, ExternalLink, Calendar, Users,
} from 'lucide-react';
import api from '../../services/api';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api.get(`/projects/${slug}`)
      .then((res) => {
        if (res.success && res.data) {
          setProject(res.data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080D] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-[#05080D] flex items-center justify-center text-center p-8">
        <div className="space-y-4">
          <Shield size={48} className="mx-auto text-slate-600" />
          <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
          <p className="text-slate-400">This case study may be classified or does not exist.</p>
          <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-sm hover:bg-cyan-400 transition">
            <ArrowLeft size={14} /> All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-cyan-400 truncate max-w-48">{project.name}</span>
        </div>

        {/* Header */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded">
                Featured
              </span>
            )}
            {project.completionDate && (
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <Calendar size={11} /> Completed {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {project.name}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            {project.shortDesc}
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-sm rounded-lg transition">
                <GitBranch size={14} /> Repository
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-sm rounded-lg transition">
                <Globe size={14} /> Live Demo
              </a>
            )}
            {project.paperUrl && (
              <a href={project.paperUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-sm rounded-lg transition">
                <FileText size={14} /> Report / Paper
              </a>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Main narrative */}
          <div className="lg:col-span-2 space-y-6">

            {project.problem && (
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield size={15} className="text-red-400" /> The Problem
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield size={15} className="text-emerald-400" /> Our Solution
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
              </div>
            )}

            {project.detailedDesc && !project.solution && (
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Engagement Overview</h2>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{project.detailedDesc}</p>
              </div>
            )}

            {project.architecture && (
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers size={15} className="text-blue-400" /> Architecture
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{project.architecture}</p>
              </div>
            )}

            {project.keyFeatures?.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Key Outcomes</h2>
                <ul className="space-y-2.5">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <ChevronRight size={14} className="text-cyan-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Metadata sidebar */}
          <div className="space-y-5">

            {/* Tech Stack */}
            {project.techStack?.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Code2 size={12} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span key={t} className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Security Mechanisms */}
            {project.securityMech?.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield size={12} /> Security Controls
                </h3>
                <ul className="space-y-1.5">
                  {project.securityMech.map((m) => (
                    <li key={m} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#0a0f1a] border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Tag size={12} /> Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-slate-900/60 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 space-y-3 text-center">
              <p className="text-xs text-slate-300">Need a similar engagement?</p>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition w-full"
              >
                Talk to Our Team <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Back */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition">
          <ArrowLeft size={14} /> Back to All Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
