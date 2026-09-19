import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../config/db.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { logAudit } from '../middleware/audit.js';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// ──────────────────────────────────────────────
// User Registration (Email & Password)
// ──────────────────────────────────────────────
export const register = async (req, res, next) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const { name, email, password } = parsed;

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in or use OAuth.',
      });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: 'USER',
        provider: 'LOCAL',
        isActive: true,
        lastLogin: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        provider: true,
        avatarUrl: true,
      },
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    await logAudit({
      userId: user.id,
      action: 'AUTH_REGISTER_SUCCESS',
      resourceType: 'User',
      resourceId: user.id,
      req,
      result: 'SUCCESS',
      metadata: { email: normalizedEmail, role: user.role },
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: {
        token: accessToken,
        user,
      },
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

// ──────────────────────────────────────────────
// User & Admin Login (Email & Password)
// ──────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const { email, password } = parsed;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.isActive) {
      await logAudit({
        action: 'AUTH_LOGIN_FAILED',
        resourceType: 'User',
        req,
        result: 'FAILURE',
        metadata: { email },
      });
      return res.status(401).json({ success: false, message: 'Invalid credentials or inactive account.' });
    }

    // If account was created via OAuth and has no password
    if (!user.passwordHash) {
      return res.status(400).json({
        success: false,
        message: `This account is linked with ${user.provider || 'OAuth'}. Please sign in using the "${user.provider || 'OAuth'}" button above.`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      await logAudit({
        userId: user.id,
        action: 'AUTH_LOGIN_FAILED',
        resourceType: 'User',
        resourceId: user.id,
        req,
        result: 'FAILURE',
      });
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Update lastLogin
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const isProduction = process.env.NODE_ENV === 'production';

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    await logAudit({
      userId: user.id,
      action: 'AUTH_LOGIN_SUCCESS',
      resourceType: 'User',
      resourceId: user.id,
      req,
      result: 'SUCCESS',
    });

    return res.json({
      success: true,
      message: 'Authentication successful.',
      data: {
        token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          provider: user.provider,
          avatarUrl: user.avatarUrl,
        },
      },
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'No refresh token provided.' });
    }

    const decoded = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, provider: true, avatarUrl: true, isActive: true },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or inactive.' });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      data: {
        token: newAccessToken,
        user,
      },
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
  }
};

export const logout = async (req, res) => {
  if (req.user) {
    await logAudit({
      userId: req.user.id,
      action: 'AUTH_LOGOUT',
      resourceType: 'User',
      resourceId: req.user.id,
      req,
    });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });

  return res.json({ success: true, message: 'Logged out successfully.' });
};

export const getMe = async (req, res) => {
  return res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
};
