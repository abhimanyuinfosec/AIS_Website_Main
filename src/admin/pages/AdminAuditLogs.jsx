import React, { useState, useEffect } from 'react';
import { History, Search, ShieldAlert, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import api from '../../services/api';

export const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/audit-logs', { limit: 100 });
      if (res.success) {
        setLogs(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.user?.name && l.user.name.toLowerCase().includes(search.toLowerCase())) ||
      (l.ipAddress && l.ipAddress.includes(search))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <History size={20} className="text-cyan-400" />
            <span>Immutable Security Audit Log</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-evident chronological audit trail for user authentications, content updates, and access attempts.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-cyan-400' : ''} />
          <span>Refresh Audit Stream</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter logs by action code, user, or IP address..."
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
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action Code</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px] text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500 font-sans">
                    Reading audit trail...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500 font-sans">
                    No matching audit records.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-cyan-400">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 text-white font-sans">
                      {log.user ? `${log.user.name} (${log.user.role})` : 'Unauthenticated'}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {log.resourceType ? `${log.resourceType} ${log.resourceId ? `#${log.resourceId.slice(0, 8)}...` : ''}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {log.ipAddress || 'unknown'}
                    </td>
                    <td className="py-3 px-4">
                      {log.result === 'SUCCESS' ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle2 size={13} />
                          <span>SUCCESS</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 font-bold">
                          <XCircle size={13} />
                          <span>FAILURE</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLogs;
