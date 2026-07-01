import { Router } from 'express';
import {
  startInterview,
  submitAnswer,
  getInterviewById,
  getUserInterviews,
} from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect); // Secure all endpoints in this router

router.post('/start', startInterview);
router.post('/:id/submit-answer', submitAnswer);
router.get('/:id', getInterviewById);
router.get('/', getUserInterviews);

export default router;
