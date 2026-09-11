import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit2, Trash2, Search, ExternalLink, Star } from 'lucide-react';
import api from '../../services/api';

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Application Security',
    shortDesc: '',
    detailedDesc: '',
    problem: '',
    solution: '',
    techStack: '',
    keyFeatures: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    status: 'PUBLISHED',
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects', { all: 'true' });
      if (res.success) {
        setProjects(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name || '',
        slug: project.slug || '',
        category: project.category || 'Application Security',
        shortDesc: project.shortDesc || '',
        detailedDesc: project.detailedDesc || '',
        problem: project.problem || '',
        solution: project.solution || '',
        techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
        keyFeatures: Array.isArray(project.keyFeatures) ? project.keyFeatures.join('\n') : '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: !!project.featured,
        status: project.status || 'PUBLISHED',
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        slug: '',
        category: 'Application Security',
        shortDesc: '',
        detailedDesc: '',
        problem: '',
        solution: '',
        techStack: '',
        keyFeatures: '',
        githubUrl: '',
        liveUrl: '',
        featured: false,
        status: 'PUBLISHED',
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
        category: formData.category,
        shortDesc: formData.shortDesc,
        detailedDesc: formData.detailedDesc,
        problem: formData.problem || null,
        solution: formData.solution || null,
        techStack: formData.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        keyFeatures: formData.keyFeatures.split('\n').map((s) => s.trim()).filter(Boolean),
        githubUrl: formData.githubUrl || null,
        liveUrl: formData.liveUrl || null,
        featured: formData.featured,
        status: formData.status,
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, payload);
      } else {
        await api.post('/projects', payload);
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert(err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete case study "${name}"?`)) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Briefcase size={20} className="text-cyan-400" />
            <span>Cybersecurity Case Studies & Projects</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showcase enterprise audits, red team engagements, and custom security architecture implementations.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>New Case Study</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter projects by title, category, or tech..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070b14] border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Tech Stack</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    Loading project records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No project case studies recorded.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white">
                      <div>{p.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1 max-w-sm">
                        {p.shortDesc}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{p.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.techStack?.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          p.status === 'PUBLISHED'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {p.featured ? <Star size={14} className="text-amber-400 fill-amber-400" /> : <span className="text-slate-600">—</span>}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-slate-800">
              {editingProject ? `Edit Case Study: ${editingProject.name}` : 'Create Security Case Study'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Enterprise Cloud Hardening"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Application Security">Application Security</option>
                    <option value="Network Defense">Network Defense</option>
                    <option value="Red Team / Penetration Testing">Red Team / Penetration Testing</option>
                    <option value="Cloud Security">Cloud Security</option>
                    <option value="Threat Detection">Threat Detection</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Problem / Vulnerability Context</label>
                  <textarea
                    rows={3}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Solution / Defensive Architecture</label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
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
                  <label className="block text-slate-300 mb-1 font-semibold">Tech Stack (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                    placeholder="Docker, Python, Burp Suite, AWS GuardDuty"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Live URL / Repo (Optional)</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded bg-slate-800 text-cyan-500"
                    />
                    <span>Featured on Homepage</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="bg-[#070b14] border border-slate-700 rounded px-2 py-1 text-white font-mono"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

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
                    {saving ? 'Saving...' : 'Save Case Study'}
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

export default AdminProjects;
