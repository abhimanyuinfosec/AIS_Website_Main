import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

import rateLimit from 'express-rate-limit';
import prisma from './config/db.js';

// Route Imports
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import servicesRoutes from './routes/services.js';
import projectsRoutes from './routes/projects.js';
import productsRoutes from './routes/products.js';
import researchRoutes from './routes/research.js';
import blogRoutes from './routes/blog.js';
import teamRoutes from './routes/team.js';
import reviewsRoutes from './routes/reviews.js';
import inquiriesRoutes from './routes/inquiries.js';
import settingsRoutes from './routes/settings.js';
import mediaRoutes from './routes/media.js';
import notificationsRoutes from './routes/notifications.js';
import auditLogsRoutes from './routes/auditLogs.js';
import dashboardRoutes from './routes/dashboard.js';

import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (Render, Railway, Nginx, Cloudflare)
app.set('trust proxy', 1);

// Security & Utility Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Dynamic, multi-origin CORS handling
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim().replace(/\/$/, ''))
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, '');
      const isLocal = /^http:\/\/localhost(:\d+)?$/.test(origin);
      const isAllowed = allowedOrigins.includes(normalizedOrigin);

      if (process.env.NODE_ENV === 'production') {
        if (isAllowed) {
          return callback(null, true);
        }
        return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
      }

      // Development / Staging mode: allow localhost and configured origins
      if (isLocal || isAllowed) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Global API Rate Limiter
const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.',
  },
});
app.use('/api', globalApiLimiter);

// Static files (uploads)
const uploadDir = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadDir));

// Register All REST API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/contact', inquiriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/audit-logs', auditLogsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Fallback & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🛡️ Abhimanyu InfoSec API Engine running on http://localhost:${PORT}`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful Shutdown for Cloud Containers (Render / Docker)
const handleShutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  server.close(async () => {
    console.log('🔒 HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('💾 Prisma database connections closed.');
    } catch (err) {
      console.error('Error disconnecting from database:', err);
    }
    process.exit(0);
  });

  // Force shutdown if cleanup hangs
  setTimeout(() => {
    console.error('⚠️ Forcefully terminating after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default app;
