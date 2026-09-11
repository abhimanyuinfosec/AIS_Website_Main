import React, { useState, useEffect } from 'react';
import { Star, Plus, Check, X, Trash2, Search, ShieldCheck } from 'lucide-react';
import api from '../../services/api';

export const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    reviewerName: '',
    designation: '',
    organization: '',
    reviewText: '',
    rating: 5,
    verified: true,
    status: 'PUBLISHED',
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reviews', { all: 'true' });
      if (res.success) {
        setReviews(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/reviews/${id}/status`, { status });
      fetchReviews();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleToggleVerified = async (id, currentVerified) => {
    try {
      await api.patch(`/reviews/${id}/status`, { verified: !currentVerified });
      fetchReviews();
    } catch (err) {
      alert('Failed to toggle verification.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      alert('Failed to delete review.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/reviews', formData);
      setModalOpen(false);
      fetchReviews();
    } catch (err) {
      alert(err.message || 'Failed to submit review.');
    } finally {
      setSaving(false);
    }
  };

  const filtered = reviews.filter(
    (r) =>
      r.reviewerName.toLowerCase().includes(search.toLowerCase()) ||
      (r.organization && r.organization.toLowerCase().includes(search.toLowerCase())) ||
      r.reviewText.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Star size={20} className="text-amber-400" />
            <span>Client Reviews & Testimonials Moderation</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Moderate, verify, and publish customer testimonials on the public landing page.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>Add Verified Review</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-xs">Loading reviews...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-xs">No reviews submitted yet.</div>
        ) : (
          filtered.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{r.reviewerName}</span>
                      {r.verified && (
                        <ShieldCheck size={16} className="text-cyan-400" title="Verified Client" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {r.designation} {r.organization ? `@ ${r.organization}` : ''}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      r.status === 'PUBLISHED'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : r.status === 'PENDING'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {Array.from({ length: r.rating || 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">"{r.reviewText}"</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <button
                  onClick={() => handleToggleVerified(r.id, r.verified)}
                  className="text-[11px] text-slate-400 hover:text-cyan-400"
                >
                  {r.verified ? '✓ Verified' : 'Mark Verified'}
                </button>

                <div className="flex items-center gap-2">
                  {r.status !== 'PUBLISHED' && (
                    <button
                      onClick={() => handleUpdateStatus(r.id, 'PUBLISHED')}
                      className="px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 font-semibold text-[11px] border border-emerald-500/30"
                    >
                      Publish
                    </button>
                  )}
                  {r.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleUpdateStatus(r.id, 'REJECTED')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px]"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400"
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
          <div className="w-full max-w-lg bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-slate-800">
              Create Client Testimonial
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Client / Reviewer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.reviewerName}
                  onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="Chief Information Security Officer"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Organization</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="Fintech Corp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Testimonial Text *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="rounded bg-slate-800 text-cyan-500"
                  />
                  <span>Verified Engagement</span>
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
                    {saving ? 'Saving...' : 'Save Review'}
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

export default AdminReviews;
