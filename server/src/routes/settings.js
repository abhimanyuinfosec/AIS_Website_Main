import express from 'express';
import {
  getSettings,
  updateSetting,
  updateBulkSettings,
} from '../controllers/settingsController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getSettings);

// Protected Admin Routes
router.post('/bulk', authenticate, requireRole(['ADMIN']), updateBulkSettings);
router.put('/:key', authenticate, requireRole(['ADMIN']), updateSetting);

export default router;
