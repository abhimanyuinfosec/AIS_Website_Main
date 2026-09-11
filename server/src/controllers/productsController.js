import { z } from 'zod';
import prisma from '../config/db.js';
import { slugify } from '../utils/slugify.js';
import { logAudit } from '../middleware/audit.js';

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  shortDesc: z.string().min(5, 'Short description is required'),
  detailedDesc: z.string().min(10, 'Detailed description is required'),
  problem: z.string().optional().nullable(),
  keyFeatures: z.array(z.string()).optional().default([]),
  architecture: z.string().optional().nullable(),
  techStack: z.array(z.string()).optional().default([]),
  methodology: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  demoUrl: z.string().optional().nullable(),
  docsUrl: z.string().optional().nullable(),
  version: z.string().optional().nullable(),
  status: z.enum(['CONCEPT', 'PROTOTYPE', 'DEVELOPMENT', 'BETA', 'PRODUCTION', 'DEPRECATED']).optional().default('CONCEPT'),
  releaseDate: z.string().optional().nullable(),
  changelog: z.string().optional().nullable(),
  featured: z.boolean().optional().default(false),
  seoTitle: z.string().optional().nullable(),
  seoDesc: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
});

export const getProducts = async (req, res, next) => {
  try {
    const { status, featured } = req.query;
    const where = {};

    if (status) {
      where.status = status;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    return res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: { images: { orderBy: { order: 'asc' } } },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);
    const slug = data.slug ? slugify(data.slug) : slugify(data.name);

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A product with this slug already exists.' });
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        slug,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
        publishedAt: new Date(),
      },
      include: { images: true },
    });

    await logAudit({
      userId: req.user.id,
      action: 'PRODUCT_CREATE',
      resourceType: 'Product',
      resourceId: product.id,
      req,
      metadata: { name: product.name },
    });

    return res.status(201).json({ success: true, data: product, message: 'Product created successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = productSchema.partial().parse(req.body);

    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    } else if (data.slug) {
      data.slug = slugify(data.slug);
    }

    if (data.slug) {
      const existing = await prisma.product.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Slug is already used by another product.' });
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        releaseDate: data.releaseDate !== undefined ? (data.releaseDate ? new Date(data.releaseDate) : null) : undefined,
      },
      include: { images: true },
    });

    await logAudit({
      userId: req.user.id,
      action: 'PRODUCT_UPDATE',
      resourceType: 'Product',
      resourceId: updated.id,
      req,
      metadata: { name: updated.name },
    });

    return res.json({ success: true, data: updated, message: 'Product updated successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.product.delete({
      where: { id },
    });

    await logAudit({
      userId: req.user.id,
      action: 'PRODUCT_DELETE',
      resourceType: 'Product',
      resourceId: id,
      req,
      metadata: { name: deleted.name },
    });

    return res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
