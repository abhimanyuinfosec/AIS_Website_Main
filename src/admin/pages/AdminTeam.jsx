import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Mail, Globe, Image, ExternalLink, RefreshCw, UserCheck } from 'lucide-react';
import teamService from '../../services/teamService';

export const AdminTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    profileImage: '',
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
      const data = await teamService.getAll(true);
      setMembers(data || []);
    } catch (err) {
      console.error('Failed to load team:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();

    const handleUpdate = () => {
      fetchMembers();
    };

    window.addEventListener('ais_team_updated', handleUpdate);
    return () => window.removeEventListener('ais_team_updated', handleUpdate);
  }, []);

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name || '',
        role: member.role || '',
        profileImage: member.profileImage || '',
        shortBio: member.shortBio || '',
        detailedBio: member.detailedBio || '',
        skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
        linkedin: member.linkedin || '',
        github: member.github || '',
        email: member.email || '',
        displayOrder: member.displayOrder || 0,
        isActive: member.isActive !== false,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        profileImage: '',
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
        profileImage: formData.profileImage?.trim() || null,
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
        await teamService.update(editingMember.id, payload);
      } else {
        await teamService.create(payload);
      }

      setModalOpen(false);
      fetchMembers();
    } catch (err) {
      alert(err.message || 'Failed to save member.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    try {
      await teamService.delete(memberToDelete.id);
      setMemberToDelete(null);
      fetchMembers();
    } catch (err) {
      alert(err.message || 'Failed to delete member.');
    }
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Reset team roster to default members?')) return;
    teamService.resetToDefaults();
    fetchMembers();
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
            Manage cybersecurity engineers, offensive researchers, and founders displayed on the public <code className="text-cyan-400 font-mono">/about/team</code> page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700 transition"
            title="Reset to default team members"
          >
            <RefreshCw size={14} />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
          >
            <Plus size={16} />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter team members by name or role..."
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
              className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800 hover:border-cyan-500/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  {/* Photo or Initials Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 shrink-0 overflow-hidden flex items-center justify-center text-cyan-400 font-bold font-mono">
                    {m.profileImage ? (
                      <img src={m.profileImage} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{m.name.charAt(0) || 'U'}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h2 className="font-bold text-white text-sm truncate">{m.name}</h2>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">#{m.displayOrder}</span>
                    </div>
                    <span className="text-xs text-cyan-400 font-mono block truncate">{m.role}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3 line-clamp-2">{m.shortBio}</p>

                {m.skills && m.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {m.skills.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
                        {s}
                      </span>
                    ))}
                    {m.skills.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-mono self-center">+{m.skills.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400">
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400" title="LinkedIn">
                      <Globe size={14} />
                    </a>
                  )}
                  {m.github && (
                    <a href={m.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400" title="GitHub">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="hover:text-cyan-400" title="Email">
                      <Mail size={14} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenModal(m)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition"
                    title="Edit Member"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => setMemberToDelete(m)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
                    title="Remove Member"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users size={18} className="text-cyan-400" />
                <span>{editingMember ? `Edit Team Member: ${editingMember.name}` : 'Add Cybersecurity Team Member'}</span>
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white font-mono">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Photo Input & Preview */}
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-slate-800 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 shrink-0 overflow-hidden flex items-center justify-center text-slate-500">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Portrait preview" className="w-full h-full object-cover" />
                  ) : (
                    <Image size={24} className="text-slate-600" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-slate-300 mb-1 font-semibold">
                    Portrait Photo URL <span className="text-slate-500 font-normal">(displayed on /about/team)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://... image link or /avatars/member.jpg"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-3 py-1.5 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
                  />
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-slate-500">Sample Portrait:</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' })}
                      className="text-[10px] text-cyan-400 hover:underline font-mono"
                    >
                      Sample 1
                    </button>
                    <span className="text-slate-700">•</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' })}
                      className="text-[10px] text-cyan-400 hover:underline font-mono"
                    >
                      Sample 2
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Vikramaditya Rathore"
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
                <label className="block text-slate-300 mb-1 font-semibold">Short Bio * (displayed on card)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortBio}
                  onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500"
                  placeholder="Summary of core specialties and security background..."
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Skills & Certifications (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono text-[11px]"
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
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-cyan-500 text-[11px]"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-cyan-500 text-[11px]"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition"
                >
                  {saving ? 'Saving...' : editingMember ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0b1120] border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Remove Team Member</h3>
                <p className="text-[11px] text-slate-400">{memberToDelete.name}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove <strong className="text-white font-semibold">{memberToDelete.name}</strong> from the team roster?
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
