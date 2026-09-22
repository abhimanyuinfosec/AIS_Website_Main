import api from './api';

export const DEFAULT_MEDIA = [
  {
    id: 'med-1',
    filename: 'autored-adversary-simulation-architecture.png',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/png',
    size: 245000,
    folder: 'products',
    category: 'products',
    alt: 'AutoRed Autonomous Red Teaming Architecture Diagram',
    createdAt: new Date('2025-11-01').toISOString(),
  },
  {
    id: 'med-2',
    filename: 'cloudsentinel-multi-cloud-dashboard.png',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/png',
    size: 312000,
    folder: 'products',
    category: 'products',
    alt: 'CloudSentinel Kubernetes & IAM Telemetry Console',
    createdAt: new Date('2025-11-15').toISOString(),
  },
  {
    id: 'med-3',
    filename: 'swift-gateway-zero-trust-enclave.png',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/png',
    size: 189000,
    folder: 'projects',
    category: 'projects',
    alt: 'Banking SWIFT Gateway Zero-Trust Perimeter Topology',
    createdAt: new Date('2025-12-05').toISOString(),
  },
  {
    id: 'med-4',
    filename: 'scada-modbus-intrusion-detection-report.pdf',
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    mimeType: 'application/pdf',
    size: 524000,
    folder: 'projects',
    category: 'projects',
    alt: 'National Grid SCADA Penetration & Protocol Hardening Audit Report',
    createdAt: new Date('2026-01-10').toISOString(),
  },
  {
    id: 'med-5',
    filename: 'devsecops-pipeline-container-security-gate.png',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/png',
    size: 278000,
    folder: 'projects',
    category: 'projects',
    alt: 'Automated CI/CD Container Security Scanning Gate Schematics',
    createdAt: new Date('2026-01-28').toISOString(),
  },
  {
    id: 'med-6',
    filename: 'cyberguard-msme-agent-mesh.png',
    url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    mimeType: 'image/png',
    size: 195000,
    folder: 'products',
    category: 'products',
    alt: 'CyberGuard SME Lightweight Endpoint Detection Mesh',
    createdAt: new Date('2026-02-12').toISOString(),
  },
];

const STORAGE_KEY = 'ais_custom_media';

const getStoredMedia = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MEDIA));
      return DEFAULT_MEDIA;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MEDIA;
  } catch (err) {
    return DEFAULT_MEDIA;
  }
};

const saveStoredMedia = (media) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(media));
    window.dispatchEvent(new CustomEvent('ais_media_updated', { detail: media }));
  } catch (err) {
    console.warn('Failed to save media to localStorage:', err);
  }
};

export const mediaService = {
  async getAll(folder = 'all') {
    let serverMedia = [];
    try {
      const res = await api.get('/media', { folder: folder !== 'all' ? folder : undefined });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        serverMedia = res.data;
      }
    } catch (err) {
      // Backend offline fallback handled below
    }

    if (serverMedia.length > 0) {
      // Merge with custom local additions if any
      const local = getStoredMedia();
      const serverIds = new Set(serverMedia.map((m) => m.id));
      const customLocals = local.filter((m) => !serverIds.has(m.id) && String(m.id).startsWith('med-custom-'));
      const combined = [...serverMedia, ...customLocals];
      saveStoredMedia(combined);

      if (folder === 'all') return combined;
      return combined.filter((m) => m.folder === folder || m.category === folder);
    }

    const local = getStoredMedia();
    if (folder === 'all') return local;
    return local.filter((m) => m.folder === folder || m.category === folder);
  },

  async uploadFile(file, category = 'projects', alt = '') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', category);
    formData.append('alt', alt || file.name);

    let created = null;
    try {
      const res = await api.upload('/media/upload', formData);
      if (res && res.success && res.data) {
        created = {
          ...res.data,
          folder: category,
          category,
        };
      }
    } catch (err) {
      console.warn('Server upload failed, storing in client vault:', err.message);
    }

    if (!created) {
      // Create local object URL for preview and storage
      const objectUrl = URL.createObjectURL(file);
      created = {
        id: `med-custom-${Date.now()}`,
        filename: file.name,
        url: objectUrl,
        mimeType: file.type || 'image/png',
        size: file.size,
        folder: category,
        category,
        alt: alt || file.name,
        createdAt: new Date().toISOString(),
      };
    }

    const current = getStoredMedia();
    const updated = [created, ...current];
    saveStoredMedia(updated);
    return created;
  },

  async delete(id) {
    try {
      await api.delete(`/media/${id}`);
    } catch (err) {
      console.warn('Backend API unavailable, deleting media locally:', err.message);
    }

    const current = getStoredMedia();
    const updated = current.filter((m) => m.id !== id);
    saveStoredMedia(updated);
    return true;
  },

  subscribe(callback) {
    const handler = (e) => {
      if (e.detail) callback(e.detail);
    };
    window.addEventListener('ais_media_updated', handler);
    return () => window.removeEventListener('ais_media_updated', handler);
  },
};

export default mediaService;
