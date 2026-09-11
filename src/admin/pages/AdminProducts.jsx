import React, { useState, useEffect } from 'react';
import { Cpu, Plus, Edit2, Trash2, Search, Star, ExternalLink } from 'lucide-react';
import api from '../../services/api';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    version: 'v1.0.0',
    status: 'BETA',
    shortDesc: '',
    detailedDesc: '',
    problem: '',
    keyFeatures: '',
    techStack: '',
    githubUrl: '',
    demoUrl: '',
    docsUrl: '',
    featured: false,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      if (res.success) {
        setProducts(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        version: product.version || 'v1.0.0',
        status: product.status || 'BETA',
        shortDesc: product.shortDesc || '',
        detailedDesc: product.detailedDesc || '',
        problem: product.problem || '',
        keyFeatures: Array.isArray(product.keyFeatures) ? product.keyFeatures.join('\n') : '',
        techStack: Array.isArray(product.techStack) ? product.techStack.join(', ') : '',
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
        version: 'v1.0.0',
        status: 'BETA',
        shortDesc: '',
        detailedDesc: '',
        problem: '',
        keyFeatures: '',
        techStack: '',
        githubUrl: '',
        demoUrl: '',
        docsUrl: '',
        featured: false,
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
        version: formData.version,
        status: formData.status,
        shortDesc: formData.shortDesc,
        detailedDesc: formData.detailedDesc,
        problem: formData.problem || null,
        keyFeatures: formData.keyFeatures.split('\n').map((s) => s.trim()).filter(Boolean),
        techStack: formData.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        githubUrl: formData.githubUrl || null,
        demoUrl: formData.demoUrl || null,
        docsUrl: formData.docsUrl || null,
        featured: formData.featured,
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, payload);
      } else {
        await api.post('/products', payload);
      }

      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete product "${name}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to delete product.');
    }
  };

  const statusColors = {
    PRODUCTION: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    BETA: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    DEVELOPMENT: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    PROTOTYPE: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    CONCEPT: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Cpu size={20} className="text-cyan-400" />
            <span>Cybersecurity Tools & Proprietary Products</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage SANJAY, Hybrid IDS, IP Intelligence, and offensive tool deployments.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>Register New Tool</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter security tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-xs">Loading tools...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-xs">No products found.</div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-white">{p.name}</h2>
                    {p.version && (
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">
                        {p.version}
                      </span>
                    )}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      statusColors[p.status] || statusColors.CONCEPT
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4">{p.shortDesc}</p>

                {p.techStack && p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.techStack.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  {p.featured && <Star size={14} className="text-amber-400 fill-amber-400" />}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(p)}
                    className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-slate-800">
              {editingProduct ? `Edit Tool: ${editingProduct.name}` : 'Register New Security Product'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="SANJAY"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                    placeholder="v1.2.0"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="CONCEPT">CONCEPT</option>
                    <option value="PROTOTYPE">PROTOTYPE</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="BETA">BETA</option>
                    <option value="PRODUCTION">PRODUCTION</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Tagline / Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.detailedDesc}
                  onChange={(e) => setFormData({ ...formData, detailedDesc: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Key Features (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.keyFeatures}
                    onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Tech Stack (Comma-separated)</label>
                  <textarea
                    rows={3}
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
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
                  <span>Featured on Homepage</span>
                </label>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-bold"
                  >
                    {saving ? 'Saving...' : 'Save Product'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
