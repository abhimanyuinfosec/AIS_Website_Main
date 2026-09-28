import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import { logAudit } from '../middleware/audit.js';

const VALID_ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR', 'USER'];

export const getUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    const where = {};

    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true, name: true, email: true, role: true,
        isActive: true, createdAt: true, updatedAt: true,
        _count: { select: { blogPosts: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true, name: true, email: true, role: true,
        isActive: true, createdAt: true, updatedAt: true,
      },
    });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const schema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      role: z.enum(VALID_ROLES).default('EDITOR'),
      isActive: z.boolean().optional().default(true),
    });
    const data = schema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) return res.status(400).json({ success: false, message: 'Email is already registered.' });

    // Prevent non-SUPER_ADMIN from creating SUPER_ADMIN accounts
    if (data.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Only SUPER_ADMIN can create another SUPER_ADMIN.' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });

    await logAudit({
      userId: req.user.id, action: 'USER_CREATE',
      resourceType: 'User', resourceId: user.id,
      req, metadata: { name: user.name, email: user.email, role: user.role },
    });

    return res.status(201).json({ success: true, data: user, message: 'User created successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schema = z.object({
      name: z.string().min(2).optional(),
      email: z.string().email().optional(),
      role: z.enum(VALID_ROLES).optional(),
      isActive: z.boolean().optional(),
      password: z.string().min(8).optional(),
    });
    const data = schema.parse(req.body);

    // Prevent changing own role / deactivating self
    if (id === req.user.id && (data.role || data.isActive === false)) {
      return res.status(400).json({ success: false, message: 'You cannot change your own role or deactivate your own account.' });
    }

    // Prevent non-SUPER_ADMIN from promoting to SUPER_ADMIN
    if (data.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Only SUPER_ADMIN can assign the SUPER_ADMIN role.' });
    }

    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, isActive: true, updatedAt: true },
    });

    await logAudit({
      userId: req.user.id, action: 'USER_UPDATE',
      resourceType: 'User', resourceId: id,
      req, metadata: { name: updated.name, role: updated.role, isActive: updated.isActive },
    });

    return res.json({ success: true, data: updated, message: 'User updated.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
    }

    const target = await prisma.user.findUnique({ where: { id }, select: { name: true, email: true } });
    if (!target) return res.status(404).json({ success: false, message: 'User not found.' });

    await prisma.user.delete({ where: { id } });

    await logAudit({
      userId: req.user.id, action: 'USER_DELETE',
      resourceType: 'User', resourceId: id,
      req, metadata: { name: target.name, email: target.email },
    });

    return res.json({ success: true, message: 'User deleted.' });
  } catch (error) {
    next(error);
  }
};
