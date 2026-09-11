import express from 'express';
import {
  getReviews,
  createReview,
  updateReviewStatus,
  deleteReview,
} from '../controllers/reviewsController.js';
import { authenticate, optionalAuthenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', optionalAuthenticate, getReviews);
router.post('/', optionalAuthenticate, createReview);

// Protected Admin Routes
router.patch('/:id/status', authenticate, requireRole(['ADMIN', 'EDITOR']), updateReviewStatus);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteReview);

export default router;
