import prisma from '../config/db.js';

export const getDashboardSummary = async (req, res, next) => {
  try {
    const t0 = performance.now();
    // Verify DB heartbeat and measure latency
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Math.round(performance.now() - t0);

    const [
      servicesCount,
      activeServicesCount,
      projectsCount,
      productsCount,
      researchCount,
      publishedResearchCount,
      blogsCount,
      publishedBlogsCount,
      inquiriesCount,
      newInquiriesCount,
      contactedInquiriesCount,
      inProgressInquiriesCount,
      resolvedInquiriesCount,
      reviewsCount,
      pendingReviewsCount,
      mediaCount,
      teamCount,
      usersCount,
      adminUsersCount,
      recentInquiries,
      recentLogs,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.project.count(),
      prisma.product.count(),
      prisma.research.count(),
      prisma.research.count({ where: { isPublished: true } }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { isPublished: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.inquiry.count({ where: { status: 'CONTACTED' } }),
      prisma.inquiry.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.inquiry.count({ where: { status: { in: ['CONVERTED', 'CLOSED'] } } }),
      prisma.review.count(),
      prisma.review.count({ where: { status: 'PENDING' } }),
      prisma.media.count(),
      prisma.teamMember.count(),
      prisma.user.count(),
      prisma.user.count({ where: { role: { in: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'] } } }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.auditLog.findMany({
        include: { user: { select: { name: true, email: true, role: true } } },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
    ]);

    return res.json({
      success: true,
      data: {
        counts: {
          services: servicesCount,
          activeServices: activeServicesCount,
          projects: projectsCount,
          products: productsCount,
          research: researchCount,
          publishedResearch: publishedResearchCount,
          blogs: blogsCount,
          publishedBlogs: publishedBlogsCount,
          inquiries: inquiriesCount,
          newInquiries: newInquiriesCount,
          reviews: reviewsCount,
          pendingReviews: pendingReviewsCount,
          media: mediaCount,
          team: teamCount,
          users: usersCount,
          admins: adminUsersCount,
        },
        inquiriesBreakdown: {
          new: newInquiriesCount,
          contacted: contactedInquiriesCount,
          inProgress: inProgressInquiriesCount,
          resolved: resolvedInquiriesCount,
          total: inquiriesCount,
        },
        system: {
          status: 'OPERATIONAL',
          dbStatus: 'Connected',
          latencyMs,
          nodeEnv: process.env.NODE_ENV || 'development',
          uptimeSeconds: Math.floor(process.uptime()),
          timestamp: new Date().toISOString(),
        },
        recentInquiries,
        recentLogs,
      },
    });
  } catch (error) {
    next(error);
  }
};
