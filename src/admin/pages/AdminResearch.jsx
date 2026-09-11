import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Search, ExternalLink, FileText } from 'lucide-react';
import api from '../../services/api';

export const AdminResearch = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    authors: '',
    category: 'Intrusion Detection Systems',
    abstract: '',
    description: '',
    journal: '',
    doi: '',
    paperUrl: '',
    datasetUrl: '',
    githubUrl: '',
    citation: '',
    status: 'PUBLISHED',
  });

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/research', { all: 'true' });
      if (res.success) {
        setPapers(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load research:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleOpenModal = (paper = null) => {
    if (paper) {
      setEditingPaper(paper);
      setFormData({
        title: paper.title || '',
        slug: paper.slug || '',
        authors: Array.isArray(paper.authors) ? paper.authors.join(', ') : '',
        category: paper.category || 'Intrusion Detection Systems',
        abstract: paper.abstract || '',
        description: paper.description || '',
        journal: paper.journal || '',
        doi: paper.doi || '',
        paperUrl: paper.paperUrl || '',
        datasetUrl: paper.datasetUrl || '',
        githubUrl: paper.githubUrl || '',
        citation: paper.citation || '',
        status: paper.status || 'PUBLISHED',
      });
    } else {
      setEditingPaper(null);
      setFormData({
        title: '',
        slug: '',
        authors: 'Abhimanyu Security Research Team',
        category: 'Intrusion Detection Systems',
        abstract: '',
        description: '',
        journal: '',
        doi: '',
        paperUrl: '',
        datasetUrl: '',
        githubUrl: '',
        citation: '',
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
        title: formData.title,
        slug: formData.slug || undefined,
        authors: formData.authors.split(',').map((s) => s.trim()).filter(Boolean),
        category: formData.category,
        abstract: formData.abstract,
        description: formData.description || null,
        journal: formData.journal || null,
        doi: formData.doi || null,
        paperUrl: formData.paperUrl || null,
        datasetUrl: formData.datasetUrl || null,
        githubUrl: formData.githubUrl || null,
        citation: formData.citation || null,
        status: formData.status,
      };

      if (editingPaper) {
        await api.put(`/research/${editingPaper.id}`, payload);
      } else {
        await api.post('/research', payload);
      }

      setModalOpen(false);
      fetchPapers();
    } catch (err) {
      alert(err.message || 'Failed to save paper.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete research paper "${title}"?`)) return;
    try {
      await api.delete(`/research/${id}`);
      fetchPapers();
    } catch (err) {
      alert(err.message || 'Failed to delete paper.');
    }
  };

  const filtered = papers.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen size={20} className="text-cyan-400" />
            <span>Cybersecurity Research & Publications</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish academic papers, whitepapers, datasets, and threat analysis citations.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>New Research Paper</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter research publications..."
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
                <th className="py-3 px-4">Publication Title</th>
                <th className="py-3 px-4">Authors</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Journal / DOI</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">Loading publications...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">No research papers registered yet.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white max-w-xs">
                      <div>{p.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1">{p.abstract}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{p.authors?.join(', ')}</td>
                    <td className="py-3 px-4 text-cyan-400/90 font-mono">{p.category}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{p.journal || p.doi || 'Preprint'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {p.status}
                      </span>
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
                          onClick={() => handleDelete(p.id, p.title)}
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
              {editingPaper ? `Edit Paper: ${editingPaper.title}` : 'Publish New Research Paper'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Paper Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Authors (Comma-separated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Abstract *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Journal / Conference</label>
                  <input
                    type="text"
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">DOI Identifier</label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                    placeholder="10.1145/..."
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">PDF Document URL</label>
                  <input
                    type="text"
                    value={formData.paperUrl}
                    onChange={(e) => setFormData({ ...formData, paperUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
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
                  {saving ? 'Saving...' : 'Save Publication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResearch;
