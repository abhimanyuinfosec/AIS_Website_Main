import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, ExternalLink, GitBranch, FileText, Tag,
  Search, Filter, Calendar, ArrowUpRight, Users,
} from 'lucide-react';
import api from '../../services/api';

const CATEGORIES = ['All', 'Threat Intelligence', 'Vulnerability Research', 'Malware Analysis', 'Network Security', 'Privacy & Compliance', 'AI Security'];

const FALLBACK = [
  {
    id: 'r1', title: 'Autonomous Red Teaming with LLM-Guided Exploit Chains',
    slug: 'autonomous-red-teaming-llm-guided',
    abstract: 'We present a framework that uses large language models to autonomously construct multi-stage exploit chains against isolated lab environments, achieving a 73% success rate on CVEs from the last 18 months.',
    authors: ['Abhimanyu InfoSec Research Team'],
    keywords: ['LLM', 'Red Team', 'Autonomous', 'Exploit', 'CVE'],
    category: 'AI Security', featured: true,
    publishedAt: '2026-02-15', journal: 'AIS Research Bulletin',
  },
  {
    id: 'r2', title: 'Modbus Protocol Fuzzing Techniques for ICS Vulnerability Discovery',
    slug: 'modbus-fuzzing-ics-vulnerability',
    abstract: 'A systematic evaluation of protocol-level fuzzing approaches for discovering zero-day vulnerabilities in industrial control systems using Modbus TCP and DNP3.',
    authors: ['AIS Infrastructure Security Lab'],
    keywords: ['ICS', 'SCADA', 'Fuzzing', 'Modbus', 'Zero-Day'],
    category: 'Vulnerability Research', featured: true,
    publishedAt: '2025-11-30', doi: '10.1234/ais.2025.modbus',
  },
  {
    id: 'r3', title: 'Hybrid IDS: Combining Signature and Behavioral Anomaly Detection',
    slug: 'hybrid-ids-signature-behavioral',
    abstract: 'This paper details the design and evaluation of a hybrid intrusion detection system that combines traditional signature matching with ML-based behavioral profiling to reduce false positives by 61%.',
    authors: ['AIS AI & Security Systems Lab'],
    keywords: ['IDS', 'Machine Learning', 'Behavioral Analysis', 'Anomaly Detection'],
    category: 'AI Security', featured: false,
    publishedAt: '2025-09-01',
  },
];

const ResearchCard = ({ paper }) => (
  <article className="group bg-[#0a0f1a] border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.08)] space-y-4 flex flex-col">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wide">
          {paper.category}
        </span>
        {paper.featured && (
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            Featured
          </span>
        )}
      </div>
      {paper.publishedAt && (
        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 flex-shrink-0">
          <Calendar size={10} />
          {new Date(paper.publishedAt).getFullYear()}
        </span>
      )}
    </div>

    <div className="flex-1 space-y-2">
      <h2 className="text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
        {paper.title}
      </h2>
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{paper.abstract}</p>
    </div>

    {/* Authors */}
    {paper.authors?.length > 0 && (
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Users size={11} />
        <span className="truncate">{paper.authors.join(', ')}</span>
      </div>
    )}

    {/* Keywords */}
    {paper.keywords?.length > 0 && (
      <div className="flex flex-wrap gap-1.5">
        {paper.keywords.slice(0, 5).map((kw) => (
          <span key={kw} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
            {kw}
          </span>
        ))}
      </div>
    )}

    {/* Footer links */}
    <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
      <div className="flex items-center gap-2">
        {paper.doi && (
          <span className="text-[10px] font-mono text-slate-600">DOI: {paper.doi}</span>
        )}
        {paper.githubUrl && (
          <a href={paper.githubUrl} target="_blank" rel="noopener noreferrer"
            className="p-1 text-slate-500 hover:text-white transition" onClick={(e) => e.stopPropagation()}>
            <GitBranch size={13} />
          </a>
        )}
        {paper.paperUrl && (
          <a href={paper.paperUrl} target="_blank" rel="noopener noreferrer"
            className="p-1 text-slate-500 hover:text-white transition" onClick={(e) => e.stopPropagation()}>
            <FileText size={13} />
          </a>
        )}
      </div>
      {paper.slug && (
        <Link to={`/research/${paper.slug}`}
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition">
          Read Paper <ArrowUpRight size={12} />
        </Link>
      )}
    </div>
  </article>
);

const ResearchPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.get('/research')
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setPapers(res.data);
        } else {
          setPapers(FALLBACK);
        }
      })
      .catch(() => setPapers(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const filtered = papers.filter((p) => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.abstract?.toLowerCase().includes(search.toLowerCase()) ||
      p.keywords?.some((k) => k.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-14">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-cyan-400">Security Research</span>
        </div>

        {/* Hero */}
        <div className="space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <BookOpen size={12} /> PUBLICATIONS & RESEARCH
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Cybersecurity{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Research
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Original threat intelligence, vulnerability research, and defensive systems published
            by the Abhimanyu InfoSec research team.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text" placeholder="Search papers, keywords..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0f1a] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none transition placeholder-slate-600"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-slate-500 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-black border-cyan-500'
                    : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p>No papers match your filters.</p>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <section className="space-y-5">
                <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest">Featured Research</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featured.map((p) => <ResearchCard key={p.id} paper={p} />)}
                </div>
              </section>
            )}
            {rest.length > 0 && (
              <section className="space-y-5">
                {featured.length > 0 && <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest">All Publications</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((p) => <ResearchCard key={p.id} paper={p} />)}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-blue-500/20 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Interested in collaborating?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            We partner with universities, national labs, and enterprises on applied security research.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Get in Touch <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
