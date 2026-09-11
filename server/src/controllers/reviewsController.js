import { z } from 'zod';
import prisma from '../config/db.js';
import { logAudit } from '../middleware/audit.js';

const reviewSchema = z.object({
  reviewerName: z.string().min(2, 'Name is required'),
  profileImage: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  organization: z.string().optional().nullable(),
  reviewText: z.string().min(10, 'Review text is required'),
  rating: z.number().int().min(1).max(5).optional().default(5),
  source: z.string().optional().nullable(),
  verified: z.boolean().optional().default(false),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'PUBLISHED']).optional().default('PENDING'),
});

export const getReviews = async (req, res, next) => {
  try {
    const { status, all } = req.query;
    const where = {};

    if (!req.user || all !== 'true') {
      where.status = 'PUBLISHED';
    } else if (status) {
      where.status = status;
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const data = reviewSchema.parse(req.body);

    // If submitted by public, default to PENDING unless user is admin
    if (!req.user || req.user.role === 'AUTHOR') {
      data.status = 'PENDING';
      data.verified = false;
    }

    const review = await prisma.review.create({
      data: {
        ...data,
        date: new Date(),
      },
    });

    // Create notification for admin if submitted publicly
    if (!req.user) {
      await prisma.notification.create({
        data: {
          title: 'New Client Review Submitted',
          message: `${data.reviewerName} submitted a review (${data.rating}★). Pending moderation.`,
          type: 'REVIEW',
          relatedType: 'Review',
          relatedId: review.id,
        },
      });
    }

    return res.status(201).json({
      success: true,
      data: review,
      message: req.user ? 'Review created.' : 'Thank you! Your review has been submitted for verification.',
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateReviewStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, verified } = req.body;

    const updated = await prisma.review.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(verified !== undefined ? { verified } : {}),
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'REVIEW_MODERATE',
      resourceType: 'Review',
      resourceId: id,
      req,
      metadata: { status, verified },
    });

    return res.json({ success: true, data: updated, message: 'Review status updated.' });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({ where: { id } });

    await logAudit({
      userId: req.user.id,
      action: 'REVIEW_DELETE',
      resourceType: 'Review',
      resourceId: id,
      req,
    });

    return res.json({ success: true, message: 'Review removed.' });
  } catch (error) {
    next(error);
  }
};
