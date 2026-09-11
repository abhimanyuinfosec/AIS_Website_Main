import express from 'express';
import {
  getResearchList,
  getResearchBySlug,
  createResearch,
  updateResearch,
  deleteResearch,
} from '../controllers/researchController.js';
import { authenticate, optionalAuthenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', optionalAuthenticate, getResearchList);
router.get('/:slug', getResearchBySlug);

// Protected Admin Routes
router.post('/', authenticate, requireRole(['ADMIN', 'EDITOR', 'AUTHOR']), createResearch);
router.put('/:id', authenticate, requireRole(['ADMIN', 'EDITOR', 'AUTHOR']), updateResearch);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteResearch);

export default router;
