import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  Search,
  File,
  Layers,
  Briefcase,
  Cpu,
  X,
  Plus,
} from 'lucide-react';
import mediaService from '../../services/mediaService';

export const AdminMedia = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'projects' | 'products'
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    file: null,
    category: 'projects',
    alt: '',
  });

  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getAll(selectedCategory);
      setMediaList(data || []);
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    const unsubscribe = mediaService.subscribe((updated) => {
      if (selectedCategory === 'all') {
        setMediaList(updated);
      } else {
        setMediaList(updated.filter((m) => m.folder === selectedCategory || m.category === selectedCategory));
      }
    });
    return () => unsubscribe();
  }, [selectedCategory]);

  const handleOpenUploadModal = () => {
    setUploadData({
      file: null,
      category: selectedCategory === 'products' ? 'products' : 'projects',
      alt: '',
    });
    setUploadModalOpen(true);
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData((prev) => ({
        ...prev,
        file,
        alt: prev.alt || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      }));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadData.file) {
      alert('Please select an image or PDF file to upload.');
      return;
    }

    setUploading(true);
    try {
      await mediaService.uploadFile(uploadData.file, uploadData.category, uploadData.alt);
      setUploadModalOpen(false);
      fetchMedia();
    } catch (err) {
      alert(err.message || 'File upload failed.');
    } finally {
      setUploading(false);
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
      await mediaService.delete(id);
      fetchMedia();
    } catch (err) {
      alert('Failed to delete media asset.');
    }
  };

  const filtered = mediaList.filter((m) => {
    const matchesSearch =
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      (m.alt && m.alt.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory =
      selectedCategory === 'all' || m.folder === selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const projectsCount = mediaList.filter(
    (m) => m.folder === 'projects' || m.category === 'projects'
  ).length;
  const productsCount = mediaList.filter(
    (m) => m.folder === 'products' || m.category === 'products'
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono mb-2 uppercase tracking-wider">
            Exclusively Scoped Asset Vault
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Image size={20} className="text-cyan-400" />
            <span>Company Projects & Products Media Vault</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Storage restricted exclusively to company engineering projects, architecture diagrams, and cybersecurity product media.
          </p>
        </div>

        <button
          onClick={handleOpenUploadModal}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
        >
          <UploadCloud size={16} />
          <span>Upload Project / Product Asset</span>
        </button>
      </div>

      {/* Scope Filtering Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#080d1a] border border-slate-800/80 p-3 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
            }`}
          >
            <Layers size={14} />
            <span>All Company Media</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded-full font-mono">
              {mediaList.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('projects')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === 'projects'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
            }`}
          >
            <Briefcase size={14} className="text-blue-400" />
            <span>Company Projects Media</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded-full font-mono">
              {projectsCount}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('products')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === 'products'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
            }`}
          >
            <Cpu size={14} className="text-purple-400" />
            <span>Company Products Media</span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded-full font-mono">
              {productsCount}
            </span>
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            type="text"
            placeholder="Search projects & products media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b1120] border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-1.5 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* Grid of Media Assets */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-xs">Loading company media vault...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl bg-[#080d1a]/50">
          <UploadCloud size={36} className="mx-auto text-slate-600 mb-2" />
          <p className="text-slate-300 font-medium">No media assets in this scope.</p>
          <span className="text-slate-500 text-[11px] mt-1 block">
            Click "Upload Project / Product Asset" to attach diagrams, UI screenshots, or technical PDFs.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((m) => {
            const isImage = (m.mimeType || '').startsWith('image/');
            const isProject = m.folder === 'projects' || m.category === 'projects';

            return (
              <div
                key={m.id}
                className="bg-[#0b1120] border border-slate-800/90 rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition flex flex-col justify-between shadow-lg"
              >
                <div className="h-36 bg-[#070b14] flex items-center justify-center p-2 overflow-hidden relative">
                  {isImage ? (
                    <img
                      src={m.url}
                      alt={m.alt || m.filename}
                      className="max-h-full max-w-full object-cover rounded-lg group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-slate-500">
                      <File size={36} className="text-cyan-400/80" />
                      <span className="text-[10px] font-mono uppercase text-slate-400">PDF Document</span>
                    </div>
                  )}

                  {/* Category Pill on top-right */}
                  <div className="absolute top-2.5 right-2.5">
                    {isProject ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-md">
                        <Briefcase size={9} />
                        PROJECT
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                        <Cpu size={9} />
                        PRODUCT
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 border-t border-slate-800/80 space-y-2">
                  <div>
                    <p className="text-xs text-white font-medium truncate font-mono" title={m.filename}>
                      {m.filename}
                    </p>
                    {m.alt && m.alt !== m.filename && (
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{m.alt}</p>
                    )}
                    <span className="text-[10px] text-slate-500 font-mono block mt-1">
                      {m.size ? (m.size / 1024).toFixed(1) + ' KB' : 'Media Asset'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/60">
                    <button
                      onClick={() => handleCopy(m.url, m.id)}
                      className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-cyan-400 transition"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(m.id, m.filename)}
                      className="p-1 text-slate-500 hover:text-red-400 transition"
                      title="Delete asset"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal with strict Project / Product scope */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0b1120] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UploadCloud size={18} className="text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Upload Company Media Asset
                </h2>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {/* Scope Selector */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Asset Association Scope *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                      uploadData.category === 'projects'
                        ? 'bg-blue-500/15 border-blue-500/50 text-white'
                        : 'bg-[#070b14] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="assetCategory"
                      value="projects"
                      checked={uploadData.category === 'projects'}
                      onChange={() => setUploadData({ ...uploadData, category: 'projects' })}
                      className="accent-blue-500"
                    />
                    <div>
                      <span className="font-bold block text-blue-300">Company Project Media</span>
                      <span className="text-[10px] text-slate-400">
                        Schematics, audits, network topologies
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                      uploadData.category === 'products'
                        ? 'bg-purple-500/15 border-purple-500/50 text-white'
                        : 'bg-[#070b14] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="assetCategory"
                      value="products"
                      checked={uploadData.category === 'products'}
                      onChange={() => setUploadData({ ...uploadData, category: 'products' })}
                      className="accent-purple-500"
                    />
                    <div>
                      <span className="font-bold block text-purple-300">Company Product Media</span>
                      <span className="text-[10px] text-slate-400">
                        Product UI, features, logo assets
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* File Selector */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Choose File (PNG, JPG, SVG, WebP, PDF) *
                </label>
                <input
                  type="file"
                  required
                  ref={fileInputRef}
                  onChange={handleFileSelected}
                  accept="image/*,application/pdf"
                  className="w-full bg-[#070b14] border border-slate-700 rounded-xl px-3 py-2 text-slate-300 text-xs file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                />
              </div>

              {/* Alt / Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Asset Title / Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Banking SWIFT Gateway Defense Schematic"
                  value={uploadData.alt}
                  onChange={(e) => setUploadData({ ...uploadData, alt: e.target.value })}
                  className="w-full bg-[#070b14] border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold disabled:opacity-50 transition"
                >
                  {uploading ? 'Storing Asset...' : 'Save & Store Media'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
