import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Clock, Tag, User, Calendar, BookOpen,
  ExternalLink, Share2, ChevronRight,
} from 'lucide-react';
import api from '../../services/api';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    api.get(`/blog/${slug}`)
      .then((res) => {
        if (res.success && res.data) {
          setPost(res.data);
          // Fetch related posts from same category
          return api.get('/blog', { limit: 4 });
        } else {
          setNotFound(true);
        }
      })
      .then((relRes) => {
        if (relRes?.success && Array.isArray(relRes.data)) {
          setRelatedPosts(relRes.data.filter((p) => p.slug !== slug).slice(0, 3));
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center p-8">
        <div className="space-y-4">
          <BookOpen size={48} className="mx-auto text-slate-600" />
          <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
          <p className="text-slate-400">This post may have been moved or does not exist.</p>
          <Link to="/insights"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-sm hover:bg-cyan-400 transition">
            <ArrowLeft size={14} /> All Articles
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-600/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-10">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/insights" className="hover:text-cyan-400 transition-colors">Insights</Link>
          <span>/</span>
          <span className="text-cyan-400 truncate max-w-48">{post.title}</span>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {post.category && (
              <span className="text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded">
                {post.category.name}
              </span>
            )}
            {post.featured && (
              <span className="text-xs font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-slate-300 leading-relaxed border-l-2 border-cyan-500 pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-2">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User size={12} className="text-slate-400" />
                <span className="text-slate-300">{post.author.name}</span>
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })}
              </span>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.readingTime} min read
              </span>
            )}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition ml-auto"
              title="Share article"
            >
              <Share2 size={12} /> Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 sm:h-96 object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-invert prose-sm sm:prose-base max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-1 prose-code:rounded prose-code:text-sm
          prose-pre:bg-[#0a0f1a] prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl
          prose-blockquote:border-cyan-500 prose-blockquote:text-slate-400
          prose-li:text-slate-300
          mb-12">
          {post.content ? (
            // Render content — basic line-break support for plain text posts
            post.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h2>;
              if (line.startsWith('## ')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.slice(3)}</h3>;
              if (line.startsWith('### ')) return <h4 key={i} className="text-lg font-bold text-white mt-5 mb-2">{line.slice(4)}</h4>;
              if (line.startsWith('- ') || line.startsWith('* ')) return (
                <div key={i} className="flex items-start gap-2 my-1">
                  <ChevronRight size={14} className="text-cyan-500 flex-shrink-0 mt-1" />
                  <span className="text-slate-300 text-sm">{line.slice(2)}</span>
                </div>
              );
              if (line.trim() === '') return <div key={i} className="h-3" />;
              return <p key={i} className="text-slate-300 leading-relaxed my-2">{line}</p>;
            })
          ) : (
            <p className="text-slate-400 italic">No content available for this article.</p>
          )}
        </article>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-10 border-b border-slate-800">
            <Tag size={13} className="text-slate-500" />
            {post.tags.map((tag) => (
              <span key={tag.id}
                className="text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded hover:border-slate-600 transition cursor-pointer">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="space-y-5 mb-12">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link key={related.id} to={`/insights/${related.slug}`}
                  className="p-4 bg-[#0a0f1a] border border-slate-800 hover:border-cyan-500/30 rounded-xl transition group">
                  <span className="text-[10px] font-mono text-cyan-400 block mb-2">
                    {related.category?.name || 'Insights'}
                  </span>
                  <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-cyan-300 transition line-clamp-2">
                    {related.title}
                  </h3>
                  {related.readingTime && (
                    <span className="text-[10px] text-slate-500 font-mono mt-2 block">{related.readingTime} min read</span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back nav */}
        <Link to="/insights"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition">
          <ArrowLeft size={14} /> Back to Insights
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;
