import express from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/summary', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR']), getDashboardSummary);

export default router;
