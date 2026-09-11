import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, Search, Tag, Folder } from 'lucide-react';
import api from '../../services/api';

export const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryId: '',
    newCategoryName: '',
    excerpt: '',
    content: '',
    tagNames: '',
    status: 'PUBLISHED',
    featured: false,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsRes, catRes] = await Promise.all([
        api.get('/blog', { all: 'true' }),
        api.get('/blog/categories'),
      ]);

      if (postsRes.success) setPosts(postsRes.data || []);
      if (catRes.success) setCategories(catRes.data || []);
    } catch (err) {
      console.error('Failed to load blog data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        categoryId: post.categoryId || (categories[0]?.id || ''),
        newCategoryName: '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        tagNames: Array.isArray(post.tags) ? post.tags.map((t) => t.name).join(', ') : '',
        status: post.status || 'PUBLISHED',
        featured: !!post.featured,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        categoryId: categories[0]?.id || '',
        newCategoryName: '',
        excerpt: '',
        content: '',
        tagNames: 'Threat Intelligence, Cybersecurity, Defense',
        status: 'PUBLISHED',
        featured: false,
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalCategoryId = formData.categoryId;

      if (!finalCategoryId && formData.newCategoryName) {
        const catRes = await api.post('/blog/categories', { name: formData.newCategoryName });
        if (catRes.success) {
          finalCategoryId = catRes.data.id;
        }
      }

      if (!finalCategoryId && categories.length > 0) {
        finalCategoryId = categories[0].id;
      }

      if (!finalCategoryId) {
        const catRes = await api.post('/blog/categories', { name: 'Threat Intelligence' });
        finalCategoryId = catRes.data.id;
      }

      const payload = {
        title: formData.title,
        slug: formData.slug || undefined,
        categoryId: finalCategoryId,
        excerpt: formData.excerpt,
        content: formData.content,
        tagNames: formData.tagNames.split(',').map((s) => s.trim()).filter(Boolean),
        status: formData.status,
        featured: formData.featured,
      };

      if (editingPost) {
        await api.put(`/blog/${editingPost.id}`, payload);
      } else {
        await api.post('/blog', payload);
      }

      setModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      await api.delete(`/blog/${id}`);
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to delete article.');
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <FileText size={20} className="text-cyan-400" />
            <span>Cyber Threat Intelligence & Blog Publisher</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Author and publish security advisories, vulnerability disclosures, and thought leadership articles.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter intelligence articles..."
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
                <th className="py-3 px-4">Title & Excerpt</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Est. Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">Loading articles...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">No blog posts published yet.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white max-w-md">
                      <div>{p.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1">{p.excerpt}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 font-mono text-[10px]">
                        {p.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{p.author?.name || 'Security Team'}</td>
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
                    <td className="py-3 px-4 text-slate-500 font-mono">{p.readingTime ? `${p.readingTime}m` : '3m'}</td>
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
          <div className="w-full max-w-3xl bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-slate-800">
              {editingPost ? `Edit Article: ${editingPost.title}` : 'Publish Threat Intelligence Report'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 text-sm"
                  placeholder="e.g. Dissecting Modern Multi-Stage Ransomware Tactics"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                  {categories.length > 0 ? (
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="Category name (e.g. Web Security)"
                      value={formData.newCategoryName}
                      onChange={(e) => setFormData({ ...formData, newCategoryName: e.target.value })}
                      className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tagNames}
                    onChange={(e) => setFormData({ ...formData, tagNames: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Executive Excerpt *</label>
                <input
                  type="text"
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="Key briefing summary for index cards and RSS feed"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Article Content (Markdown / Text) *</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono leading-relaxed"
                  placeholder="# Executive Summary&#10;&#10;Recent threat telemetry indicates an escalation..."
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="bg-[#070b14] border border-slate-700 rounded px-2 py-1 text-white font-mono"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded bg-slate-800 text-cyan-500"
                    />
                    <span>Featured</span>
                  </label>
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
                    {saving ? 'Publishing...' : 'Save Article'}
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

export default AdminBlog;
