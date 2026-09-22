import React, { useState, useEffect } from 'react';
import { Star, Plus, Check, X, Trash2, Search, ShieldCheck, UserCheck, Image, Sparkles } from 'lucide-react';
import reviewsService from '../../services/reviewsService';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
];

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
    profileImage: '',
    reviewText: '',
    rating: 5,
    verified: true,
    status: 'PUBLISHED',
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewsService.getAll(true);
      setReviews(data || []);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    const unsubscribe = reviewsService.subscribe((updated) => {
      setReviews(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await reviewsService.update(id, { status });
      fetchReviews();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleToggleVerified = async (id, currentVerified) => {
    try {
      await reviewsService.update(id, { verified: !currentVerified });
      fetchReviews();
    } catch (err) {
      alert('Failed to toggle verification.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client review?')) return;
    try {
      await reviewsService.delete(id);
      fetchReviews();
    } catch (err) {
      alert('Failed to delete review.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await reviewsService.create(formData);
      setModalOpen(false);
      setFormData({
        reviewerName: '',
        designation: '',
        organization: '',
        profileImage: '',
        reviewText: '',
        rating: 5,
        verified: true,
        status: 'PUBLISHED',
      });
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
            Moderate, verify, and publish customer reviews shown on the public website.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>Add Verified Review</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter reviews by reviewer, company, or text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-xs">Loading reviews...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No reviews submitted yet.
          </div>
        ) : (
          filtered.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {r.profileImage ? (
                      <img
                        src={r.profileImage}
                        alt={r.reviewerName}
                        className="w-11 h-11 rounded-full object-cover border border-cyan-500/40"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                        {r.reviewerName.charAt(0)}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">{r.reviewerName}</span>
                        {r.verified && (
                          <ShieldCheck size={15} className="text-cyan-400" title="Verified Client" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {r.designation} {r.organization ? `@ ${r.organization}` : ''}
                      </div>
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
                  {r.verified ? '✓ Verified Badge Active' : '+ Mark as Verified'}
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
                    className="p-1.5 text-slate-500 hover:text-red-400 transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Star size={18} className="text-amber-400" />
                <span>Create Client Testimonial</span>
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Client / Reviewer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.reviewerName}
                    onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Michael Vance"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Designation / Role</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Chief Information Security Officer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Organization / Company</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Apex FinTech Global"
                />
              </div>

              {/* Photo / Avatar URL with presets */}
              <div>
                <label className="block text-slate-300 mb-1 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Image size={13} className="text-cyan-400" />
                    <span>Reviewer Photo / Avatar URL</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Optional</span>
                </label>
                <input
                  type="url"
                  value={formData.profileImage}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="https://... or select preset below"
                />

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-400">Presets:</span>
                  <div className="flex items-center gap-1.5">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, profileImage: preset })}
                        className={`w-6 h-6 rounded-full overflow-hidden border transition ${
                          formData.profileImage === preset ? 'border-cyan-400 scale-110' : 'border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <img src={preset} alt={`preset-${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Rating (1 to 5 Stars)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                  <option value={3}>⭐⭐⭐ 3 Stars - Average</option>
                  <option value={2}>⭐⭐ 2 Stars</option>
                  <option value={1}>⭐ 1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Testimonial Review Text *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="Write the client's review, findings, and feedback here..."
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="accent-cyan-500"
                  />
                  <span>Mark as Verified Client</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.status === 'PUBLISHED'}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked ? 'PUBLISHED' : 'PENDING' })
                    }
                    className="accent-emerald-500"
                  />
                  <span>Publish Immediately</span>
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
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold disabled:opacity-50 transition"
                >
                  {saving ? 'Saving...' : 'Save & Publish Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
