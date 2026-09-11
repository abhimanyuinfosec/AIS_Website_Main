import { z } from 'zod';
import prisma from '../config/db.js';
import { slugify } from '../utils/slugify.js';
import { logAudit } from '../middleware/audit.js';

const blogPostSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  featuredImage: z.string().optional().nullable(),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  categoryId: z.string().min(1, 'Category is required'),
  tagNames: z.array(z.string()).optional().default([]),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  featured: z.boolean().optional().default(false),
  readingTime: z.number().int().optional(),
  seoTitle: z.string().optional().nullable(),
  seoDesc: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
});

export const getBlogPosts = async (req, res, next) => {
  try {
    const { category, tag, status, featured, all } = req.query;
    const where = {};

    if (!req.user || all !== 'true') {
      where.status = 'PUBLISHED';
    } else if (status) {
      where.status = status;
    }

    if (category) {
      where.category = {
        OR: [{ slug: category }, { name: category }, { id: category }],
      };
    }
    if (tag) {
      where.tags = {
        some: {
          OR: [{ slug: tag }, { name: tag }],
        },
      };
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        tags: true,
      },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });

    return res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        tags: true,
      },
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req, res, next) => {
  try {
    const data = blogPostSchema.parse(req.body);
    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An article with this slug already exists.' });
    }

    // Connect or create tags
    const tagConnect = [];
    if (data.tagNames && data.tagNames.length > 0) {
      for (const name of data.tagNames) {
        const tagSlug = slugify(name);
        const tag = await prisma.blogTag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name, slug: tagSlug },
        });
        tagConnect.push({ id: tag.id });
      }
    }

    // Calculate reading time if not provided (~200 words/min)
    const wordCount = data.content.split(/\s+/).length;
    const readingTime = data.readingTime || Math.max(1, Math.ceil(wordCount / 200));

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        featuredImage: data.featuredImage,
        excerpt: data.excerpt,
        content: data.content,
        categoryId: data.categoryId,
        status: data.status,
        featured: data.featured,
        readingTime,
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc,
        ogImage: data.ogImage,
        authorId: req.user.id,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        tags: {
          connect: tagConnect,
        },
      },
      include: {
        author: { select: { id: true, name: true } },
        category: true,
        tags: true,
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'BLOG_CREATE',
      resourceType: 'BlogPost',
      resourceId: post.id,
      req,
      metadata: { title: post.title },
    });

    return res.status(201).json({ success: true, data: post, message: 'Article created successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = blogPostSchema.partial().parse(req.body);

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    } else if (data.slug) {
      data.slug = slugify(data.slug);
    }

    if (data.slug) {
      const existing = await prisma.blogPost.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Slug is already in use.' });
      }
    }

    let tagUpdate = undefined;
    if (data.tagNames) {
      const tagConnect = [];
      for (const name of data.tagNames) {
        const tagSlug = slugify(name);
        const tag = await prisma.blogTag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name, slug: tagSlug },
        });
        tagConnect.push({ id: tag.id });
      }
      tagUpdate = {
        set: tagConnect,
      };
    }

    const current = await prisma.blogPost.findUnique({ where: { id } });
    let publishedAt = current?.publishedAt;
    if (data.status === 'PUBLISHED' && !publishedAt) {
      publishedAt = new Date();
    }

    const { tagNames, ...updateFields } = data;

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateFields,
        publishedAt,
        ...(tagUpdate ? { tags: tagUpdate } : {}),
      },
      include: {
        author: { select: { id: true, name: true } },
        category: true,
        tags: true,
      },
    });

    await logAudit({
      userId: req.user.id,
      action: 'BLOG_UPDATE',
      resourceType: 'BlogPost',
      resourceId: updated.id,
      req,
      metadata: { title: updated.title },
    });

    return res.json({ success: true, data: updated, message: 'Article updated successfully.' });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: error.errors[0]?.message || 'Validation error' });
    }
    next(error);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.blogPost.delete({ where: { id } });

    await logAudit({
      userId: req.user.id,
      action: 'BLOG_DELETE',
      resourceType: 'BlogPost',
      resourceId: id,
      req,
      metadata: { title: deleted.title },
    });

    return res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: 'asc' },
    });
    return res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required.' });
    const slug = slugify(name);

    const cat = await prisma.blogCategory.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });

    return res.status(201).json({ success: true, data: cat });
  } catch (error) {
    next(error);
  }
};

// Tags
export const getTags = async (req, res, next) => {
  try {
    const tags = await prisma.blogTag.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: 'asc' },
    });
    return res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};
