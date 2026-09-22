import api from './api';

export const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    reviewerName: 'Michael Vance',
    designation: 'Chief Information Security Officer',
    organization: 'Apex FinTech Global',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    reviewText: "Abhimanyu InfoSec's adversary simulation and architecture review discovered zero-day vulnerabilities in our transaction gateway that three prior compliance audits missed. Outstanding tactical precision and professional execution.",
    rating: 5,
    verified: true,
    status: 'PUBLISHED',
    createdAt: new Date('2025-11-14').toISOString(),
  },
  {
    id: 'rev-2',
    reviewerName: 'Dr. Elena Rostova',
    designation: 'VP of Engineering & Cloud Infrastructure',
    organization: 'QuantumCloud Labs',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    reviewText: "AutoRed and CloudSentinel completely overhauled our SecOps workflows. Our mean-time-to-remediate critical CVEs dropped by 72% within the first quarter, giving our leadership total visibility into multi-cloud risk.",
    rating: 5,
    verified: true,
    status: 'PUBLISHED',
    createdAt: new Date('2025-12-02').toISOString(),
  },
  {
    id: 'rev-3',
    reviewerName: 'Rajeshwar Sen',
    designation: 'Head of Cyber Defense Operations',
    organization: 'Bharat National Infrastructure',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    reviewText: "Their industrial network and penetration testing methodologies are world-class. The team didn't just deliver a static PDF—they gave our engineers exact proof-of-concepts, live debriefs, and fortified our perimeter defenses.",
    rating: 5,
    verified: true,
    status: 'PUBLISHED',
    createdAt: new Date('2026-01-18').toISOString(),
  },
  {
    id: 'rev-4',
    reviewerName: 'Sarah Jenkins',
    designation: 'Director of Information Security',
    organization: 'OmniHealth Systems',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    reviewText: "Exceptional speed, rigorous confidentiality, and deep domain knowledge during our HIPAA compliance penetration test. They pinpointed subtle API authorization flaws and helped our dev team build resilient controls.",
    rating: 5,
    verified: true,
    status: 'PUBLISHED',
    createdAt: new Date('2026-02-05').toISOString(),
  },
];

const STORAGE_KEY = 'ais_custom_reviews';

const getStoredReviews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
      return DEFAULT_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_REVIEWS;
  } catch (err) {
    return DEFAULT_REVIEWS;
  }
};

const saveStoredReviews = (reviews) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new CustomEvent('ais_reviews_updated', { detail: reviews }));
  } catch (err) {
    console.warn('Failed to save reviews to localStorage:', err);
  }
};

export const reviewsService = {
  async getAll(includeAll = false) {
    let serverReviews = [];
    try {
      const res = await api.get('/reviews', { all: includeAll ? 'true' : undefined });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        serverReviews = res.data;
      }
    } catch (err) {
      // Backend offline fallback handled below
    }

    if (serverReviews.length > 0) {
      saveStoredReviews(serverReviews);
      return includeAll ? serverReviews : serverReviews.filter((r) => r.status === 'PUBLISHED');
    }

    const localReviews = getStoredReviews();
    return includeAll ? localReviews : localReviews.filter((r) => r.status === 'PUBLISHED');
  },

  async create(reviewData) {
    const newReview = {
      id: `rev-${Date.now()}`,
      reviewerName: reviewData.reviewerName || 'Anonymous Client',
      designation: reviewData.designation || 'Client',
      organization: reviewData.organization || '',
      profileImage: reviewData.profileImage || '',
      reviewText: reviewData.reviewText || '',
      rating: Number(reviewData.rating) || 5,
      verified: reviewData.verified !== false,
      status: reviewData.status || 'PUBLISHED',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post('/reviews', newReview);
      if (res && res.success && res.data) {
        newReview.id = res.data.id || newReview.id;
      }
    } catch (err) {
      console.warn('Backend API unavailable, saving review locally:', err.message);
    }

    const current = getStoredReviews();
    const updated = [newReview, ...current];
    saveStoredReviews(updated);
    return newReview;
  },

  async update(id, updates) {
    try {
      await api.patch(`/reviews/${id}/status`, updates);
    } catch (err) {
      console.warn('Backend API unavailable, updating review locally:', err.message);
    }

    const current = getStoredReviews();
    const updated = current.map((r) => (r.id === id ? { ...r, ...updates } : r));
    saveStoredReviews(updated);
    return updated.find((r) => r.id === id);
  },

  async delete(id) {
    try {
      await api.delete(`/reviews/${id}`);
    } catch (err) {
      console.warn('Backend API unavailable, deleting review locally:', err.message);
    }

    const current = getStoredReviews();
    const updated = current.filter((r) => r.id !== id);
    saveStoredReviews(updated);
    return true;
  },

  subscribe(callback) {
    const handler = (e) => {
      if (e.detail) callback(e.detail);
    };
    window.addEventListener('ais_reviews_updated', handler);
    return () => window.removeEventListener('ais_reviews_updated', handler);
  },
};

export default reviewsService;
