import { Request, Response, NextFunction } from 'express';
import { Blog } from '../models/Blog.js';
import { isDbConnected, mockBlogs } from '../services/mockDb.js';

// Helper to generate slug
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

// @desc    Get all blogs
// @route   GET /api/v1/blogs
// @access  Public
export const getBlogs = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { status } = req.query;

    if (!isDbConnected()) {
      let filtered = mockBlogs;
      if (status) {
        filtered = mockBlogs.filter(b => b.status === status);
      }
      // Sort by publish date descending
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug
// @route   GET /api/v1/blogs/slug/:slug
// @access  Public
export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const blog = mockBlogs.find(b => b.slug === req.params.slug);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog post not found (mock)' });
      }
      return res.status(200).json({ success: true, data: blog });
    }

    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog
// @route   POST /api/v1/blogs
// @access  Private/Admin
export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { title, content, excerpt, author, coverImage, tags, status } = req.body;
    const slug = slugify(title) + '-' + Math.random().toString(36).substring(2, 7);
    
    if (!isDbConnected()) {
      const newBlog = {
        _id: 'b_' + Math.random().toString(36).substring(2, 9),
        title,
        slug,
        content,
        excerpt,
        author,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
        tags: tags || [],
        status: status || 'draft',
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      mockBlogs.push(newBlog);
      return res.status(201).json({ success: true, data: newBlog });
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      author,
      coverImage: coverImage || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop`,
      tags: tags || [],
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : undefined
    });
    
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/v1/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { title } = req.body;
    const updateData = { ...req.body };
    
    if (title) {
      updateData.slug = slugify(title) + '-' + Math.random().toString(36).substring(2, 7);
    }
    
    if (updateData.status === 'published') {
      updateData.publishedAt = new Date();
    }

    if (!isDbConnected()) {
      const idx = mockBlogs.findIndex(b => b._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Blog post not found (mock)' });
      }
      mockBlogs[idx] = { ...mockBlogs[idx], ...updateData };
      return res.status(200).json({ success: true, data: mockBlogs[idx] });
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/v1/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const idx = mockBlogs.findIndex(b => b._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Blog post not found (mock)' });
      }
      mockBlogs.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Blog post deleted successfully (mock)' });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
