import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

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
    return () => { isMounted = false; };
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
            Knowledge • Threat Research
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Security knowledge that helps you stay ahead.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Practical cybersecurity insights for businesses, developers and security teams.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Explore Security Insights →
            </Link>
          </div>
        </div>

        {/* 2. CATEGORIES */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Focus Domains
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Categories
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

        {/* 3. EXAMPLE ARTICLE CARDS */}
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

        {/* 4. CALL TO ACTION BANNER */}
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
