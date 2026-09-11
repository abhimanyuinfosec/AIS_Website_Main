import { z } from 'zod';
import prisma from '../config/db.js';
import { slugify } from '../utils/slugify.js';
import { logAudit } from '../middleware/audit.js';

const serviceSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().optional(),
  icon: z.string().optional().nullable(),
  shortDesc: z.string().min(5, 'Short description is required'),
  detailedDesc: z.string().min(10, 'Detailed description is required'),
  problem: z.string().optional().nullable(),
  objectives: z.array(z.string()).optional().default([]),
  features: z.array(z.string()).optional().default([]),
  methodology: z.string().optional().nullable(),
  deliverables: z.array(z.string()).optional().default([]),
  tools: z.array(z.string()).optional().default([]),
  cta: z.string().optional().nullable(),
  featured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  displayOrder: z.number().int().optional().default(0),
  seoTitle: z.string().optional().nullable(),
  seoDesc: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
});

export const getServices = async (req, res, next) => {
  try {
    const { all, featured } = req.query;
    const where = {};

    // If not admin requesting all, only show active
    if (!req.user || all !== 'true') {
      where.isActive = true;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    return res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const data = serviceSchema.parse(req.body);
    const slug = data.slug ? slugify(data.slug) : slugify(data.name);

    // Check slug uniqueness
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A service with this slug already exists.' });
    }

    const service = await prisma.service.create({
      data: {
        ...data,
        slug,
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'SERVICE_CREATE',
      resourceType: 'Service',
      resourceId: service.id,
      req,
      metadata: { name: service.name },
    });

    return res.status(201).json({ success: true, data: service, message: 'Service created successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = serviceSchema.partial().parse(req.body);

    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    } else if (data.slug) {
      data.slug = slugify(data.slug);
    }

    if (data.slug) {
      const existing = await prisma.service.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Slug is already used by another service.' });
      }
    }

    const updated = await prisma.service.update({
      where: { id },
      data,
    });

    await logAudit({
      userId: req.user.id,
      action: 'SERVICE_UPDATE',
      resourceType: 'Service',
      resourceId: updated.id,
      req,
      metadata: { name: updated.name },
    });

    return res.json({ success: true, data: updated, message: 'Service updated successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.service.delete({
      where: { id },
    });

    await logAudit({
      userId: req.user.id,
      action: 'SERVICE_DELETE',
      resourceType: 'Service',
      resourceId: id,
      req,
      metadata: { name: deleted.name },
    });

    return res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
