import prisma from '../config/db.js';

export const getDashboardSummary = async (req, res, next) => {
  try {
    const [
      servicesCount,
      projectsCount,
      productsCount,
      researchCount,
      blogsCount,
      inquiriesCount,
      newInquiriesCount,
      reviewsCount,
      pendingReviewsCount,
      mediaCount,
      teamCount,
      recentInquiries,
      recentLogs,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.product.count(),
      prisma.research.count(),
      prisma.blogPost.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.review.count(),
      prisma.review.count({ where: { status: 'PENDING' } }),
      prisma.media.count(),
      prisma.teamMember.count(),
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.auditLog.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
    ]);

    return res.json({
      success: true,
      data: {
        counts: {
          services: servicesCount,
          projects: projectsCount,
          products: productsCount,
          research: researchCount,
          blogs: blogsCount,
          inquiries: inquiriesCount,
          newInquiries: newInquiriesCount,
          reviews: reviewsCount,
          pendingReviews: pendingReviewsCount,
          media: mediaCount,
          team: teamCount,
        },
        recentInquiries,
        recentLogs,
      },
    });
  } catch (error) {
    next(error);
  }
};
