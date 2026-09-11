import express from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getCategories,
  createCategory,
  getTags,
} from '../controllers/blogController.js';
import { authenticate, optionalAuthenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', optionalAuthenticate, getBlogPosts);
router.get('/categories', getCategories);
router.post('/categories', authenticate, requireRole(['ADMIN', 'EDITOR']), createCategory);
router.get('/tags', getTags);
router.get('/:slug', getBlogPostBySlug);

// Protected Admin Routes
router.post('/', authenticate, requireRole(['ADMIN', 'EDITOR', 'AUTHOR']), createBlogPost);
router.put('/:id', authenticate, requireRole(['ADMIN', 'EDITOR', 'AUTHOR']), updateBlogPost);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteBlogPost);

export default router;
