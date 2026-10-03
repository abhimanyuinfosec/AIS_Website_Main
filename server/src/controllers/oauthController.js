import prisma from '../config/db.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { logAudit } from '../middleware/audit.js';

// Resolve Backend Base URL for OAuth callback redirects
const getBackendBaseUrl = (req) => {
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.trim().replace(/\/$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return `${proto}://${host}`;
};

// Resolve Frontend Base URL for client redirect
const getFrontendBaseUrl = (req) => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL.trim().replace(/\/$/, '');
  }
  const origins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
  const validOrigin = origins.map((o) => o.trim()).find((o) => o.startsWith('http'));
  if (validOrigin) return validOrigin.replace(/\/$/, '');

  const referer = req.headers.referer;
  if (referer) {
    try {
      const url = new URL(referer);
      return `${url.protocol}//${url.host}`;
    } catch (_) {}
  }
  return process.env.NODE_ENV === 'production' ? 'https://ais-website.vercel.app' : 'http://localhost:5173';
};

// ──────────────────────────────────────────────
// Helper: Dev Mock OAuth Simulation
// ──────────────────────────────────────────────
const handleDevMockOAuth = async (req, res, provider) => {
  const frontendUrl = getFrontendBaseUrl(req);
  try {
    const isGoogle = provider === 'GOOGLE';
    const mockData = isGoogle
      ? {
          email: 'google.demo@abhimanyuinfosec.com',
          name: 'Google Security Tester',
          provider: 'GOOGLE',
          providerId: 'mock-google-10982736451928374',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        }
      : {
          email: 'github.demo@abhimanyuinfosec.com',
          name: 'GitHub Security Researcher',
          provider: 'GITHUB',
          providerId: 'mock-github-987654321',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        };

    let user = await prisma.user.findUnique({
      where: { email: mockData.email },
    });

    if (user) {
      if (!user.isActive) {
        return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent('Dev test account is deactivated.')}`);
      }
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLogin: new Date(),
          avatarUrl: user.avatarUrl || mockData.avatarUrl,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: mockData.email,
          name: mockData.name,
          role: 'USER',
          provider: mockData.provider,
          providerId: mockData.providerId,
          avatarUrl: mockData.avatarUrl,
          isActive: true,
          lastLogin: new Date(),
        },
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await logAudit({
      userId: user.id,
      action: 'AUTH_OAUTH_DEV_SIMULATION',
      resourceType: 'User',
      resourceId: user.id,
      req,
      result: 'SUCCESS',
      metadata: { provider, email: mockData.email, devSimulation: true },
    });

    return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  } catch (err) {
    console.error('Dev Mock OAuth error:', err);
    return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent('Dev OAuth simulation failed: ' + (err.message || 'Database error'))}`);
  }
};

// ──────────────────────────────────────────────
// 1. GOOGLE OAUTH 2.0
// ──────────────────────────────────────────────

export const redirectToGoogle = async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const frontendUrl = getFrontendBaseUrl(req);

  if (!clientId || clientId.trim() === '') {
    const isDev = process.env.NODE_ENV !== 'production';
    const allowDevOAuth = isDev || process.env.ALLOW_DEV_OAUTH === 'true';

    if (allowDevOAuth) {
      return handleDevMockOAuth(req, res, 'GOOGLE');
    }

    return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent('Google OAuth is not configured on the server. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to the server environment.')}`);
  }

  const backendUrl = getBackendBaseUrl(req);
  const redirectUri = `${backendUrl}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });

  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
};

export const handleGoogleCallback = async (req, res, next) => {
  const frontendUrl = getFrontendBaseUrl(req);
  const { code, error } = req.query;

  if (error || !code) {
    return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent(error || 'Google login cancelled.')}`);
  }

  try {
    const backendUrl = getBackendBaseUrl(req);
    const redirectUri = `${backendUrl}/api/auth/google/callback`;

    // 1. Exchange code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to retrieve Google access token.');
    }

    // 2. Fetch Google profile
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();

    if (!profile.email) {
      throw new Error('Google account did not return a verified email address.');
    }

    const email = profile.email.toLowerCase().trim();
    const name = profile.name || profile.given_name || 'Google User';
    const avatarUrl = profile.picture || null;
    const providerId = profile.sub;

    // 3. Find or Create User
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      if (!user.isActive) {
        return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent('Account is deactivated. Please contact support.')}`);
      }
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLogin: new Date(),
          avatarUrl: user.avatarUrl || avatarUrl,
          providerId: user.providerId || providerId,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: 'USER',
          provider: 'GOOGLE',
          providerId,
          avatarUrl,
          isActive: true,
          lastLogin: new Date(),
        },
      });
    }

    // 4. Issue Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await logAudit({
      userId: user.id,
      action: 'AUTH_OAUTH_LOGIN_SUCCESS',
      resourceType: 'User',
      resourceId: user.id,
      req,
      result: 'SUCCESS',
      metadata: { provider: 'GOOGLE', email },
    });

    return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent(err.message || 'Authentication with Google failed.')}`);
  }
};

// ──────────────────────────────────────────────
// 2. GITHUB OAUTH 2.0
// ──────────────────────────────────────────────

export const redirectToGitHub = async (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const frontendUrl = getFrontendBaseUrl(req);

  if (!clientId || clientId.trim() === '') {
    const isDev = process.env.NODE_ENV !== 'production';
    const allowDevOAuth = isDev || process.env.ALLOW_DEV_OAUTH === 'true';

    if (allowDevOAuth) {
      return handleDevMockOAuth(req, res, 'GITHUB');
    }

    return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent('GitHub OAuth is not configured on the server. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to the server environment.')}`);
  }

  const backendUrl = getBackendBaseUrl(req);
  const redirectUri = `${backendUrl}/api/auth/github/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
  });

  return res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
};

export const handleGitHubCallback = async (req, res, next) => {
  const frontendUrl = getFrontendBaseUrl(req);
  const { code, error } = req.query;

  if (error || !code) {
    return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent(error || 'GitHub login cancelled.')}`);
  }

  try {
    const backendUrl = getBackendBaseUrl(req);
    const redirectUri = `${backendUrl}/api/auth/github/callback`;

    // 1. Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange GitHub authorization code.');
    }

    const accessTokenGitHub = tokenData.access_token;

    // 2. Fetch User Profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessTokenGitHub}`,
        'User-Agent': 'AIS-Cyber-Security-App',
      },
    });
    const ghUser = await userRes.json();

    // 3. Resolve Primary Verified Email
    let email = ghUser.email;
    if (!email) {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessTokenGitHub}`,
          'User-Agent': 'AIS-Cyber-Security-App',
        },
      });
      const emails = await emailRes.json();
      if (Array.isArray(emails)) {
        const primary = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
        if (primary) email = primary.email;
      }
    }

    if (!email) {
      throw new Error('Unable to retrieve a verified email address from GitHub account.');
    }

    email = email.toLowerCase().trim();
    const name = ghUser.name || ghUser.login || 'GitHub User';
    const avatarUrl = ghUser.avatar_url || null;
    const providerId = String(ghUser.id);

    // 4. Find or Create User
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      if (!user.isActive) {
        return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent('Account is deactivated. Please contact support.')}`);
      }
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLogin: new Date(),
          avatarUrl: user.avatarUrl || avatarUrl,
          providerId: user.providerId || providerId,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: 'USER',
          provider: 'GITHUB',
          providerId,
          avatarUrl,
          isActive: true,
          lastLogin: new Date(),
        },
      });
    }

    // 5. Issue Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await logAudit({
      userId: user.id,
      action: 'AUTH_OAUTH_LOGIN_SUCCESS',
      resourceType: 'User',
      resourceId: user.id,
      req,
      result: 'SUCCESS',
      metadata: { provider: 'GITHUB', email },
    });

    return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  } catch (err) {
    console.error('GitHub OAuth callback error:', err);
    return res.redirect(`${frontendUrl}/auth/callback?error=${encodeURIComponent(err.message || 'Authentication with GitHub failed.')}`);
  }
};

// ──────────────────────────────────────────────
// 3. OAUTH AVAILABILITY & STATUS
// ──────────────────────────────────────────────

export const getOAuthStatus = (req, res) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const allowDevOAuth = isDev || process.env.ALLOW_DEV_OAUTH === 'true';

  const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID.trim());
  const githubConfigured = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_ID.trim());

  res.json({
    success: true,
    data: {
      google: {
        configured: googleConfigured,
        devSimulation: !googleConfigured && allowDevOAuth,
        enabled: googleConfigured || allowDevOAuth,
      },
      github: {
        configured: githubConfigured,
        devSimulation: !githubConfigured && allowDevOAuth,
        enabled: githubConfigured || allowDevOAuth,
      },
    },
  });
};
