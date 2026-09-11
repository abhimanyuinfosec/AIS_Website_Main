import { z } from 'zod';
import prisma from '../config/db.js';
import { logAudit } from '../middleware/audit.js';

const teamSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  profileImage: z.string().optional().nullable(),
  shortBio: z.string().min(5, 'Short bio is required'),
  detailedBio: z.string().optional().nullable(),
  skills: z.array(z.string()).optional().default([]),
  expertise: z.array(z.string()).optional().default([]),
  linkedin: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  otherLinks: z.any().optional().nullable(),
  displayOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const getTeamMembers = async (req, res, next) => {
  try {
    const { all } = req.query;
    const where = {};

    if (!req.user || all !== 'true') {
      where.isActive = true;
    }

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return res.json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const data = teamSchema.parse(req.body);
    const member = await prisma.teamMember.create({ data });

    await logAudit({
      userId: req.user.id,
      action: 'TEAM_CREATE',
      resourceType: 'TeamMember',
      resourceId: member.id,
      req,
      metadata: { name: member.name },
    });

    return res.status(201).json({ success: true, data: member, message: 'Team member created.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = teamSchema.partial().parse(req.body);
    const updated = await prisma.teamMember.update({
      where: { id },
      data,
    });

    await logAudit({
      userId: req.user.id,
      action: 'TEAM_UPDATE',
      resourceType: 'TeamMember',
      resourceId: updated.id,
      req,
      metadata: { name: updated.name },
    });

    return res.json({ success: true, data: updated, message: 'Team member updated.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.teamMember.delete({ where: { id } });

    await logAudit({
      userId: req.user.id,
      action: 'TEAM_DELETE',
      resourceType: 'TeamMember',
      resourceId: id,
      req,
      metadata: { name: deleted.name },
    });

    return res.json({ success: true, message: 'Team member removed.' });
  } catch (error) {
    next(error);
  }
};
