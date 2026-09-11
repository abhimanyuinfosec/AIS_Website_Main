import { z } from 'zod';
import prisma from '../config/db.js';
import { slugify } from '../utils/slugify.js';
import { logAudit } from '../middleware/audit.js';

const projectSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  shortDesc: z.string().min(5, 'Short description is required'),
  detailedDesc: z.string().min(10, 'Detailed description is required'),
  category: z.string().min(2, 'Category is required'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  architecture: z.string().optional().nullable(),
  keyFeatures: z.array(z.string()).optional().default([]),
  techStack: z.array(z.string()).optional().default([]),
  securityMech: z.array(z.string()).optional().default([]),
  githubUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  docsUrl: z.string().optional().nullable(),
  paperUrl: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().default([]),
  seoTitle: z.string().optional().nullable(),
  seoDesc: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
});

export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, status, all } = req.query;
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

    const projects = await prisma.project.findMany({
      where,
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: { images: { orderBy: { order: 'asc' } } },
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const data = projectSchema.parse(req.body);
    const slug = data.slug ? slugify(data.slug) : slugify(data.name);

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A project with this slug already exists.' });
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
      include: { images: true },
    });

    await logAudit({
      userId: req.user.id,
      action: 'PROJECT_CREATE',
      resourceType: 'Project',
      resourceId: project.id,
      req,
      metadata: { name: project.name },
    });

    return res.status(201).json({ success: true, data: project, message: 'Project created successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = projectSchema.partial().parse(req.body);

    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    } else if (data.slug) {
      data.slug = slugify(data.slug);
    }

    if (data.slug) {
      const existing = await prisma.project.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Slug is already used by another project.' });
      }
    }

    const current = await prisma.project.findUnique({ where: { id } });
    let publishedAt = current?.publishedAt;
    if (data.status === 'PUBLISHED' && !publishedAt) {
      publishedAt = new Date();
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        publishedAt,
      },
      include: { images: true },
    });

    await logAudit({
      userId: req.user.id,
      action: 'PROJECT_UPDATE',
      resourceType: 'Project',
      resourceId: updated.id,
      req,
      metadata: { name: updated.name },
    });

    return res.json({ success: true, data: updated, message: 'Project updated successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.project.delete({
      where: { id },
    });

    await logAudit({
      userId: req.user.id,
      action: 'PROJECT_DELETE',
      resourceType: 'Project',
      resourceId: id,
      req,
      metadata: { name: deleted.name },
    });

    return res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
