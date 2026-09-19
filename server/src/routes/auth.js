import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, register, refresh, logout, getMe } from '../controllers/authController.js';
import {
  redirectToGoogle,
  handleGoogleCallback,
  redirectToGitHub,
  handleGitHubCallback,
} from '../controllers/oauthController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // max 30 attempts per 15 min
  message: { success: false, message: 'Too many authentication attempts. Please try again after 15 minutes.' },
});

// Email & Password Auth (Users & Admins)
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

// Google OAuth 2.0
router.get('/google', redirectToGoogle);
router.get('/google/callback', handleGoogleCallback);

// GitHub OAuth 2.0
router.get('/github', redirectToGitHub);
router.get('/github/callback', handleGitHubCallback);

export default router;
