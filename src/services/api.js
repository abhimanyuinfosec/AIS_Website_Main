const rawUrl = (import.meta.env.VITE_API_URL || '/api').trim().replace(/\/$/, '');
export const API_BASE_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

// Pre-warm the backend on idle or page load (useful for spin-down hosts like Render free tier)
let prewarmPromise = null;
export const prewarmBackend = () => {
  if (prewarmPromise) return prewarmPromise;
  prewarmPromise = fetch(`${API_BASE_URL}/health`, { method: 'GET', keepalive: true })
    .then((r) => r.ok)
    .catch(() => false);
  return prewarmPromise;
};

// Active browser session keep-alive: keep server warm every 10 minutes while user is on site
if (typeof window !== 'undefined') {
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      fetch(`${API_BASE_URL}/health`, { method: 'GET', keepalive: true }).catch(() => {});
    }
  }, 10 * 60 * 1000);
}

/**
 * Initiates an OAuth login flow without exposing the user to cold-start screens.
 * If the backend is sleeping, it holds the user on the branded interface with
 * progress feedback while the container spins up, then redirects seamlessly.
 */
export const initiateOAuthRedirect = async (provider, onProgress) => {
  const targetUrl = `${API_BASE_URL}/auth/${provider}`;

  const notify = (status, message) => {
    if (typeof onProgress === 'function') {
      onProgress({ status, message });
    }
  };

  notify('checking', 'Connecting to secure authentication service...');

  // 1. Fast check if server is already awake
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      notify('redirecting', 'Redirecting to identity provider...');
      window.location.href = targetUrl;
      return () => {};
    }
  } catch (_) {
    // Timeout or network error — server is likely cold-starting
  }

  // 2. Server is sleeping on cold start (Render free tier spin-down)
  notify('waking', 'Secure cloud engine is waking up (cold start)... Redirecting shortly.');

  const startTime = Date.now();
  const maxWaitMs = 65000;

  const pollInterval = setInterval(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
      if (res.ok) {
        clearInterval(pollInterval);
        notify('ready', 'Authentication engine online! Redirecting...');
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 400);
      }
    } catch (_) {
      if (Date.now() - startTime >= maxWaitMs) {
        clearInterval(pollInterval);
        // Fallback: navigate directly
        window.location.href = targetUrl;
      }
    }
  }, 2500);

  return () => clearInterval(pollInterval);
};

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('ais_token') || null;
    this._refreshing = false; // prevents concurrent refresh storms
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('ais_token', token);
    } else {
      localStorage.removeItem('ais_token');
    }
  }

  getToken() {
    return this.token || localStorage.getItem('ais_token');
  }

  // ── Core request with auto-refresh on 401 ─────────────────────────────────
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      ...(options.isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // needed so the httpOnly refreshToken cookie is sent
    });

    const data = await response.json().catch(() => ({}));

    // ── 401 interceptor: try to silently refresh the access token ─────────────
    const isAuthEndpoint =
      endpoint.includes('/auth/login') ||
      endpoint.includes('/auth/register') ||
      endpoint.includes('/auth/refresh');

    if (response.status === 401 && !isAuthEndpoint && !options._isRetry) {
      const refreshed = await this._tryRefresh();
      if (refreshed) {
        // Retry the original request exactly once with the new token
        return this.request(endpoint, { ...options, _isRetry: true });
      }
      // Refresh also failed — session is dead, notify the app
      window.dispatchEvent(new CustomEvent('ais:session-expired'));
    }
    // ─────────────────────────────────────────────────────────────────────────

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  }

  // Calls /auth/refresh using the httpOnly cookie, stores the new access token
  async _tryRefresh() {
    if (this._refreshing) return false; // already in-flight, wait for it
    this._refreshing = true;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) return false;
      const data = await res.json().catch(() => ({}));
      if (data?.data?.token) {
        this.setToken(data.data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      this._refreshing = false;
    }
  }

  // ── HTTP Helpers ───────────────────────────────────────────────────────────
  get(endpoint, params = {}) {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    ).toString();
    const fullEndpoint = query ? `${endpoint}?${query}` : endpoint;
    return this.request(fullEndpoint, { method: 'GET' });
  }

  post(endpoint, body = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch(endpoint, body = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  upload(endpoint, formData) {
    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      isFormData: true,
    });
  }
}

export const api = new ApiClient();
export default api;
