import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
} from '../controllers/inquiriesController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many messages sent. Please wait before submitting again.' },
});

// Public contact endpoint
router.post('/contact', contactLimiter, submitInquiry);
router.post('/', contactLimiter, submitInquiry);

// Protected Admin Endpoints
router.get('/', authenticate, requireRole(['ADMIN', 'EDITOR']), getInquiries);
router.get('/:id', authenticate, requireRole(['ADMIN', 'EDITOR']), getInquiryById);
router.patch('/:id', authenticate, requireRole(['ADMIN', 'EDITOR']), updateInquiry);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteInquiry);

export default router;
