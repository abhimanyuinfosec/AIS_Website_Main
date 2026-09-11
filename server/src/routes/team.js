import express from 'express';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';
import { authenticate, optionalAuthenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', optionalAuthenticate, getTeamMembers);

// Protected Admin Routes
router.post('/', authenticate, requireRole(['ADMIN']), createTeamMember);
router.put('/:id', authenticate, requireRole(['ADMIN']), updateTeamMember);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteTeamMember);

export default router;
