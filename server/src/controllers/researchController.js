import { z } from 'zod';
import prisma from '../config/db.js';
import { slugify } from '../utils/slugify.js';
import { logAudit } from '../middleware/audit.js';

const researchSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  authors: z.array(z.string()).min(1, 'At least one author is required'),
  abstract: z.string().min(10, 'Abstract is required'),
  description: z.string().optional().nullable(),
  keywords: z.array(z.string()).optional().default([]),
  category: z.string().min(2, 'Category is required'),
  publishedAt: z.string().optional().nullable(),
  journal: z.string().optional().nullable(),
  doi: z.string().optional().nullable(),
  paperUrl: z.string().optional().nullable(),
  datasetUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  citation: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  featured: z.boolean().optional().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('PUBLISHED'),
  seoTitle: z.string().optional().nullable(),
  seoDesc: z.string().optional().nullable(),
});

export const getResearchList = async (req, res, next) => {
  try {
    const { category, featured, all, status } = req.query;
    const where = {};

    if (!req.user || all !== 'true') {
      where.status = 'PUBLISHED';
    } else if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const research = await prisma.research.findMany({
      where,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });

    return res.json({ success: true, data: research });
  } catch (error) {
    next(error);
  }
};

export const getResearchBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const item = await prisma.research.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Research paper not found.' });
    }

    return res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const createResearch = async (req, res, next) => {
  try {
    const data = researchSchema.parse(req.body);
    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    const existing = await prisma.research.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A research publication with this slug already exists.' });
    }

    const item = await prisma.research.create({
      data: {
        ...data,
        slug,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : (data.status === 'PUBLISHED' ? new Date() : null),
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'RESEARCH_CREATE',
      resourceType: 'Research',
      resourceId: item.id,
      req,
      metadata: { title: item.title },
    });

    return res.status(201).json({ success: true, data: item, message: 'Research paper created successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateResearch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = researchSchema.partial().parse(req.body);

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    } else if (data.slug) {
      data.slug = slugify(data.slug);
    }

    if (data.slug) {
      const existing = await prisma.research.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Slug is already used by another publication.' });
      }
    }

    const updated = await prisma.research.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.publishedAt !== undefined ? (data.publishedAt ? new Date(data.publishedAt) : null) : undefined,
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'RESEARCH_UPDATE',
      resourceType: 'Research',
      resourceId: updated.id,
      req,
      metadata: { title: updated.title },
    });

    return res.json({ success: true, data: updated, message: 'Research paper updated successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const deleteResearch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.research.delete({
      where: { id },
    });

    await logAudit({
      userId: req.user.id,
      action: 'RESEARCH_DELETE',
      resourceType: 'Research',
      resourceId: id,
      req,
      metadata: { title: deleted.title },
    });

    return res.json({ success: true, message: 'Research paper deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
