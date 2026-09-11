import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// Protected Admin Routes
router.post('/', authenticate, requireRole(['ADMIN', 'EDITOR']), createProduct);
router.put('/:id', authenticate, requireRole(['ADMIN', 'EDITOR']), updateProduct);
router.delete('/:id', authenticate, requireRole(['ADMIN']), deleteProduct);

export default router;
