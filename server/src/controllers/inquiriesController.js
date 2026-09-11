import { z } from 'zod';
import prisma from '../config/db.js';
import { logAudit } from '../middleware/audit.js';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  organization: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  message: z.string().min(5, 'Message is required'),
  honeypot: z.string().optional(), // Anti-spam honeypot
});

export const submitInquiry = async (req, res, next) => {
  try {
    const data = inquirySchema.parse(req.body);

    // Bot honeypot check
    if (data.honeypot) {
      return res.json({ success: true, message: 'Message received.' });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        organization: data.organization,
        phone: data.phone,
        service: data.service,
        message: data.message,
        status: 'NEW',
      },
    });

    // Create Admin Notification
    await prisma.notification.create({
      data: {
        title: `New Security Inquiry: ${data.name}`,
        message: `Inquiry from ${data.email}${data.organization ? ` (${data.organization})` : ''} regarding "${data.service || 'General Inquiries'}".`,
        type: 'INQUIRY',
        relatedType: 'Inquiry',
        relatedId: inquiry.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Abhimanyu InfoSec. Our security team will contact you shortly.',
      data: { id: inquiry.id },
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: inquiries });
  } catch (error) {
    next(error);
  }
};

export const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await prisma.inquiry.findUnique({ where: { id } });

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    // Auto mark as READ if currently NEW
    if (inquiry.status === 'NEW') {
      await prisma.inquiry.update({
        where: { id },
        data: { status: 'READ' },
      });
      inquiry.status = 'READ';
    }

    return res.json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

export const updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, notes } = req.body;

    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(assignedTo !== undefined ? { assignedTo } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'INQUIRY_UPDATE',
      resourceType: 'Inquiry',
      resourceId: id,
      req,
      metadata: { status, assignedTo },
    });

    return res.json({ success: true, data: updated, message: 'Inquiry updated.' });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.inquiry.delete({ where: { id } });

    await logAudit({
      userId: req.user.id,
      action: 'INQUIRY_DELETE',
      resourceType: 'Inquiry',
      resourceId: id,
      req,
    });

    return res.json({ success: true, message: 'Inquiry deleted.' });
  } catch (error) {
    next(error);
  }
};
