import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.route('/')
  .get(getTestimonials)
  .post(protect, authorize('admin'), createTestimonial);

router.route('/:id')
  .put(protect, authorize('admin'), updateTestimonial)
  .delete(protect, authorize('admin'), deleteTestimonial);

export default router;
