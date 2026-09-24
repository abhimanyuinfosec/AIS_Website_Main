import api from './api';

export const DEFAULT_PRODUCTS = [
  {
    id: 'prod-autored-apt',
    slug: 'autored-apt',
    name: 'AutoRed APT',
    logoUrl: '/logo.png',
    badge: 'OFFENSIVE SECURITY',
    color: 'blue',
    icon: 'Crosshair',
    shortDesc: 'Orchestrate reconnaissance, vulnerability discovery, and reporting through a unified automated pentesting workflow.',
    detailedDesc: 'AutoRed APT is an automated adversary simulation and penetration testing platform designed to simulate modern threat actors, discover exploitable attack paths, and generate audit-ready compliance reports.',
    problem: 'Manual penetration testing is periodic, expensive, and fails to keep pace with rapid code deployments, leaving perimeter gaps undiscovered between audit cycles.',
    keyFeatures: [
      'Automated reconnaissance & surface discovery',
      'CVE exploit verification & lateral movement checks',
      'Continuous adversary emulation workflows',
      'Automated compliance mapping (SOC2, ISO 27001)',
      'Actionable executive & developer remediation reports',
    ],
    techStack: ['Python', 'Golang', 'Docker', 'Kubernetes', 'FastAPI'],
    version: 'v2.4.0',
    status: 'PRODUCTION',
    metrics: [
      { label: 'Speed', value: '10x Faster' },
      { label: 'False Positives', value: '< 0.1%' },
      { label: 'Coverage', value: 'OWASP & ATT&CK' },
    ],
    githubUrl: 'https://github.com/Abhimanyu-InfoSec',
    demoUrl: '/contact',
    docsUrl: '/contact',
    featured: true,
  },
  {
    id: 'prod-ip-intelligence',
    slug: 'ip-intelligence',
    name: 'IP Intelligence',
    logoUrl: '/logo.png',
    badge: 'THREAT INTEL',
    color: 'blue',
    icon: 'Network',
    shortDesc: 'Decode any IP address — reputation, geolocation, ASN, hosting, and real-time threat indicators in one lookup.',
    detailedDesc: 'Global IP Threat Intelligence engine providing low-latency risk telemetry, BGP route tracing, botnet/C2 correlation, and Tor/proxy/VPN tagging for proactive defense.',
    problem: 'Security analysts face alert fatigue and delayed investigations when validating high-volume incoming connection anomalies across disparate data feeds.',
    keyFeatures: [
      'Abuse confidence scoring & threat history',
      'High-precision geolocation & physical hosting location',
      'BGP routing announcements & ASN ownership data',
      'Proxy, VPN, Tor exit node, and cloud egress tagging',
      'C2 botnet tracking & automated blocklist syncing',
    ],
    techStack: ['Rust', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka'],
    version: 'v3.1.0',
    status: 'PRODUCTION',
    metrics: [
      { label: 'Query Latency', value: '< 45ms' },
      { label: 'Signal Sources', value: '50+ Feeds' },
      { label: 'Daily Lookups', value: '50M+' },
    ],
    githubUrl: 'https://github.com/Abhimanyu-InfoSec',
    demoUrl: '/contact',
    docsUrl: '/contact',
    featured: true,
  },
  {
    id: 'prod-hybrid-ids',
    slug: 'hybrid-ids',
    name: 'Hybrid IDS',
    logoUrl: '/logo.png',
    badge: 'DEEP LEARNING',
    color: 'blue',
    icon: 'Brain',
    shortDesc: 'Detect malicious network behavior with a research-driven hybrid intrusion detection system powered by neural models.',
    detailedDesc: 'Hybrid Intrusion Detection System combining deterministic signature filters with deep unsupervised neural network models to catch zero-day attacks and stealthy lateral movements.',
    problem: 'Traditional signature-only IDS tools generate excessive false positives and fail to detect novel zero-day attack patterns that deviate from known rule sets.',
    keyFeatures: [
      'High-throughput deep packet inspection (DPI)',
      'Unsupervised neural anomaly deviation modeling',
      'Multi-class attack classification mapped to MITRE',
      'Low-latency inline threat containment triggers',
      'Automated triage to eliminate SOC false-alert fatigue',
    ],
    techStack: ['PyTorch', 'C++', 'eBPF', 'Suricata', 'FastAPI'],
    version: 'v1.8.0',
    status: 'BETA',
    metrics: [
      { label: 'Detection Accuracy', value: '99.4%' },
      { label: 'Alert Noise Cut', value: '98%' },
      { label: 'Inspection Speed', value: '10 Gbps+' },
    ],
    githubUrl: 'https://github.com/Abhimanyu-InfoSec',
    demoUrl: '/contact',
    docsUrl: '/contact',
    featured: true,
  },
];

const STORAGE_KEY = 'ais_custom_products';

const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p) => {
        const defaultMatch = DEFAULT_PRODUCTS.find((d) => d.slug === p.slug || d.id === p.id);
        return {
          ...defaultMatch,
          ...p,
          logoUrl: p.logoUrl || defaultMatch?.logoUrl || '/logo.png',
        };
      });
    }
    return DEFAULT_PRODUCTS;
  } catch (err) {
    console.warn('Failed to read products from localStorage:', err);
    return DEFAULT_PRODUCTS;
  }
};

const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('ais_products_updated', { detail: products }));
  } catch (err) {
    console.warn('Failed to save products to localStorage:', err);
  }
};

export const productsService = {
  async getAll() {
    let serverProducts = [];
    try {
      const res = await api.get('/products');
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        serverProducts = res.data;
      }
    } catch (err) {
      // Backend not running or offline, gracefully fallback to local storage
    }

    if (serverProducts.length > 0) {
      // Format server products to include UI fields if missing
      const formatted = serverProducts.map((p) => {
        const defaultMatch = DEFAULT_PRODUCTS.find((d) => d.slug === p.slug || d.id === p.id);
        return {
          ...defaultMatch,
          ...p,
          logoUrl: p.logoUrl || defaultMatch?.logoUrl || '/logo.png',
          badge: p.badge || defaultMatch?.badge || 'ENTERPRISE',
          color: p.color || defaultMatch?.color || 'blue',
          icon: p.icon || defaultMatch?.icon || 'ShieldCheck',
          metrics: p.metrics || defaultMatch?.metrics || [
            { label: 'Status', value: p.status || 'Active' },
            { label: 'Version', value: p.version || 'v1.0' },
            { label: 'Deployment', value: 'Ready' },
          ],
        };
      });
      saveStoredProducts(formatted);
      return formatted;
    }

    return getStoredProducts();
  },

  async getBySlug(slug) {
    if (!slug) return null;
    const normalizedSlug = slug.toLowerCase().trim();

    try {
      const res = await api.get(`/products/${normalizedSlug}`);
      if (res && res.success && res.data) {
        const defaultMatch = DEFAULT_PRODUCTS.find((d) => d.slug === normalizedSlug || d.id === res.data.id);
        return { ...defaultMatch, ...res.data };
      }
    } catch (err) {
      // Fall back to local
    }

    const current = getStoredProducts();
    const found = current.find((p) => p.slug?.toLowerCase() === normalizedSlug || p.id === slug);
    return found || null;
  },

  async create(data) {
    const slug = data.slug
      ? data.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProduct = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      ...data,
      slug,
      metrics: data.metrics || [
        { label: 'Status', value: data.status || 'Active' },
        { label: 'Version', value: data.version || 'v1.0' },
        { label: 'Tier', value: 'Enterprise' },
      ],
      createdAt: new Date().toISOString(),
    };

    // Try backend if running
    try {
      await api.post('/products', newProduct);
    } catch (err) {
      // local fallback handled below
    }

    const current = getStoredProducts();
    const updated = [newProduct, ...current];
    saveStoredProducts(updated);
    return newProduct;
  },

  async update(id, data) {
    // Try backend if running
    try {
      await api.put(`/products/${id}`, data);
    } catch (err) {
      // local fallback handled below
    }

    const current = getStoredProducts();
    const updated = current.map((p) => (p.id === id ? { ...p, ...data } : p));
    saveStoredProducts(updated);
    return updated.find((p) => p.id === id);
  },

  async delete(id) {
    // Try backend if running
    try {
      await api.delete(`/products/${id}`);
    } catch (err) {
      // local fallback handled below
    }

    const current = getStoredProducts();
    const updated = current.filter((p) => p.id !== id && p.slug !== id);
    saveStoredProducts(updated);
    return true;
  },

  resetToDefaults() {
    saveStoredProducts(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  },
};

export default productsService;
