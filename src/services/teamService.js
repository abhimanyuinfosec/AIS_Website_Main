import api from './api';

export const DEFAULT_TEAM = [
  {
    id: 'team-1',
    name: 'Founder & Cybersecurity Lead',
    role: 'Founder / Cybersecurity Lead',
    profileImage: '',
    shortBio: 'Responsible for cybersecurity strategy, security research, product direction and technical development.',
    detailedBio: 'Over a decade of adversary simulation, red teaming, and autonomous security defense engineering.',
    skills: ['Cybersecurity Strategy', 'Adversary Simulation', 'Threat Intel', 'Architecture'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'contact@abhimanyuinfosec.com',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'team-2',
    name: 'Offensive Security Researcher',
    role: 'Security Engineer / Pen Tester',
    profileImage: '',
    shortBio: 'Specializes in web application penetration testing, vulnerability discovery, and exploit validation.',
    detailedBio: 'Deep expertise in OWASP Top 10, binary exploitation, and cloud workload compromise analysis.',
    skills: ['AppSec', 'Penetration Testing', 'CVE Discovery', 'Exploit Analysis'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'research@abhimanyuinfosec.com',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'team-3',
    name: 'Infrastructure & Systems Lead',
    role: 'Cloud & Network Security Engineer',
    profileImage: '',
    shortBio: 'Focuses on network hardening, architecture review, and automated perimeter threat detection.',
    detailedBio: 'Hardening multi-cloud infrastructure, Kubernetes clusters, and zero-trust software-defined networks.',
    skills: ['Cloud Security', 'Network Hardening', 'Zero Trust', 'Kubernetes'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'infra@abhimanyuinfosec.com',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'team-4',
    name: 'AI & Security Systems Developer',
    role: 'Security Software Engineer',
    profileImage: '',
    shortBio: 'Builds intelligent intrusion detection pipelines, threat data telemetry, and automation tools.',
    detailedBio: 'Designing deep learning anomaly filters and high-throughput eBPF packet inspection engines.',
    skills: ['Machine Learning', 'eBPF', 'Rust', 'Threat Telemetry', 'Python'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'ai-sec@abhimanyuinfosec.com',
    displayOrder: 4,
    isActive: true,
  },
];

const STORAGE_KEY = 'ais_custom_team';

const getStoredTeam = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TEAM));
      return DEFAULT_TEAM;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_TEAM;
  } catch (err) {
    return DEFAULT_TEAM;
  }
};

const saveStoredTeam = (team) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
    window.dispatchEvent(new CustomEvent('ais_team_updated', { detail: team }));
  } catch (err) {
    console.warn('Failed to save team to localStorage:', err);
  }
};

export const teamService = {
  async getAll(includeInactive = false) {
    let serverTeam = [];
    try {
      const res = await api.get('/team', { all: includeInactive ? 'true' : undefined });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        serverTeam = res.data;
      }
    } catch (err) {
      // Backend offline fallback handled below
    }

    if (serverTeam.length > 0) {
      saveStoredTeam(serverTeam);
      return serverTeam;
    }

    const local = getStoredTeam();
    return includeInactive ? local : local.filter((m) => m.isActive !== false);
  },

  async create(data) {
    const newMember = {
      id: `team-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      ...data,
      displayOrder: data.displayOrder || 0,
      isActive: data.isActive !== false,
      createdAt: new Date().toISOString(),
    };

    try {
      await api.post('/team', newMember);
    } catch (err) {
      // Backend offline fallback
    }

    const current = getStoredTeam();
    const updated = [...current, newMember];
    saveStoredTeam(updated);
    return newMember;
  },

  async update(id, data) {
    try {
      await api.put(`/team/${id}`, data);
    } catch (err) {
      // Backend offline fallback
    }

    const current = getStoredTeam();
    const updated = current.map((m) => (m.id === id ? { ...m, ...data } : m));
    saveStoredTeam(updated);
    return updated.find((m) => m.id === id);
  },

  async delete(id) {
    try {
      await api.delete(`/team/${id}`);
    } catch (err) {
      // Backend offline fallback
    }

    const current = getStoredTeam();
    const updated = current.filter((m) => m.id !== id);
    saveStoredTeam(updated);
    return true;
  },

  resetToDefaults() {
    saveStoredTeam(DEFAULT_TEAM);
    return DEFAULT_TEAM;
  },
};

export default teamService;
