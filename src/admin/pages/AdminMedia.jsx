import React, { useState, useEffect, useRef } from 'react';
import { Image, UploadCloud, Copy, Check, Trash2, Search, File, Folder } from 'lucide-react';
import api from '../../services/api';

export const AdminMedia = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get('/media');
      if (res.success) {
        setMediaList(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'general');

    try {
      const res = await api.upload('/media/upload', formData);
      if (res.success) {
        fetchMedia();
      }
    } catch (err) {
      alert(err.message || 'File upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopy = (url, id) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id, filename) => {
    if (!window.confirm(`Delete media asset "${filename}"?`)) return;
    try {
      await api.delete(`/media/${id}`);
      fetchMedia();
    } catch (err) {
      alert('Failed to delete media asset.');
    }
  };

  const filtered = mediaList.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Image size={20} className="text-cyan-400" />
            <span>Cyber Media & Static Storage Vault</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store diagrams, architecture schematics, security whitepapers (PDFs), and UI brand assets.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,application/pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition disabled:opacity-50"
          >
            <UploadCloud size={16} />
            <span>{uploading ? 'Encrypting & Storing...' : 'Upload New Asset'}</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Filter media by filename..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-xs">Loading media vault...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
          <UploadCloud size={36} className="mx-auto text-slate-600 mb-2" />
          <span>No media files uploaded yet. Click "Upload New Asset" to add images or PDFs.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((m) => {
            const isImage = m.mimeType.startsWith('image/');
            return (
              <div
                key={m.id}
                className="bg-[#0b1120] border border-slate-800 rounded-xl overflow-hidden group hover:border-cyan-500/40 transition flex flex-col justify-between"
              >
                <div className="h-32 bg-[#070b14] flex items-center justify-center p-2 overflow-hidden relative">
                  {isImage ? (
                    <img
                      src={m.url}
                      alt={m.alt || m.filename}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                    />
                  ) : (
                    <File size={36} className="text-slate-600" />
                  )}
                </div>

                <div className="p-3 border-t border-slate-800/80">
                  <p className="text-xs text-white truncate font-mono" title={m.filename}>
                    {m.filename}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {(m.size / 1024).toFixed(1)} KB
                  </span>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => handleCopy(m.url, m.id)}
                      className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-400"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.filename)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
