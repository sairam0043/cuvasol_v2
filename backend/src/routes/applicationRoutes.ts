import { Router } from 'express';
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect); // Require login for all application routes

router.route('/')
  .post(createApplication)
  .get(getApplications);

router.route('/:id')
  .put(authorize('admin'), updateApplicationStatus)
  .delete(authorize('admin'), deleteApplication);

export default router;
