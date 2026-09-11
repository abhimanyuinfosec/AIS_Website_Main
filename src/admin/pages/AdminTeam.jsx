import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Mail, Globe } from 'lucide-react';
import api from '../../services/api';

export const AdminTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    shortBio: '',
    detailedBio: '',
    skills: '',
    linkedin: '',
    github: '',
    email: '',
    displayOrder: 0,
    isActive: true,
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/team', { all: 'true' });
      if (res.success) {
        setMembers(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load team:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name || '',
        role: member.role || '',
        shortBio: member.shortBio || '',
        detailedBio: member.detailedBio || '',
        skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
        linkedin: member.linkedin || '',
        github: member.github || '',
        email: member.email || '',
        displayOrder: member.displayOrder || 0,
        isActive: !!member.isActive,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        shortBio: '',
        detailedBio: '',
        skills: 'Offensive Security, Threat Hunting, Reverse Engineering',
        linkedin: '',
        github: '',
        email: '',
        displayOrder: members.length + 1,
        isActive: true,
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
        role: formData.role,
        shortBio: formData.shortBio,
        detailedBio: formData.detailedBio || null,
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        linkedin: formData.linkedin || null,
        github: formData.github || null,
        email: formData.email || null,
        displayOrder: Number(formData.displayOrder) || 0,
        isActive: formData.isActive,
      };

      if (editingMember) {
        await api.put(`/team/${editingMember.id}`, payload);
      } else {
        await api.post('/team', payload);
      }

      setModalOpen(false);
      fetchMembers();
    } catch (err) {
      alert(err.message || 'Failed to save member.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove team member "${name}"?`)) return;
    try {
      await api.delete(`/team/${id}`);
      fetchMembers();
    } catch (err) {
      alert(err.message || 'Failed to delete member.');
    }
  };

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Users size={20} className="text-cyan-400" />
            <span>Cybersecurity Team & Leadership</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage security researchers, penetration testers, threat analysts, and founders.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <Plus size={16} />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter team members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 text-center py-12 text-slate-500 text-xs">Loading team roster...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-slate-500 text-xs">No team members registered yet.</div>
        ) : (
          filtered.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div>
                    <h2 className="font-bold text-white text-sm">{m.name}</h2>
                    <span className="text-xs text-cyan-400 font-mono">{m.role}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">#{m.displayOrder}</span>
                </div>

                <p className="text-xs text-slate-400 mb-3">{m.shortBio}</p>

                {m.skills && m.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {m.skills.map((s, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400">
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                      <Globe size={14} title="LinkedIn / Profile" />
                    </a>
                  )}
                  {m.github && (
                    <a href={m.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                      <Globe size={14} title="GitHub / Repos" />
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="hover:text-cyan-400">
                      <Mail size={14} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(m)}
                    className="p-1.5 text-slate-300 hover:text-cyan-400"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.name)}
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
              {editingMember ? `Edit: ${editingMember.name}` : 'Add Team Member'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Lead Red Team Engineer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Short Bio *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortBio}
                  onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Skills & Certifications (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  placeholder="OSCP, CISSP, Reverse Engineering, eWPTX"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-2 py-1.5 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-2 py-1.5 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-2 py-1.5 text-white font-mono"
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
                  {saving ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
