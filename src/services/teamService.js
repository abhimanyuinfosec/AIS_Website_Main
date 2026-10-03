import api from './api';

export const DEFAULT_TEAM = [];

const STORAGE_KEY = 'ais_custom_team';

const getStoredTeam = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((m) => !['team-1', 'team-2', 'team-3', 'team-4'].includes(m.id));
  } catch (err) {
    return [];
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
      if (res && res.success && Array.isArray(res.data)) {
        serverTeam = res.data;
        saveStoredTeam(serverTeam);
        return serverTeam;
      }
    } catch (err) {
      // Backend offline fallback handled below
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
