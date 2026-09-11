import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../config/db.js';
import { logAudit } from '../middleware/audit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../../uploads');

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const { folder = 'general', alt = '' } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const media = await prisma.media.create({
      data: {
        filename: req.file.filename,
        url: fileUrl,
        mimeType: req.file.mimetype,
        size: req.file.size,
        folder,
        alt,
        uploadedBy: req.user?.id || null,
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'MEDIA_UPLOAD',
      resourceType: 'Media',
      resourceId: media.id,
      req,
      metadata: { filename: media.filename, size: media.size },
    });

    return res.status(201).json({
      success: true,
      data: media,
      message: 'File uploaded successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const getMediaList = async (req, res, next) => {
  try {
    const { folder, search } = req.query;
    const where = {};

    if (folder && folder !== 'all') {
      where.folder = folder;
    }
    if (search) {
      where.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const media = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found.' });
    }

    // Attempt to delete physical file
    const filePath = path.join(uploadDir, media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Could not delete physical file:', err.message);
      }
    }

    await prisma.media.delete({ where: { id } });

    await logAudit({
      userId: req.user.id,
      action: 'MEDIA_DELETE',
      resourceType: 'Media',
      resourceId: id,
      req,
      metadata: { filename: media.filename },
    });

    return res.json({ success: true, message: 'Media file removed.' });
  } catch (error) {
    next(error);
  }
};
