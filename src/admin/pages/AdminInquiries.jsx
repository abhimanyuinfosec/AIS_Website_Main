import React, { useState, useEffect } from 'react';
import { Mail, Search, CheckCircle2, Clock, Trash2, User, Phone, Building, MessageSquare, Send } from 'lucide-react';
import api from '../../services/api';

const statusTabs = ['ALL', 'NEW', 'READ', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'];

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/inquiries', { status: currentTab === 'ALL' ? undefined : currentTab });
      if (res.success) {
        setInquiries(res.data || []);
        if (selectedInquiry) {
          const updated = res.data.find((i) => i.id === selectedInquiry.id);
          if (updated) setSelectedInquiry(updated);
        }
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [currentTab]);

  const handleSelect = async (inq) => {
    setSelectedInquiry(inq);
    setNotes(inq.notes || '');

    // If NEW, fetch individual to trigger auto-mark as READ on server
    if (inq.status === 'NEW') {
      try {
        const res = await api.get(`/inquiries/${inq.id}`);
        if (res.success) {
          setSelectedInquiry(res.data);
          // update in list
          setInquiries((prev) =>
            prev.map((item) => (item.id === inq.id ? { ...item, status: 'READ' } : item))
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry) return;
    try {
      const res = await api.patch(`/inquiries/${selectedInquiry.id}`, { status: newStatus });
      if (res.success) {
        setSelectedInquiry(res.data);
        setInquiries((prev) =>
          prev.map((i) => (i.id === selectedInquiry.id ? res.data : i))
        );
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const res = await api.patch(`/inquiries/${selectedInquiry.id}`, { notes });
      if (res.success) {
        setSelectedInquiry(res.data);
        alert('Notes updated successfully.');
      }
    } catch (err) {
      alert('Failed to save notes.');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client inquiry?')) return;
    try {
      await api.delete(`/inquiries/${id}`);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      fetchInquiries();
    } catch (err) {
      alert('Failed to delete inquiry.');
    }
  };

  const filtered = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      (i.organization && i.organization.toLowerCase().includes(search.toLowerCase())) ||
      (i.service && i.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Mail size={20} className="text-cyan-400" />
            <span>Prospective Client Inquiries & Leads</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage incoming security consultation requests, scope proposals, and enterprise outreach.
          </p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-mono transition whitespace-nowrap ${
                currentTab === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-[#0b1120] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inquiry List */}
        <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800 rounded-2xl p-3 max-h-[650px] overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-xs">Loading inquiries...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">No inquiries matching filter.</div>
          ) : (
            filtered.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => handleSelect(inq)}
                  className={`p-3.5 rounded-xl cursor-pointer transition border text-xs ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : inq.status === 'NEW'
                      ? 'bg-slate-900/90 border-cyan-500/30'
                      : 'bg-[#070b14] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white truncate">{inq.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        inq.status === 'NEW'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : inq.status === 'CONTACTED'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : inq.status === 'CONVERTED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] truncate">{inq.email}</div>
                  <div className="text-slate-500 text-[10px] truncate mt-1">
                    Interested in: <span className="text-slate-300">{inq.service || 'General'}</span>
                  </div>
                  <div className="text-slate-600 text-[9px] font-mono mt-1">
                    {new Date(inq.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[400px]">
          {selectedInquiry ? (
            <div className="space-y-6 text-xs">
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedInquiry.name}</span>
                  </h2>
                  <p className="text-slate-400 mt-0.5 text-xs">{selectedInquiry.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="bg-[#070b14] border border-cyan-500/40 text-cyan-300 rounded-lg px-2.5 py-1 text-xs font-mono outline-none"
                  >
                    <option value="NEW">NEW</option>
                    <option value="READ">READ</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="SPAM">SPAM</option>
                  </select>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    title="Delete Inquiry"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Inquiry Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#070b14] border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Organization</span>
                  <div className="text-slate-200 font-medium truncate mt-0.5">
                    {selectedInquiry.organization || 'Independent'}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Contact Phone</span>
                  <div className="text-slate-200 font-medium truncate mt-0.5">
                    {selectedInquiry.phone || 'Not provided'}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Service Scope</span>
                  <div className="text-cyan-400 font-medium truncate mt-0.5">
                    {selectedInquiry.service || 'General Consulting'}
                  </div>
                </div>
              </div>

              {/* Client Message */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider text-[10px] font-mono">
                  Message / Security Requirement:
                </label>
                <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider text-[10px] font-mono">
                  Internal Triage Notes & Follow-up Plan:
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#070b14] border border-slate-700 focus:border-cyan-500 rounded-xl p-3 text-white outline-none"
                  placeholder="Record NDA status, proposal draft date, or team assignment..."
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold"
                  >
                    {savingNotes ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs">
              <MessageSquare size={36} className="text-slate-700 mb-2" />
              <span>Select an inquiry from the list to view scope details and respond.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
