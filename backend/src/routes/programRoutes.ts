import { Router } from 'express';
import {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../controllers/programController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.route('/')
  .get(getPrograms)
  .post(protect, authorize('admin'), createProgram);

router.route('/:id')
  .get(getProgramById)
  .put(protect, authorize('admin'), updateProgram)
  .delete(protect, authorize('admin'), deleteProgram);

export default router;
