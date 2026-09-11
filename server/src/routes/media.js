import express from 'express';
import { uploadMedia, getMediaList, deleteMedia } from '../controllers/mediaController.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', authenticate, getMediaList);
router.post('/upload', authenticate, requireRole(['ADMIN', 'EDITOR', 'AUTHOR']), upload.single('file'), uploadMedia);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteMedia);

export default router;
