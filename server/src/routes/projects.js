import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectsController.js';
import { authenticate, optionalAuthenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', optionalAuthenticate, getProjects);
router.get('/:slug', getProjectBySlug);

// Protected Admin Routes
router.post('/', authenticate, requireRole(['ADMIN', 'EDITOR']), createProject);
router.put('/:id', authenticate, requireRole(['ADMIN', 'EDITOR']), updateProject);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteProject);

export default router;
