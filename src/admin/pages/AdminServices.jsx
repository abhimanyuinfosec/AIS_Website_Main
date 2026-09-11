import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit2, Trash2, Check, X, Search, Star } from 'lucide-react';
import api from '../../services/api';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: 'ShieldAlert',
    shortDesc: '',
    detailedDesc: '',
    problem: '',
    objectives: '',
    features: '',
    deliverables: '',
    tools: '',
    featured: false,
    isActive: true,
    displayOrder: 0,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services', { all: 'true' });
      if (res.success) {
        setServices(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name || '',
        slug: service.slug || '',
        icon: service.icon || 'ShieldAlert',
        shortDesc: service.shortDesc || '',
        detailedDesc: service.detailedDesc || '',
        problem: service.problem || '',
        objectives: Array.isArray(service.objectives) ? service.objectives.join('\n') : '',
        features: Array.isArray(service.features) ? service.features.join('\n') : '',
        deliverables: Array.isArray(service.deliverables) ? service.deliverables.join('\n') : '',
        tools: Array.isArray(service.tools) ? service.tools.join(', ') : '',
        featured: !!service.featured,
        isActive: !!service.isActive,
        displayOrder: service.displayOrder || 0,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        slug: '',
        icon: 'ShieldAlert',
        shortDesc: '',
        detailedDesc: '',
        problem: '',
        objectives: '',
        features: '',
        deliverables: '',
        tools: '',
        featured: false,
        isActive: true,
        displayOrder: services.length + 1,
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
        icon: formData.icon,
        shortDesc: formData.shortDesc,
        detailedDesc: formData.detailedDesc,
        problem: formData.problem || null,
        objectives: formData.objectives.split('\n').map((s) => s.trim()).filter(Boolean),
        features: formData.features.split('\n').map((s) => s.trim()).filter(Boolean),
        deliverables: formData.deliverables.split('\n').map((s) => s.trim()).filter(Boolean),
        tools: formData.tools.split(',').map((s) => s.trim()).filter(Boolean),
        featured: formData.featured,
        isActive: formData.isActive,
        displayOrder: Number(formData.displayOrder) || 0,
      };

      if (editingService) {
        await api.put(`/services/${editingService.id}`, payload);
      } else {
        await api.post('/services', payload);
      }

      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert(err.message || 'Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete service "${name}"?`)) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.message || 'Failed to delete service.');
    }
  };

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Shield size={20} className="text-cyan-400" />
            <span>Cybersecurity Services Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage assessment, engineering, offensive, and defensive security offerings.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter services by name or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070b14] border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Service Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    Loading service definitions...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No services found matching query.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono text-slate-500">{s.displayOrder}</td>
                    <td className="py-3 px-4 font-semibold text-white">
                      <div>{s.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1 max-w-sm">
                        {s.shortDesc}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-cyan-400/80">{s.slug}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          s.isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {s.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {s.featured ? (
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(s)}
                          className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
                          title="Edit Service"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.name)}
                          className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                          title="Delete Service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h2 className="text-base font-bold text-white">
                {editingService ? `Edit Service: ${editingService.name}` : 'Create New Cybersecurity Service'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Web Application Security"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Slug (Auto-generated if blank)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                    placeholder="web-application-security"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Short Summary / Tagline *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="Concise 1-2 sentence description for service card"
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
                  placeholder="Detailed breakdown of methodology, scope, and technical procedures..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Key Objectives (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                    placeholder="Identify zero-day vulnerabilities&#10;Harden API attack surface"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Key Deliverables (1 per line)</label>
                  <textarea
                    rows={3}
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                    placeholder="Executive Risk Report&#10;Proof-of-concept exploits"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Security Tools (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.tools}
                  onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="Burp Suite, Nmap, Wireshark, Hybrid IDS"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>Active (Live on Website)</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <div>
                  <label className="block text-slate-400 mb-0.5">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded px-2 py-1 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
