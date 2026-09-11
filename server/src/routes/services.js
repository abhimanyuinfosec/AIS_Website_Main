import express from 'express';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/servicesController.js';
import { authenticate, optionalAuthenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', optionalAuthenticate, getServices);
router.get('/:slug', getServiceBySlug);

// Protected Admin Routes
router.post('/', authenticate, requireRole(['ADMIN', 'EDITOR']), createService);
router.put('/:id', authenticate, requireRole(['ADMIN', 'EDITOR']), updateService);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteService);

export default router;
