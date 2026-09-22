import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Search, ExternalLink, FileText, Check, X } from 'lucide-react';
import researchService from '../../services/researchService';

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
      const data = await researchService.getAll(true);
      setPapers(data || []);
    } catch (err) {
      console.error('Failed to load research:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
    const unsubscribe = researchService.subscribe((updated) => {
      setPapers(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (paper = null) => {
    if (paper) {
      setEditingPaper(paper);
      setFormData({
        title: paper.title || '',
        slug: paper.slug || '',
        authors: Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors || '',
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
        authors: 'Abhimanyu Research Labs, K. S. Verma',
        category: 'Intrusion Detection Systems',
        abstract: '',
        description: '',
        journal: 'IEEE Transactions on Dependable and Secure Computing',
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
        await researchService.update(editingPaper.id, payload);
      } else {
        await researchService.create(payload);
      }

      setModalOpen(false);
      fetchPapers();
    } catch (err) {
      alert(err.message || 'Failed to save research paper.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await researchService.delete(id);
      fetchPapers();
    } catch (err) {
      alert('Failed to delete research paper.');
    }
  };

  const filtered = papers.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
      (Array.isArray(p.authors) ? p.authors.join(' ') : p.authors || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen size={20} className="text-cyan-400" />
            <span>Cyber Threat Intelligence & Research Papers</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish academic whitepapers, threat telemetry findings, and zero-day disclosures.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>Publish New Paper</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter research by title, category, or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Loading research publications...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No research papers published yet.
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/90 hover:border-slate-700 transition flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {p.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      p.status === 'PUBLISHED'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {p.status}
                  </span>
                  {p.journal && (
                    <span className="text-[11px] text-slate-400 font-mono italic">
                      Published in: {p.journal}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-white text-base leading-snug">{p.title}</h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {p.abstract}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>
                    Authors:{' '}
                    <strong className="text-slate-300">
                      {Array.isArray(p.authors) ? p.authors.join(', ') : p.authors}
                    </strong>
                  </span>
                  {p.doi && (
                    <span className="font-mono text-cyan-400/80">
                      DOI: {p.doi}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800 shrink-0">
                {p.paperUrl && (
                  <a
                    href={p.paperUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg transition"
                    title="View Paper PDF / URL"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => handleOpenModal(p)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition"
                  title="Edit Paper"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="p-2 text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800 rounded-lg transition"
                  title="Delete Paper"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen size={18} className="text-cyan-400" />
                <span>{editingPaper ? 'Edit Research Paper' : 'Publish Research Paper'}</span>
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Research Paper Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Deep Packet Anomaly Detection in High-Throughput Enterprise Gateways"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Authors (comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Abhimanyu Research Labs, K. S. Verma"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Research Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Intrusion Detection Systems">Intrusion Detection Systems</option>
                    <option value="Threat Intelligence">Threat Intelligence</option>
                    <option value="Web & Application Security">Web & Application Security</option>
                    <option value="Zero-Trust Architecture">Zero-Trust Architecture</option>
                    <option value="Adversary Emulation">Adversary Emulation</option>
                    <option value="ICS / SCADA Security">ICS / SCADA Security</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Journal / Conference Name</label>
                  <input
                    type="text"
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. IEEE TDSC or ACM CCS"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">DOI Identifier</label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. 10.1109/TDSC.2025.1092841"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Abstract *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="Summary of research methodology, technical findings, and impact..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Paper / PDF URL</label>
                  <input
                    type="url"
                    value={formData.paperUrl}
                    onChange={(e) => setFormData({ ...formData, paperUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">GitHub Repository</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Dataset URL</label>
                  <input
                    type="url"
                    value={formData.datasetUrl}
                    onChange={(e) => setFormData({ ...formData, datasetUrl: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Citation (Optional)</label>
                <input
                  type="text"
                  value={formData.citation}
                  onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Verma, K. S., et al. (2025). Deep Packet Anomaly Detection using eBPF..."
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Publication Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                >
                  <option value="PUBLISHED">Published (Visible on Public Insights)</option>
                  <option value="DRAFT">Draft / In Review</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
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
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold disabled:opacity-50 transition"
                >
                  {saving ? 'Saving...' : editingPaper ? 'Update Paper' : 'Publish Paper'}
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
