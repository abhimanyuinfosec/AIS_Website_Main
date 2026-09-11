import prisma from '../config/db.js';

export const getAuditLogs = async (req, res, next) => {
  try {
    const { action, resourceType, limit = 50 } = req.query;
    const where = {};

    if (action) where.action = action;
    if (resourceType) where.resourceType = resourceType;

    const logs = await prisma.auditLog.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit) || 50,
    });

    return res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};
