import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, ExternalLink, GitBranch, Globe, FileText,
  ArrowUpRight, Tag, Search, Filter, Calendar, ChevronRight,
} from 'lucide-react';
import api from '../../services/api';

const STATUS_COLORS = {
  PUBLISHED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  DRAFT: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  ARCHIVED: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

const CATEGORIES = ['All', 'Web Security', 'Network Security', 'Cloud Security', 'IoT/OT', 'DevSecOps', 'Threat Intelligence'];

const FALLBACK_PROJECTS = [
  {
    id: 'p1', name: 'SWIFT Banking Gateway Zero-Trust Perimeter',
    slug: 'swift-banking-gateway-zero-trust',
    shortDesc: 'Designed and implemented a zero-trust security architecture for a banking SWIFT gateway, reducing attack surface by 84%.',
    category: 'Network Security', status: 'PUBLISHED', featured: true,
    tags: ['Zero Trust', 'SWIFT', 'Banking', 'Perimeter Security'],
    techStack: ['Palo Alto NGFW', 'HashiCorp Vault', 'Istio Service Mesh'],
    keyFeatures: ['Mutual TLS everywhere', 'Identity-aware proxy', 'Real-time anomaly detection'],
    completionDate: '2026-01-15',
  },
  {
    id: 'p2', name: 'National Grid SCADA Penetration Assessment',
    slug: 'national-grid-scada-pentest',
    shortDesc: 'Full-scope red team engagement on critical national energy infrastructure including Modbus/DNP3 protocol fuzzing.',
    category: 'IoT/OT', status: 'PUBLISHED', featured: true,
    tags: ['SCADA', 'ICS', 'Red Team', 'Critical Infrastructure'],
    techStack: ['Wireshark', 'Metasploit', 'Custom Modbus Fuzzer'],
    keyFeatures: ['Protocol-level fuzzing', 'Physical-cyber correlation', 'Remediation roadmap'],
    completionDate: '2025-11-20',
  },
  {
    id: 'p3', name: 'Automated CI/CD Container Security Gate',
    slug: 'cicd-container-security-gate',
    shortDesc: 'Integrated automated SAST, DAST, and container image scanning into a Fortune 500 DevSecOps pipeline.',
    category: 'DevSecOps', status: 'PUBLISHED', featured: false,
    tags: ['CI/CD', 'Docker', 'SAST', 'DAST', 'DevSecOps'],
    techStack: ['Trivy', 'Semgrep', 'GitHub Actions', 'SonarQube'],
    keyFeatures: ['Zero critical vulns in 60 days', 'Shift-left security', 'Policy-as-code'],
    completionDate: '2025-09-10',
  },
];

const ProjectCard = ({ project }) => (
  <div className="group bg-[#0a0f1a] border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col">
    {/* Card Header */}
    <div className="p-6 flex-1 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
            {project.category}
          </span>
          {project.featured && (
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>
        {project.completionDate && (
          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 flex-shrink-0">
            <Calendar size={10} />
            {new Date(project.completionDate).getFullYear()}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
          {project.shortDesc}
        </p>
      </div>

      {/* Tech Stack */}
      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono text-slate-500 px-1">+{project.techStack.length - 4}</span>
          )}
        </div>
      )}

      {/* Key Features */}
      {project.keyFeatures?.length > 0 && (
        <ul className="space-y-1">
          {project.keyFeatures.slice(0, 2).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
              <ChevronRight size={12} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Card Footer */}
    <div className="px-6 py-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-500 hover:text-white transition"
            onClick={(e) => e.stopPropagation()}>
            <GitBranch size={14} />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-500 hover:text-white transition"
            onClick={(e) => e.stopPropagation()}>
            <Globe size={14} />
          </a>
        )}
        {project.paperUrl && (
          <a href={project.paperUrl} target="_blank" rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-500 hover:text-white transition"
            onClick={(e) => e.stopPropagation()}>
            <FileText size={14} />
          </a>
        )}
      </div>
      <Link
        to={`/projects/${project.slug}`}
        className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition group-hover:gap-2"
      >
        View Case Study <ArrowUpRight size={13} />
      </Link>
    </div>
  </div>
);

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.get('/projects')
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      })
      .catch(() => setProjects(FALLBACK_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc?.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-black text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-14">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-cyan-400">Security Projects</span>
        </div>

        {/* Hero */}
        <div className="space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Briefcase size={12} />
            CASE STUDIES & ENGAGEMENTS
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Security Projects &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Case Studies
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Real-world adversary simulation, infrastructure hardening, and threat intelligence
            engagements across banking, critical infrastructure, and enterprise environments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Search projects, tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0f1a] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none transition placeholder-slate-600"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-500 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-black border-cyan-500'
                    : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <Briefcase size={40} className="mx-auto mb-4 opacity-30" />
            <p>No projects match your filters.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <section className="space-y-5">
                <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest">Featured Engagements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
              </section>
            )}

            {/* All */}
            {rest.length > 0 && (
              <section className="space-y-5">
                {featured.length > 0 && (
                  <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest">All Projects</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/20 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Have a security challenge?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Our team has handled engagements across banking, critical infrastructure, healthcare, and enterprise environments.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            Start a Conversation <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
