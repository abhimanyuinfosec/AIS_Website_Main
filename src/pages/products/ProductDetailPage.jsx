import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Crosshair,
  Network,
  Brain,
  ShieldCheck,
  Cpu,
  Zap,
  Lock,
  Activity,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
} from 'lucide-react';
import productsService from '../../services/productsService';

const ICON_MAP = {
  Crosshair,
  Network,
  Brain,
  ShieldCheck,
  Cpu,
  Zap,
  Lock,
  Activity,
};

const COLOR_MAP = {
  blue: {
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    accentText: 'text-blue-400',
    button: 'bg-blue-600 hover:bg-blue-500 text-white',
    secondaryButton: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30',
    border: 'border-blue-500/30',
    glow: 'from-blue-600/15 via-blue-900/5 to-transparent',
    iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    pill: 'bg-blue-950/40 border-blue-800/60 text-blue-300',
  },
  cyan: {
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    accentText: 'text-blue-400',
    button: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold',
    secondaryButton: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30',
    border: 'border-blue-500/30',
    glow: 'from-blue-600/15 via-blue-900/5 to-transparent',
    iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    pill: 'bg-blue-950/40 border-blue-800/60 text-blue-300',
  },
  violet: {
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    accentText: 'text-blue-400',
    button: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold',
    secondaryButton: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30',
    border: 'border-blue-500/30',
    glow: 'from-blue-600/15 via-blue-900/5 to-transparent',
    iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    pill: 'bg-blue-950/40 border-blue-800/60 text-blue-300',
  },
  emerald: {
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    accentText: 'text-blue-400',
    button: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold',
    secondaryButton: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30',
    border: 'border-blue-500/30',
    glow: 'from-blue-600/15 via-blue-900/5 to-transparent',
    iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    pill: 'bg-blue-950/40 border-blue-800/60 text-blue-300',
  },
  amber: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    accentText: 'text-amber-400',
    button: 'bg-amber-600 hover:bg-amber-500 text-white font-bold',
    secondaryButton: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30',
    border: 'border-amber-500/30',
    glow: 'from-amber-600/15 via-amber-900/5 to-transparent',
    iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    pill: 'bg-amber-950/40 border-amber-800/60 text-amber-300',
  },
  rose: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    accentText: 'text-rose-400',
    button: 'bg-rose-600 hover:bg-rose-500 text-white',
    secondaryButton: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30',
    border: 'border-rose-500/30',
    glow: 'from-rose-600/15 via-rose-900/5 to-transparent',
    iconBg: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
    pill: 'bg-rose-950/40 border-rose-800/60 text-rose-300',
  },
};

const STATUS_MAP = {
  PRODUCTION: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  BETA: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  DEVELOPMENT: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  PROTOTYPE: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  CONCEPT: 'bg-slate-800 text-slate-400 border-slate-700',
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    if (!slug) return;
    try {
      setLoading(true);
      const data = await productsService.getBySlug(slug);
      setProduct(data || null);
    } catch (err) {
      console.error('Failed to load product details for slug:', slug, err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();

    const handleUpdate = () => {
      fetchProduct();
    };

    window.addEventListener('ais_products_updated', handleUpdate);
    return () => window.removeEventListener('ais_products_updated', handleUpdate);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080D] flex items-center justify-center text-blue-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-mono text-xs tracking-widest uppercase text-slate-400">Loading Product Telemetry...</span>
        </div>
      </div>
    );
  }

  // If product not found or was removed from admin
  if (!product) {
    return (
      <div className="min-h-screen bg-[#05080D] text-slate-200 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#090e1a] border border-slate-800 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert size={32} />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">Product Not Found</div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Security Module Unavailable</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              The product module with slug <code className="text-blue-400 font-mono">/products/{slug}</code> does not exist or has been modified/removed in the admin portal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition"
            >
              ← Back to Products Suite
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const colorConfig = COLOR_MAP[product.color] || COLOR_MAP.blue;
  const IconComponent = ICON_MAP[product.icon] || ShieldCheck;
  const statusClass = STATUS_MAP[product.status] || STATUS_MAP.PRODUCTION;

  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-10 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Dynamic ambient color glow */}
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b ${colorConfig.glow} rounded-full blur-[150px] pointer-events-none`} />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16 sm:space-y-20">

        {/* 1. NAVIGATION BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link>
          <span>/</span>
          <span className={colorConfig.accentText}>{product.name}</span>
        </div>

        {/* 2. HERO SECTION */}
        <div className="space-y-8 max-w-4xl">
          {(product.status || product.version) && (
            <div className="flex flex-wrap items-center gap-3">
              {product.status && (
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border ${statusClass}`}>
                  {product.status}
                </span>
              )}
              {product.version && (
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                  {product.version}
                </span>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-lg">
                {product.logoUrl ? (
                  <img
                    src={product.logoUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.classList.remove('hidden');
                      }
                    }}
                  />
                ) : null}
                <div className={`${product.logoUrl ? 'hidden ' : ''}w-full h-full flex flex-col items-center justify-center text-slate-400`}>
                  <span className="text-xs font-mono font-bold text-slate-300">AIS</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Product</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                {product.name}
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
              {product.shortDesc}
            </p>

            {product.detailedDesc && (
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal pt-1">
                {product.detailedDesc}
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={product.demoUrl || '/contact'}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold transition shadow-lg ${colorConfig.button}`}
            >
              <span>Explore {product.name}</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>

            <Link
              to={product.docsUrl || '/contact'}
              className={`inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold transition ${colorConfig.secondaryButton}`}
            >
              <span>Technical Documentation</span>
            </Link>

            {product.githubUrl && (
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-sm transition"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Source / Repo</span>
                <ExternalLink size={12} className="text-slate-500" />
              </a>
            )}
          </div>
        </div>

        {/* 3. PERFORMANCE & INTELLIGENCE METRICS */}
        {product.metrics && product.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#090e1a]/80 border border-slate-800/80 backdrop-blur-md relative overflow-hidden"
              >
                <div className={`text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1 ${colorConfig.accentText}`}>
                  {m.value || m.val}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. THE CHALLENGE & PROBLEM SOLVED */}
        {product.problem && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0b1222]/70 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <AlertTriangle size={15} />
              <span>The Threat Vector / Operational Challenge</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why Traditional Defenses Fall Short
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {product.problem}
            </p>
          </div>
        )}

        {/* 5. CORE CAPABILITIES / PLATFORM FEATURES */}
        {product.keyFeatures && product.keyFeatures.length > 0 && (
          <div className="space-y-8">
            <div>
              <div className={`text-xs font-bold font-mono tracking-widest uppercase mb-2 ${colorConfig.accentText}`}>
                Platform Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Core Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.keyFeatures.map((capability, idx) => {
                const parts = capability.includes(':') ? capability.split(':') : [capability, ''];
                const title = parts[0].trim();
                const desc = parts.slice(1).join(':').trim();

                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0b1222]/80 border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`text-xs font-mono font-bold uppercase mb-2 ${colorConfig.accentText}`}>
                        0{idx + 1}
                      </div>
                      <h3 className="text-base font-semibold text-white leading-snug group-hover:text-blue-300 transition-colors">
                        {title}
                      </h3>
                      {desc && (
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. ENGINEERING STACK & ARCHITECTURE */}
        {product.techStack && product.techStack.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#080d19] border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              <Layers size={15} className={colorConfig.accentText} />
              <span>Technology & Engineering Stack</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {product.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border ${colorConfig.pill}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 7. BOTTOM CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1426] via-[#080d19] to-[#0c1426] border border-slate-800 text-center space-y-6 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Sparkles size={20} />
          </div>
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Deploy {product.name} across your infrastructure.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Integrate with existing SecOps workflows or schedule an enterprise architecture briefing.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/contact"
              className={`inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg transition-all shadow-xl ${colorConfig.button}`}
            >
              <span>Explore {product.name} →</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
