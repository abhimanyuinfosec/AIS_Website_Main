import api from './api';

export const DEFAULT_RESEARCH = [
  {
    id: 'res-1',
    title: 'Deep Packet Anomaly Detection in High-Throughput Enterprise Gateways using eBPF & Quantized Transformers',
    slug: 'ebpf-deep-packet-anomaly-detection',
    authors: ['Abhimanyu Research Labs', 'K. S. Verma', 'Aditya Sharma'],
    category: 'Intrusion Detection Systems',
    abstract: 'This paper presents a novel approach to inline kernel-level packet inspection utilizing extended Berkeley Packet Filters (eBPF) combined with quantized multi-head attention transformers. Benchmarked across 100 Gbps simulated enterprise pipelines, the architecture achieves a 99.4% detection rate for zero-day obfuscated payloads while maintaining sub-1.2 microsecond processing latency.',
    description: 'Detailed analysis of kernel bypass techniques, programmable network interface cards (SmartNICs), and ultra-low latency machine learning inference in defensive cyber operations.',
    journal: 'IEEE Transactions on Dependable and Secure Computing (TDSC)',
    doi: '10.1109/TDSC.2025.1092841',
    paperUrl: 'https://arxiv.org',
    datasetUrl: 'https://huggingface.co',
    githubUrl: 'https://github.com/abhimanyu-infosec/ebpf-threat-detector',
    citation: 'Verma, K. S., et al. (2025). Deep Packet Anomaly Detection using eBPF. IEEE TDSC, 22(4), 1845-1859.',
    status: 'PUBLISHED',
    createdAt: new Date('2025-10-12').toISOString(),
  },
  {
    id: 'res-2',
    title: 'Autonomous Graph-Based Adversary Simulation in Hybrid Multi-Cloud Infrastructures',
    slug: 'autonomous-graph-adversary-simulation',
    authors: ['Offensive Security Division', 'Elena Rostova', 'Marcus Chen'],
    category: 'Threat Intelligence',
    abstract: 'Enterprise multi-cloud networks exhibit non-deterministic trust boundaries between AWS, Azure, and on-premises directory structures. We demonstrate an autonomous lateral movement graph algorithm that computes shortest privilege-escalation vectors in polynomial time, validating zero-trust security postures without service disruption.',
    description: 'Empirical evaluation of 1,200 simulated hybrid environments highlighting credential hygiene deficiencies and cross-cloud IAM role chaining vulnerabilities.',
    journal: 'Journal of Information Security and Applications (Elsevier)',
    doi: '10.1016/j.jisa.2025.103789',
    paperUrl: 'https://arxiv.org',
    datasetUrl: '',
    githubUrl: 'https://github.com/abhimanyu-infosec/autored-core',
    citation: 'Rostova, E., & Chen, M. (2025). Autonomous Graph-Based Adversary Simulation. J. Inf. Secur. Appl., 81, 103789.',
    status: 'PUBLISHED',
    createdAt: new Date('2025-12-05').toISOString(),
  },
  {
    id: 'res-3',
    title: 'Empirical Security Analysis of Enterprise GraphQL and Microservice Service Meshes',
    slug: 'empirical-security-graphql-microservice-meshes',
    authors: ['Application Security Group', 'Vikramaditya Roy'],
    category: 'Web & Application Security',
    abstract: 'A systematic audit of 450+ enterprise GraphQL and REST API meshes, identifying pervasive authorization token confusion, deep query nested circular denial-of-service, and batch introspection vulnerabilities across production financial and healthcare platforms.',
    description: 'Guidelines and open-source defensive plugins for Envoy proxy and Apollo Router to eliminate AST traversal abuse and broken object level authorization (BOLA).',
    journal: 'ACM Conference on Computer and Communications Security (CCS)',
    doi: '10.1145/3576915.3623101',
    paperUrl: 'https://dl.acm.org',
    datasetUrl: '',
    githubUrl: 'https://github.com/abhimanyu-infosec/graphql-armor-mesh',
    citation: 'Roy, V. (2026). Empirical Security Analysis of Enterprise GraphQL Meshes. ACM CCS 2026, 412-426.',
    status: 'PUBLISHED',
    createdAt: new Date('2026-02-18').toISOString(),
  },
];

const STORAGE_KEY = 'ais_custom_research';

const getStoredResearch = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RESEARCH));
      return DEFAULT_RESEARCH;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RESEARCH;
  } catch (err) {
    return DEFAULT_RESEARCH;
  }
};

const saveStoredResearch = (papers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
    window.dispatchEvent(new CustomEvent('ais_research_updated', { detail: papers }));
  } catch (err) {
    console.warn('Failed to save research to localStorage:', err);
  }
};

export const researchService = {
  async getAll(includeAll = false) {
    let serverPapers = [];
    try {
      const res = await api.get('/research', { all: includeAll ? 'true' : undefined });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        serverPapers = res.data;
      }
    } catch (err) {
      // Backend offline fallback handled below
    }

    if (serverPapers.length > 0) {
      saveStoredResearch(serverPapers);
      return includeAll ? serverPapers : serverPapers.filter((p) => p.status === 'PUBLISHED');
    }

    const local = getStoredResearch();
    return includeAll ? local : local.filter((p) => p.status === 'PUBLISHED');
  },

  async create(paperData) {
    const slug = (paperData.slug || paperData.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newPaper = {
      id: `res-${Date.now()}`,
      title: paperData.title || 'Untitled Research',
      slug: slug || `paper-${Date.now()}`,
      authors: Array.isArray(paperData.authors)
        ? paperData.authors
        : typeof paperData.authors === 'string'
        ? paperData.authors.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Abhimanyu Research Team'],
      category: paperData.category || 'Intrusion Detection Systems',
      abstract: paperData.abstract || '',
      description: paperData.description || '',
      journal: paperData.journal || '',
      doi: paperData.doi || '',
      paperUrl: paperData.paperUrl || '',
      datasetUrl: paperData.datasetUrl || '',
      githubUrl: paperData.githubUrl || '',
      citation: paperData.citation || '',
      status: paperData.status || 'PUBLISHED',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post('/research', newPaper);
      if (res && res.success && res.data) {
        newPaper.id = res.data.id || newPaper.id;
      }
    } catch (err) {
      console.warn('Backend API unavailable, saving research locally:', err.message);
    }

    const current = getStoredResearch();
    const updated = [newPaper, ...current];
    saveStoredResearch(updated);
    return newPaper;
  },

  async update(id, updates) {
    try {
      await api.put(`/research/${id}`, updates);
    } catch (err) {
      console.warn('Backend API unavailable, updating research locally:', err.message);
    }

    const current = getStoredResearch();
    const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveStoredResearch(updated);
    return updated.find((p) => p.id === id);
  },

  async delete(id) {
    try {
      await api.delete(`/research/${id}`);
    } catch (err) {
      console.warn('Backend API unavailable, deleting research locally:', err.message);
    }

    const current = getStoredResearch();
    const updated = current.filter((p) => p.id !== id);
    saveStoredResearch(updated);
    return true;
  },

  subscribe(callback) {
    const handler = (e) => {
      if (e.detail) callback(e.detail);
    };
    window.addEventListener('ais_research_updated', handler);
    return () => window.removeEventListener('ais_research_updated', handler);
  },
};

export default researchService;
