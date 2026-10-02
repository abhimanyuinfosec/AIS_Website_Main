import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, Network, Brain, ShieldCheck, Cpu, Zap, Lock, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/60',
    textAccent: 'text-blue-400',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
  cyan: {
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/60',
    textAccent: 'text-blue-400',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
  violet: {
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/60',
    textAccent: 'text-blue-400',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
  emerald: {
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/60',
    textAccent: 'text-blue-400',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
  amber: {
    badge: 'bg-slate-800 text-slate-300 border-slate-700',
    hoverBorder: 'hover:border-blue-500/60',
    textAccent: 'text-blue-400',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
  rose: {
    badge: 'bg-slate-800 text-slate-300 border-slate-700',
    hoverBorder: 'hover:border-blue-500/60',
    textAccent: 'text-blue-400',
    glow: 'from-blue-500/10 via-transparent to-transparent',
  },
};

const comparisonData = [
  { feature: 'Core Focus', autored: 'Offensive Pentesting & Emulation', ipintel: 'Global Threat Signals & Telemetry', hybridids: 'Network Traffic & Anomaly Detection' },
  { feature: 'Detection Mode', autored: 'Active Simulation & Scanning', ipintel: 'Real-time Signal Lookup', hybridids: 'Inline Deep Packet Inspection' },
  { feature: 'Target Audience', autored: 'SecOps, Red Teams & DevOps', ipintel: 'SOC Analysts & Fraud Teams', hybridids: 'Network Engineers & SecOps' },
  { feature: 'Machine Learning', autored: 'Decision-tree attack chaining', ipintel: 'Reputation clustering & scoring', hybridids: 'Deep neural networks & anomaly modeling' },
  { feature: 'Deployment', autored: 'Cloud / On-Prem / Scheduled', ipintel: 'REST API & Stream Feeds', hybridids: 'Inline appliance / Virtual TAP' },
  { feature: 'Compliance Ready', autored: 'SOC 2, ISO 27001, PCI-DSS', ipintel: 'GDPR / Privacy Compliant', hybridids: 'NIST CSF & CIS Controls' },
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await productsService.getAll();
      setProducts(data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();

    const handleUpdate = () => {
      loadProducts();
    };

    window.addEventListener('ais_products_updated', handleUpdate);
    return () => window.removeEventListener('ais_products_updated', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pt-8 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto relative z-10 space-y-16 sm:space-y-20">

        {/* 1. NAVIGATION BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link to="/" className="hover:text-[#C1121F] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#C1121F] font-semibold">Products</span>
        </div>

        {/* 2. HERO / SUITE HEADER */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Automated Defense Products
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Next-generation cybersecurity solutions engineered for continuous offensive validation, real-time threat intelligence, and neural network intrusion defense.
          </p>
        </div>

        {/* 3. DYNAMIC PRODUCT CARDS (CLICKING REDIRECTS TO /slug) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-600 font-semibold">
              Select a Product Card to view its details (/slug)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
            </span>
          </div>

          {loading ? (
            <div className="text-center py-16 text-slate-500 text-sm font-mono">
              Loading security products...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm font-mono">
              No products found. Add products from the Admin Panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {products.map((card) => {
                const slug = card.slug || card.id;

                return (
                  <Link
                    key={card.id || slug}
                    to={`/products/${slug}`}
                    className="product-card group flex flex-col p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    {/* Subtle top card glow */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C1121F]/30 via-[#FF7A00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* 1/4th Horizontal Rectangle Space for Product Photo / Logo */}
                    <div className="w-full h-32 sm:h-36 rounded-xl border border-slate-200 bg-slate-50 mb-4 relative flex items-center justify-center p-4 overflow-hidden group-hover:border-[#C1121F]/30 transition-colors">
                      {/* Badge in top right of rectangle space */}
                      <div className="absolute top-2.5 right-2.5 z-10">
                        <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-700 backdrop-blur-md">
                          {card.badge || 'ENTERPRISE'}
                        </span>
                      </div>

                      {/* Product Photo / Logo */}
                      {card.logoUrl ? (
                        <img
                          src={card.logoUrl}
                          alt={card.name}
                          className="max-h-16 sm:max-h-20 max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextElementSibling) {
                              e.currentTarget.nextElementSibling.classList.remove('hidden');
                            }
                          }}
                        />
                      ) : null}
                      <div className={`${card.logoUrl ? 'hidden ' : ''}flex flex-col items-center justify-center text-slate-500 py-2`}>
                        <span className="text-xs font-mono font-bold tracking-widest text-slate-700 uppercase">AIS DEFENSE</span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tight mt-0.5">Product Logo / Photo Space</span>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="text-xl font-bold text-slate-900 group-hover:text-[#C1121F] transition-colors mb-2">
                      {card.name}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1 mb-5">
                      {card.shortDesc}
                    </p>

                    {/* Metrics Mini-Strip */}
                    {card.metrics && card.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-1.5 py-2.5 mb-5 border border-slate-200 bg-slate-50 rounded-lg px-2 text-center">
                        {card.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="text-xs font-bold text-slate-900 font-mono">{m.value || m.val}</div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-tight">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Feature Pills */}
                    {card.keyFeatures && card.keyFeatures.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {card.keyFeatures.slice(0, 4).map((f) => (
                          <span
                            key={f}
                            className="text-[10px] font-mono text-slate-700 bg-slate-100 border border-slate-200 rounded px-2 py-0.5"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Explore CTA Button */}
                    <div className="text-xs font-semibold text-[#E05500] group-hover:text-[#C94500] flex items-center justify-between pt-3.5 border-t border-slate-200 transition-all">
                      <span className="group-hover:underline underline-offset-4">Explore Product Details</span>
                      <span className="font-mono text-sm group-hover:translate-x-1.5 transition-transform">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. PLATFORM ARCHITECTURE & COMPARISON MATRIX */}
        <div className="space-y-6 pt-6">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-[#C1121F] uppercase mb-1">
              Platform Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Products Comparison Matrix
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-4 font-mono uppercase text-slate-700 font-semibold w-1/4">Specification</th>
                    <th className="p-4 font-bold text-[#C1121F] w-1/4">AutoRed APT</th>
                    <th className="p-4 font-bold text-[#C1121F] w-1/4">IP Intelligence</th>
                    <th className="p-4 font-bold text-[#C1121F] w-1/4">Hybrid IDS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-4 font-medium text-slate-900 font-mono">{row.feature}</td>
                      <td className="p-4 text-slate-700">{row.autored}</td>
                      <td className="p-4 text-slate-700">{row.ipintel}</td>
                      <td className="p-4 text-slate-700">{row.hybridids}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION BANNER */}
        <div className="products-cta-card p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-6 relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight max-w-2xl mx-auto leading-snug">
            Ready to integrate AIS Products into your defense architecture?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Contact our engineering team for specialized enterprise trials, high-throughput API keys, and deployment support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#E05500] hover:bg-[#C94500] rounded-lg transition-colors shadow-md shadow-[#E05500]/25"
            >
              Get Started Now →
            </Link>
            <Link
              to="/services/vulnerability-assessment"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-800 hover:text-black bg-white hover:bg-slate-50 rounded-lg border border-slate-300 shadow-sm transition-colors"
            >
              Explore Security Services
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
