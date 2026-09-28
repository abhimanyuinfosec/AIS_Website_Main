import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// All user management routes require SUPER_ADMIN or ADMIN
router.get('/', authenticate, requireRole(['ADMIN']), getUsers);
router.get('/:id', authenticate, requireRole(['ADMIN']), getUserById);
router.post('/', authenticate, requireRole(['ADMIN']), createUser);
router.put('/:id', authenticate, requireRole(['ADMIN']), updateUser);
router.delete('/:id', authenticate, requireRole(['SUPER_ADMIN']), deleteUser); // Delete is SUPER_ADMIN only

export default router;
