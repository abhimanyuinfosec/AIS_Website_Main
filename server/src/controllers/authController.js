import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../config/db.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { logAudit } from '../middleware/audit.js';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

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

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or inactive.' });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
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
