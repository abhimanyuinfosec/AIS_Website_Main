import api from './api';

export const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Global Banking SWIFT Gateway Red Team & Hardening',
    slug: 'banking-swift-gateway-red-team',
    category: 'Adversary Simulation & Hardening',
    shortDesc: 'Nation-state threat simulation and wire-tampering defense for an international Tier-1 financial institution.',
    detailedDesc: 'Abhimanyu InfoSec conducted an exhaustive full-scope adversary emulation replicating advanced persistent threats (APTs). Our team validated transaction isolation boundaries, reverse-engineered HSM communications, and engineered zero-trust kernel defense policies.',
    problem: 'High-value financial transactions network requiring stress testing against nation-state APT kill chains, out-of-band wire tampering, and compromised insider accounts.',
    solution: 'End-to-end black-box adversary simulation compromising network perimeters and proving lateral movement into the staging payment core, followed by zero-trust enclave hardening and automated SIEM detection rules.',
    techStack: ['Cobalt Strike', 'Custom C2 Rust', 'Wireshark', 'Suricata', 'Linux Hardening', 'Snort'],
    keyFeatures: [
      'Multi-phase simulated APT adversary attack',
      'Air-gapped transaction enclave verification',
      'Defensive SIEM/SOC rule generation & live debrief',
      'Executive board-level cyber threat landscape briefing',
    ],
    githubUrl: '',
    liveUrl: 'https://abhimanyuinfosec.com/services/adversary-simulation',
    featured: true,
    status: 'PUBLISHED',
    createdAt: new Date('2025-11-10').toISOString(),
  },
  {
    id: 'proj-2',
    name: 'Enterprise Cloud DevSecOps & Container Security Gate',
    slug: 'cloud-devsecops-container-security',
    category: 'Cloud Security & DevSecOps',
    shortDesc: 'Automated CI/CD supply chain security gate and runtime eBPF threat detection for 500+ microservices.',
    detailedDesc: 'Designed and deployed an automated, zero-friction DevSecOps security pipeline for a multi-cloud healthtech platform. Enforced cryptographic artifact signing, OPA Gatekeeper cluster policies, and live container escape prevention.',
    problem: 'Rapid deployment cycles resulting in unvetted container base images, inadvertent API credential leakage in Git repos, and lack of runtime cluster visibility.',
    solution: 'Integrated automated image vulnerability gating via Trivy, secret sanitization pre-commit hooks, Cosign digital signing, and runtime Falco behavioral telemetry.',
    techStack: ['Kubernetes', 'Trivy', 'OPA Gatekeeper', 'Falco', 'Cosign', 'HashiCorp Vault'],
    keyFeatures: [
      'Zero-friction automated CI/CD pipeline vulnerability gating',
      'Automated cluster CIS benchmark compliance reporting',
      'Runtime privilege escalation prevention via eBPF probes',
      'Ephemeral credential injection with zero secrets in code',
    ],
    githubUrl: 'https://github.com/abhimanyu-infosec/cloud-security-gate',
    liveUrl: '',
    featured: true,
    status: 'PUBLISHED',
    createdAt: new Date('2025-12-20').toISOString(),
  },
  {
    id: 'proj-3',
    name: 'National Critical Infrastructure SCADA / ICS Security Audit',
    slug: 'scada-ics-critical-infrastructure-audit',
    category: 'Industrial Security (OT/ICS)',
    shortDesc: 'Comprehensive vulnerability audit and protocol fortification for electrical grid SCADA telecontrol networks.',
    detailedDesc: 'Conducted rigorous, non-destructive penetration testing and communication fuzzing across Modbus, DNP3, and IEC 60870-5-104 control loops, pinpointing unauthorized command injection vectors and engineering hardened DMZ topologies.',
    problem: 'Power transmission utility SCADA protocols exposed to potential remote command injection, legacy PLC firmware exploits, and unsegmented substation communications.',
    solution: 'Performed passive network packet deep inspection, custom protocol fuzzing, and physical gateway air-gap fortification without disrupting 24/7 power transmission.',
    techStack: ['Modbus/DNP3', 'IEC 60870-5', 'Suricata OT', 'Python Scapy', 'Wireshark', 'Industrial Firewalls'],
    keyFeatures: [
      'Non-intrusive ICS/SCADA protocol traffic inspection',
      'Legacy PLC firmware vulnerability analysis and mitigation',
      'Air-gap DMZ boundary segmentation & unidirectional data diodes',
      'OT-specific cyber incident response playbook',
    ],
    githubUrl: '',
    liveUrl: 'https://abhimanyuinfosec.com/services/ics-security',
    featured: true,
    status: 'PUBLISHED',
    createdAt: new Date('2026-01-25').toISOString(),
  },
];

const STORAGE_KEY = 'ais_custom_projects';

const getStoredProjects = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PROJECTS;
  } catch (err) {
    return DEFAULT_PROJECTS;
  }
};

const saveStoredProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('ais_projects_updated', { detail: projects }));
  } catch (err) {
    console.warn('Failed to save projects to localStorage:', err);
  }
};

export const projectsService = {
  async getAll(includeAll = false) {
    let serverProjects = [];
    try {
      const res = await api.get('/projects', { all: includeAll ? 'true' : undefined });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        serverProjects = res.data;
      }
    } catch (err) {
      // Backend offline fallback handled below
    }

    if (serverProjects.length > 0) {
      saveStoredProjects(serverProjects);
      return includeAll ? serverProjects : serverProjects.filter((p) => p.status === 'PUBLISHED');
    }

    const local = getStoredProjects();
    return includeAll ? local : local.filter((p) => p.status === 'PUBLISHED');
  },

  async create(projectData) {
    const slug = (projectData.slug || projectData.name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProject = {
      id: `proj-${Date.now()}`,
      name: projectData.name || 'Untitled Security Project',
      slug: slug || `project-${Date.now()}`,
      category: projectData.category || 'Application Security',
      shortDesc: projectData.shortDesc || '',
      detailedDesc: projectData.detailedDesc || '',
      problem: projectData.problem || '',
      solution: projectData.solution || '',
      techStack: Array.isArray(projectData.techStack)
        ? projectData.techStack
        : typeof projectData.techStack === 'string'
        ? projectData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      keyFeatures: Array.isArray(projectData.keyFeatures)
        ? projectData.keyFeatures
        : typeof projectData.keyFeatures === 'string'
        ? projectData.keyFeatures.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      githubUrl: projectData.githubUrl || '',
      liveUrl: projectData.liveUrl || '',
      featured: !!projectData.featured,
      status: projectData.status || 'PUBLISHED',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post('/projects', newProject);
      if (res && res.success && res.data) {
        newProject.id = res.data.id || newProject.id;
      }
    } catch (err) {
      console.warn('Backend API unavailable, saving project locally:', err.message);
    }

    const current = getStoredProjects();
    const updated = [newProject, ...current];
    saveStoredProjects(updated);
    return newProject;
  },

  async update(id, updates) {
    try {
      await api.put(`/projects/${id}`, updates);
    } catch (err) {
      console.warn('Backend API unavailable, updating project locally:', err.message);
    }

    const current = getStoredProjects();
    const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveStoredProjects(updated);
    return updated.find((p) => p.id === id);
  },

  async delete(id) {
    try {
      await api.delete(`/projects/${id}`);
    } catch (err) {
      console.warn('Backend API unavailable, deleting project locally:', err.message);
    }

    const current = getStoredProjects();
    const updated = current.filter((p) => p.id !== id);
    saveStoredProjects(updated);
    return true;
  },

  subscribe(callback) {
    const handler = (e) => {
      if (e.detail) callback(e.detail);
    };
    window.addEventListener('ais_projects_updated', handler);
    return () => window.removeEventListener('ais_projects_updated', handler);
  },
};

export default projectsService;
