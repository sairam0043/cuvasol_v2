import { Router } from 'express';
import { getStudentAnalytics, getAdminAnalytics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect); // Secure all analytics routes

router.get('/student', getStudentAnalytics);
router.get('/admin', authorize('admin'), getAdminAnalytics);

export default router;
