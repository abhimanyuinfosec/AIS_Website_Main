import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, ExternalLink, Code2, Database, Award, ArrowUpRight } from 'lucide-react';
import api from '../../services/api';
import researchService from '../../services/researchService';

const defaultArticles = [
  {
    badge: 'Web Security',
    title: '5 Web Security Risks Every Business Should Know',
    desc: 'Learn how common application vulnerabilities can impact your business.',
    slug: '5-web-security-risks-every-business-should-know',
  },
  {
    badge: 'SME Security',
    title: 'Why SMEs Are Becoming Targets for Cyber Attacks',
    desc: 'Understanding why smaller organizations need practical security controls.',
    slug: 'why-smes-are-becoming-targets-for-cyber-attacks',
  },
  {
    badge: 'Defensive Strategy',
    title: 'What Is Attack Surface Management?',
    desc: 'A practical introduction to discovering and reducing exposed assets.',
    slug: 'what-is-attack-surface-management',
  },
  {
    badge: 'Assessment Guide',
    title: 'Vulnerability Assessment vs Penetration Testing',
    desc: 'Understand the difference and when your organization needs each.',
    slug: 'vulnerability-assessment-vs-penetration-testing',
  },
];

const InsightsPage = () => {
  const [articles, setArticles] = useState(defaultArticles);
  const [researchPapers, setResearchPapers] = useState([]);
  const [researchLoading, setResearchLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.get('/blog')
      .then((res) => {
        if (!isMounted || !res.success || !Array.isArray(res.data) || res.data.length === 0) return;
        const liveArticles = res.data.map((post) => ({
          badge: post.category?.name || 'Security Insight',
          title: post.title,
          desc: post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : ''),
          slug: post.slug,
          readingTime: post.readingTime,
        }));
        setArticles(liveArticles);
      })
      .catch(() => {});

    // Fetch research papers
    researchService.getAll(false).then((papers) => {
      if (isMounted) {
        setResearchPapers(papers || []);
        setResearchLoading(false);
      }
    });

    const unsubscribeResearch = researchService.subscribe((updated) => {
      if (isMounted) {
        setResearchPapers(updated.filter((p) => p.status === 'PUBLISHED'));
      }
    });

    return () => {
      isMounted = false;
      unsubscribeResearch();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-blue-400">Insights</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider uppercase font-medium">
            Knowledge • Threat Research • Publications
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Security knowledge that helps you stay ahead.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Practical cybersecurity insights, threat intelligence reports, and peer-reviewed security research papers for enterprises, developers, and defensive teams.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="#research-section"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              Browse Research Papers ↓
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Request Custom Threat Briefing →
            </Link>
          </div>
        </div>

        {/* 2. SECURITY RESEARCH & WHITEPAPERS SECTION (DYNAMIC FROM BACKEND) */}
        <div id="research-section" className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
                <BookOpen size={14} />
                <span>Academic & Threat Intelligence Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Published Research & Technical Whitepapers
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Peer-reviewed papers, proprietary intrusion detection algorithms, and protocol vulnerability analyses produced by Abhimanyu InfoSec researchers.
              </p>
            </div>

            <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg shrink-0">
              {researchPapers.length} Peer-Reviewed Document{researchPapers.length === 1 ? '' : 's'}
            </span>
          </div>

          {researchLoading ? (
            <div className="text-center py-12 text-slate-500 text-xs">Loading publications...</div>
          ) : researchPapers.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
              No research papers currently published.
            </div>
          ) : (
            <div className="space-y-6">
              {researchPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-6 sm:p-8 rounded-2xl bg-[#080d1a] border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-mono font-medium">
                          {paper.category}
                        </span>
                        {paper.journal && (
                          <span className="text-[11px] text-slate-400 font-mono italic">
                            Published in: <strong className="text-slate-300">{paper.journal}</strong>
                          </span>
                        )}
                        {paper.doi && (
                          <span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                            DOI: {paper.doi}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {paper.title}
                      </h3>

                      {/* Abstract */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {paper.abstract}
                      </p>

                      {/* Authors & Citations */}
                      <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center gap-4">
                        <div>
                          Authors:{' '}
                          <span className="text-slate-200 font-medium">
                            {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}
                          </span>
                        </div>
                        {paper.citation && (
                          <div className="text-[11px] text-slate-500 font-mono">
                            Citation: {paper.citation}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                      {paper.paperUrl && (
                        <a
                          href={paper.paperUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        >
                          <FileText size={14} />
                          <span>Read Whitepaper</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}

                      {paper.githubUrl && (
                        <a
                          href={paper.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
                        >
                          <Code2 size={14} className="text-cyan-400" />
                          <span>Code Repository</span>
                        </a>
                      )}

                      {paper.datasetUrl && (
                        <a
                          href={paper.datasetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-cyan-400 transition"
                        >
                          <Database size={13} />
                          <span>Research Dataset</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. CATEGORIES */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Focus Domains
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Security Domains & Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Web Security',
                desc: 'Understand vulnerabilities, application security and secure development.',
              },
              {
                name: 'Network Security',
                desc: 'Learn how attackers discover and exploit network weaknesses.',
              },
              {
                name: 'Cybersecurity',
                desc: 'Practical security concepts, strategies and defensive practices.',
              },
              {
                name: 'Threat Intelligence',
                desc: 'Understand emerging threats, indicators and attacker behavior.',
              },
              {
                name: 'SME / MSME Security',
                desc: 'Security guidance designed around the realities of smaller organizations.',
              },
            ].map((category, idx) => (
              <div
                key={category.name}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    Category 0{idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{category.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{category.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. EXAMPLE ARTICLE CARDS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Featured Publications
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Latest Security Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div
                key={article.title}
                className="p-7 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono">
                      {article.badge}
                    </span>
                    {article.readingTime && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {article.readingTime} min read
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2.5 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {article.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Ready to strengthen your cybersecurity posture?
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Explore Security Insights →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsightsPage;
