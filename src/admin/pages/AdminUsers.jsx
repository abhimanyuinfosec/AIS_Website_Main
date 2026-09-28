import React, { useState, useEffect } from 'react';
import {
  Users, Plus, Edit2, Trash2, Search, RefreshCw,
  Shield, UserCheck, UserX, Key, AlertTriangle, X, Check,
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ROLE_COLORS = {
  SUPER_ADMIN: 'bg-red-500/15 text-red-400 border-red-500/30',
  ADMIN: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  EDITOR: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  AUTHOR: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  USER: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
};

const ROLES = ['USER', 'AUTHOR', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'];

const EMPTY_FORM = {
  name: '', email: '', password: '', role: 'EDITOR', isActive: true,
};

export const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      if (res.success) setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openModal = (user = null) => {
    setError('');
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, password: '', role: user.role, isActive: user.isActive });
    } else {
      setEditingUser(null);
      setFormData(EMPTY_FORM);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
    setFormData(EMPTY_FORM);
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password; // Don't send empty password on update

      if (editingUser) {
        const res = await api.put(`/users/${editingUser.id}`, payload);
        if (res.success) {
          setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? res.data : u)));
          closeModal();
        }
      } else {
        if (!payload.password) { setError('Password is required for new users.'); setSaving(false); return; }
        const res = await api.post('/users', payload);
        if (res.success) {
          setUsers((prev) => [res.data, ...prev]);
          closeModal();
        }
      }
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (user) => {
    try {
      const res = await api.put(`/users/${user.id}`, { isActive: !user.isActive });
      if (res.success) setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)));
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/users/${confirmDelete.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== confirmDelete.id));
      setConfirmDelete(null);
    } catch (err) { alert(err.message); }
  };

  const filtered = users.filter((u) =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users size={20} className="text-cyan-400" />
            User Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage operator accounts, roles, and access permissions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchUsers}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition">
            <RefreshCw size={13} className={loading ? 'animate-spin text-cyan-400' : ''} />
            Refresh
          </button>
          <button onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg transition shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Plus size={14} /> New User
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
        <input type="text" placeholder="Search by name, email, or role..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-4 py-2 text-xs text-white outline-none" />
      </div>

      {/* Table */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070b14] border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Posts</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr><td colSpan="6" className="py-12 text-center text-slate-500">Loading users...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="py-12 text-center text-slate-500">No users found.</td></tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className={`hover:bg-slate-800/30 transition ${!u.isActive ? 'opacity-50' : ''}`}>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-white font-semibold flex items-center gap-1.5">
                          {u.name}
                          {u.id === currentUser?.id && (
                            <span className="text-[9px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono">YOU</span>
                          )}
                        </div>
                        <div className="text-slate-500 text-[11px] font-mono">{u.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${ROLE_COLORS[u.role] || ROLE_COLORS.USER}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{u._count?.blogPosts ?? '—'}</td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-1 text-[10px] font-bold ${u.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {u.isActive ? <><UserCheck size={11} /> Active</> : <><UserX size={11} /> Inactive</>}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openModal(u)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition" title="Edit">
                          <Edit2 size={13} />
                        </button>
                        {u.id !== currentUser?.id && (
                          <button onClick={() => handleToggleActive(u)}
                            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition"
                            title={u.isActive ? 'Deactivate' : 'Activate'}>
                            {u.isActive ? <UserX size={13} /> : <UserCheck size={13} />}
                          </button>
                        )}
                        {isSuperAdmin && u.id !== currentUser?.id && (
                          <button onClick={() => setConfirmDelete(u)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition" title="Delete">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0b1120] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                {editingUser ? <><Key size={14} className="text-amber-400" /> Edit User</> : <><Plus size={14} className="text-cyan-400" /> Create User</>}
              </h2>
              <button onClick={closeModal} className="text-slate-500 hover:text-white transition"><X size={16} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
                  <AlertTriangle size={13} /> {error}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2 text-white outline-none" />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input type="email" required value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2 text-white outline-none" />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {editingUser ? 'New Password (leave blank to keep current)' : 'Password *'}
                </label>
                <input type="password" value={formData.password}
                  onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                  className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2 text-white outline-none"
                  placeholder={editingUser ? '••••••••' : 'Min. 8 characters'} />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role *</label>
                <select value={formData.role}
                  onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                  className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2 text-white outline-none">
                  {ROLES.filter((r) => isSuperAdmin || r !== 'SUPER_ADMIN').map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={formData.isActive}
                  onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))}
                  className="rounded border-slate-700 bg-[#070b14]" />
                <label htmlFor="isActive" className="text-slate-300">Account Active</label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={closeModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition text-xs disabled:opacity-50">
                  {saving ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0b1120] border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
            <AlertTriangle size={32} className="mx-auto text-red-400" />
            <h2 className="text-white font-bold">Delete User Account?</h2>
            <p className="text-slate-400 text-sm">
              Permanently delete <span className="text-white font-semibold">{confirmDelete.name}</span> ({confirmDelete.email})?
              This cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
