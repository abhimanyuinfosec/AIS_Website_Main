import express from 'express';
import { getAuditLogs } from '../controllers/auditLogsController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), getAuditLogs);

export default router;
