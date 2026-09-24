import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit2, Trash2, Search, Star, X } from 'lucide-react';
import projectsService from '../../services/projectsService';

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
    category: 'Adversary Simulation & Hardening',
    shortDesc: '',
    detailedDesc: '',
    problem: '',
    solution: '',
    techStack: '',
    keyFeatures: '',
    githubUrl: '',
    liveUrl: '',
    featured: true,
    status: 'PUBLISHED',
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getAll(true);
      setProjects(data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    const unsubscribe = projectsService.subscribe((updated) => {
      setProjects(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name || '',
        slug: project.slug || '',
        category: project.category || 'Adversary Simulation & Hardening',
        shortDesc: project.shortDesc || '',
        detailedDesc: project.detailedDesc || '',
        problem: project.problem || '',
        solution: project.solution || '',
        techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack || '',
        keyFeatures: Array.isArray(project.keyFeatures) ? project.keyFeatures.join('\n') : project.keyFeatures || '',
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
        category: 'Adversary Simulation & Hardening',
        shortDesc: '',
        detailedDesc: '',
        problem: '',
        solution: '',
        techStack: '',
        keyFeatures: '',
        githubUrl: '',
        liveUrl: '',
        featured: true,
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
        category: formData.category || 'General',
        shortDesc: formData.shortDesc || formData.name,
        detailedDesc: formData.detailedDesc || formData.name,
        problem: formData.problem || null,
        solution: formData.solution || null,
        techStack: formData.techStack ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean) : [],
        keyFeatures: formData.keyFeatures ? formData.keyFeatures.split('\n').map((s) => s.trim()).filter(Boolean) : [],
        githubUrl: formData.githubUrl || null,
        liveUrl: formData.liveUrl || null,
        featured: formData.featured,
        status: formData.status,
      };

      if (editingProject) {
        await projectsService.update(editingProject.id, payload);
      } else {
        await projectsService.create(payload);
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
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await projectsService.delete(id);
      fetchProjects();
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      await projectsService.update(id, { featured: !currentFeatured });
      fetchProjects();
    } catch (err) {
      alert('Failed to toggle featured status.');
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Briefcase size={20} className="text-blue-400" />
            <span>Cyber Defense & Engineering Projects</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showcase enterprise hardening projects, adversary simulation cases, and SCADA assessments on the main website.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg transition"
        >
          <Plus size={16} />
          <span>New Defense Project</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter projects by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-slate-600 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-500 text-xs">Loading defense projects...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No projects found. Click "New Defense Project" to create one.
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition group shadow-lg min-h-[130px]"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFeatured(p.id, p.featured)}
                      title={p.featured ? 'Featured on Home' : 'Not featured'}
                      className={`p-1 rounded transition ${p.featured ? 'text-amber-400 hover:text-amber-300' : 'text-slate-600 hover:text-slate-400'}`}
                    >
                      <Star size={14} className={p.featured ? 'fill-amber-400' : ''} />
                    </button>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        p.status === 'PUBLISHED'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-slate-200 transition leading-snug">
                  {p.name}
                </h3>
              </div>

              <div className="flex items-center justify-end pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenModal(p)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1120] border border-slate-800 rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase size={18} className="text-blue-400" />
                <span>{editingProject ? 'Edit Defense Project' : 'Create Defense Project'}</span>
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 mb-1 font-semibold">Case Study Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                    placeholder="e.g. Global Banking SWIFT Gateway Red Team & Hardening"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category (Optional)</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="Adversary Simulation & Hardening">Adversary Simulation & Hardening</option>
                    <option value="Cloud Security & DevSecOps">Cloud Security & DevSecOps</option>
                    <option value="Industrial Security (OT/ICS)">Industrial Security (OT/ICS)</option>
                    <option value="Web & Application Security">Web & Application Security</option>
                    <option value="Zero-Trust Architecture">Zero-Trust Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Case Study / Live URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Short Summary (Optional)</label>
                <input
                  type="text"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="Brief summary..."
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Threat Context / Problem Identified (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="What was vulnerable or exposed in the client's architecture?"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Security Solution & Engineering Delivered (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
                  placeholder="How did Abhimanyu InfoSec validate the risk and fortify defenses?"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>Feature on Home Page</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.status === 'PUBLISHED'}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked ? 'PUBLISHED' : 'DRAFT' })
                    }
                    className="accent-emerald-500"
                  />
                  <span>Published & Live</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-50 transition"
                >
                  {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
