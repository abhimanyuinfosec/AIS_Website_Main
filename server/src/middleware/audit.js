import prisma from '../config/db.js';

export const logAudit = async ({
  userId,
  action,
  resourceType,
  resourceId,
  req,
  result = 'SUCCESS',
  metadata = null,
}) => {
  try {
    const ipAddress = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || req?.ip || 'unknown';
    const userAgent = req?.headers['user-agent'] || 'unknown';

    await prisma.auditLog.create({
      data: {
        userId: userId || req?.user?.id || null,
        action,
        resourceType,
        resourceId: resourceId ? String(resourceId) : null,
        ipAddress: typeof ipAddress === 'string' ? ipAddress.slice(0, 45) : 'unknown',
        userAgent: typeof userAgent === 'string' ? userAgent.slice(0, 255) : 'unknown',
        result,
        metadata: metadata ? metadata : undefined,
      },
    });
  } catch (err) {
    console.error('⚠️ Failed to write audit log:', err.message);
  }
};
