import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.route('/')
  .get(getBlogs)
  .post(protect, authorize('admin'), createBlog);

router.get('/slug/:slug', getBlogBySlug);

router.route('/:id')
  .put(protect, authorize('admin'), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

export default router;
