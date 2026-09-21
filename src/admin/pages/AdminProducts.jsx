import React, { useState, useEffect } from 'react';
import { Cpu, Plus, Edit2, Trash2, Search, ExternalLink, RefreshCw, Crosshair, Network, Brain, ShieldCheck, Zap, Lock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    badge: 'OFFENSIVE SECURITY',
    color: 'blue',
    icon: 'Crosshair',
    version: 'v1.0.0',
    status: 'PRODUCTION',
    shortDesc: '',
    detailedDesc: '',
    problem: '',
    keyFeatures: '',
    techStack: '',
    metric1Label: 'Speed',
    metric1Value: '10x Faster',
    metric2Label: 'False Positives',
    metric2Value: '< 0.1%',
    metric3Label: 'Coverage',
    metric3Value: 'OWASP & ATT&CK',
    githubUrl: '',
    demoUrl: '',
    docsUrl: '',
    featured: true,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAll();
      setProducts(data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const handleUpdate = () => {
      fetchProducts();
    };

    window.addEventListener('ais_products_updated', handleUpdate);
    return () => window.removeEventListener('ais_products_updated', handleUpdate);
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        badge: product.badge || 'OFFENSIVE SECURITY',
        color: product.color || 'blue',
        icon: product.icon || 'Crosshair',
        version: product.version || 'v1.0.0',
        status: product.status || 'PRODUCTION',
        shortDesc: product.shortDesc || '',
        detailedDesc: product.detailedDesc || '',
        problem: product.problem || '',
        keyFeatures: Array.isArray(product.keyFeatures) ? product.keyFeatures.join('\n') : '',
        techStack: Array.isArray(product.techStack) ? product.techStack.join(', ') : '',
        metric1Label: product.metrics?.[0]?.label || 'Metric 1',
        metric1Value: product.metrics?.[0]?.value || 'Value 1',
        metric2Label: product.metrics?.[1]?.label || 'Metric 2',
        metric2Value: product.metrics?.[1]?.value || 'Value 2',
        metric3Label: product.metrics?.[2]?.label || 'Metric 3',
        metric3Value: product.metrics?.[2]?.value || 'Value 3',
        githubUrl: product.githubUrl || '',
        demoUrl: product.demoUrl || '',
        docsUrl: product.docsUrl || '',
        featured: !!product.featured,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        badge: 'CYBER DEFENSE',
        color: 'blue',
        icon: 'ShieldCheck',
        version: 'v1.0.0',
        status: 'PRODUCTION',
        shortDesc: '',
        detailedDesc: '',
        problem: '',
        keyFeatures: 'Automated threat detection\nReal-time telemetry\nIncident response workflow',
        techStack: 'Rust, Python, Docker, Kubernetes',
        metric1Label: 'Speed',
        metric1Value: '10x Faster',
        metric2Label: 'Latency',
        metric2Value: '< 45ms',
        metric3Label: 'Accuracy',
        metric3Value: '99.9%',
        githubUrl: 'https://github.com/Abhimanyu-InfoSec',
        demoUrl: '/contact',
        docsUrl: '/contact',
        featured: true,
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        badge: formData.badge,
        color: formData.color,
        icon: formData.icon,
        version: formData.version,
        status: formData.status,
        shortDesc: formData.shortDesc,
        detailedDesc: formData.detailedDesc,
        problem: formData.problem || null,
        keyFeatures: formData.keyFeatures.split('\n').map((s) => s.trim()).filter(Boolean),
        techStack: formData.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        metrics: [
          { label: formData.metric1Label || 'Metric 1', value: formData.metric1Value || 'Active' },
          { label: formData.metric2Label || 'Metric 2', value: formData.metric2Value || '100%' },
          { label: formData.metric3Label || 'Metric 3', value: formData.metric3Value || 'Verified' },
        ],
        githubUrl: formData.githubUrl || null,
        demoUrl: formData.demoUrl || null,
        docsUrl: formData.docsUrl || null,
        featured: formData.featured,
      };

      if (editingProduct) {
        await productsService.update(editingProduct.id, payload);
      } else {
        await productsService.create(payload);
      }

      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await productsService.delete(productToDelete.id);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to delete product.');
    }
  };

  const confirmReset = () => {
    productsService.resetToDefaults();
    setResetConfirmOpen(false);
    fetchProducts();
  };

  const statusColors = {
    PRODUCTION: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    BETA: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    DEVELOPMENT: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    PROTOTYPE: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    CONCEPT: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  const badgeColorMap = {
    blue: 'border-blue-500/30 bg-blue-500/15 text-blue-400',
    cyan: 'border-cyan-500/30 bg-cyan-500/15 text-cyan-400',
    violet: 'border-violet-500/30 bg-violet-500/15 text-violet-400',
    emerald: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400',
    amber: 'border-amber-500/30 bg-amber-500/15 text-amber-400',
    rose: 'border-rose-500/30 bg-rose-500/15 text-rose-400',
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      (p.slug && p.slug.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Cpu size={20} className="text-cyan-400" />
            <span>Products & Tool Cards Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or remove product cards displayed on the public <code className="text-cyan-400 font-mono">/products</code> page and their <code className="text-cyan-400 font-mono">/products/:slug</code> detail pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setResetConfirmOpen(true)}
            title="Reset to default 3 products"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700 transition"
          >
            <RefreshCw size={14} />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search products by name, slug or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none"
          />
        </div>
        <Link
          to="/products"
          target="_blank"
          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
        >
          <span>View Public /products page</span>
          <ExternalLink size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 text-center py-12 text-slate-500 text-xs">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-slate-500 text-xs">
            No products found matching "{search}".
          </div>
        ) : (
          filtered.map((p) => {
            const IconComponent = ICON_MAP[p.icon] || ShieldCheck;
            const badgeClass = badgeColorMap[p.color] || badgeColorMap.blue;

            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                        <IconComponent size={16} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white leading-tight">{p.name}</h2>
                        <div className="text-[10px] font-mono text-cyan-400">
                          /products/{p.slug}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border uppercase tracking-wider ${badgeClass}`}>
                      {p.badge || 'PRODUCT'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 line-clamp-2">{p.shortDesc}</p>

                  {p.keyFeatures && p.keyFeatures.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.keyFeatures.slice(0, 3).map((f, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-400 font-mono">
                          {f}
                        </span>
                      ))}
                      {p.keyFeatures.length > 3 && (
                        <span className="text-[9px] text-slate-500 font-mono">+{p.keyFeatures.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${statusColors[p.status] || statusColors.CONCEPT}`}>
                      {p.status}
                    </span>
                    {p.version && (
                      <span className="text-[9px] font-mono text-slate-500">
                        {p.version}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${p.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="Preview public /slug page"
                    >
                      <ExternalLink size={13} />
                    </Link>
                    <button
                      onClick={() => handleOpenModal(p)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400"
                      title="Edit Product"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setProductToDelete(p)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition"
                      title="Delete Product"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1120] border border-slate-700 rounded-2xl p-6 my-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu size={18} className="text-cyan-400" />
                <span>{editingProduct ? `Edit Product: ${editingProduct.name}` : 'Register New Product Card'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 mb-1 font-semibold">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Cloud Guardian APT"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">URL Slug (/products/:slug)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
                    placeholder="auto-generated from name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Badge Text</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 uppercase font-mono text-[10px]"
                    placeholder="OFFENSIVE SECURITY"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Accent Color</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="blue">Blue</option>
                    <option value="cyan">Cyan</option>
                    <option value="violet">Violet</option>
                    <option value="emerald">Emerald</option>
                    <option value="amber">Amber</option>
                    <option value="rose">Rose</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Crosshair">Crosshair</option>
                    <option value="Network">Network</option>
                    <option value="Brain">Brain</option>
                    <option value="ShieldCheck">ShieldCheck</option>
                    <option value="Cpu">Cpu</option>
                    <option value="Zap">Zap</option>
                    <option value="Lock">Lock</option>
                    <option value="Activity">Activity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="PRODUCTION">PRODUCTION</option>
                    <option value="BETA">BETA</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="PROTOTYPE">PROTOTYPE</option>
                    <option value="CONCEPT">CONCEPT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Card Short Description * (displayed on card)</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="One or two sentences summarizing the product..."
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Detailed Description * (displayed on /products/:slug)</label>
                <textarea
                  rows={3}
                  required
                  value={formData.detailedDesc}
                  onChange={(e) => setFormData({ ...formData, detailedDesc: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="Full technical architecture, scope, and implementation details..."
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Problem Solved (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="The security vulnerability or operational issue this product resolves..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Key Features / Pills (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.keyFeatures}
                    onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
                    placeholder="Reconnaissance&#10;Vulnerability discovery&#10;Security reporting"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Tech Stack (comma-separated)</label>
                  <textarea
                    rows={3}
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
                    placeholder="Python, Docker, FastAPI, eBPF"
                  />
                </div>
              </div>

              {/* Performance & Intelligence Metrics */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-slate-300 font-semibold">Product Card Metrics (3 stats displayed on card & detail page)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#070b14] p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Metric 1</span>
                    <input
                      type="text"
                      placeholder="Label (e.g. Speed)"
                      value={formData.metric1Label}
                      onChange={(e) => setFormData({ ...formData, metric1Label: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-700 rounded px-2 py-1 text-white text-[11px] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 10x Faster)"
                      value={formData.metric1Value}
                      onChange={(e) => setFormData({ ...formData, metric1Value: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-700 rounded px-2 py-1 text-cyan-300 font-bold text-[11px] outline-none font-mono"
                    />
                  </div>

                  <div className="bg-[#070b14] p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Metric 2</span>
                    <input
                      type="text"
                      placeholder="Label (e.g. Latency)"
                      value={formData.metric2Label}
                      onChange={(e) => setFormData({ ...formData, metric2Label: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-700 rounded px-2 py-1 text-white text-[11px] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. < 45ms)"
                      value={formData.metric2Value}
                      onChange={(e) => setFormData({ ...formData, metric2Value: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-700 rounded px-2 py-1 text-cyan-300 font-bold text-[11px] outline-none font-mono"
                    />
                  </div>

                  <div className="bg-[#070b14] p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Metric 3</span>
                    <input
                      type="text"
                      placeholder="Label (e.g. Accuracy)"
                      value={formData.metric3Label}
                      onChange={(e) => setFormData({ ...formData, metric3Label: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-700 rounded px-2 py-1 text-white text-[11px] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 99.4%)"
                      value={formData.metric3Value}
                      onChange={(e) => setFormData({ ...formData, metric3Value: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-700 rounded px-2 py-1 text-cyan-300 font-bold text-[11px] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Action / External Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Demo / Contact URL</label>
                  <input
                    type="text"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
                    placeholder="/contact"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Documentation URL</label>
                  <input
                    type="text"
                    value={formData.docsUrl}
                    onChange={(e) => setFormData({ ...formData, docsUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
                    placeholder="/contact"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-slate-800 text-cyan-500"
                  />
                  <span>Show as Featured Card on /products</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                  >
                    {saving ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product Card'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0b1120] border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Delete Product Card</h3>
                <p className="text-[11px] text-slate-400 font-mono">/products/{productToDelete.slug}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white font-semibold">"{productToDelete.name}"</strong>? This will immediately remove its card from the public <code className="text-cyan-400 font-mono">/products</code> page and decommission its detail page.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Reset Defaults Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <RefreshCw size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Reset Products to Defaults</h3>
                <p className="text-[11px] text-slate-400">Restore Canonical AIS Products</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This will restore the 3 default AIS defense products (<strong className="text-white">AutoRed APT</strong>, <strong className="text-white">IP Intelligence</strong>, and <strong className="text-white">Hybrid IDS</strong>).
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReset}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg transition"
              >
                Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
